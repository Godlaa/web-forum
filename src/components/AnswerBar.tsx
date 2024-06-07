import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "..";
import { fetchOneUser } from "../http/userApi";
import { fetchUserPersonalsByUserId } from "../http/userPersonalsApi";
import { UserLikes } from "../models";
import { createLike, fetchLikesByAnswerId, fetchLikesByUserId } from "../http/userLikesApi";
import { FaHeart, FaHeartBroken, FaRegHeart } from 'react-icons/fa';

const AnswerBar : React.FC  = observer(() => {

    const question_store = useContext(Context)?.question_store;
    const user_store = useContext(Context)?.user_store;
    const [authors, setAuthors] = useState<{[key: number]: number}>({});
    const [photos, setPhotos] = useState<{[key: number]: string}>({});
    const [likes, setLikes] = useState<{[key: number]: number}>({});
    const [userLikes, setUserLikes] = useState<{[key: number]: boolean}>({});
    const [reload, setReload] = useState<boolean>(false);
    const avatar_url = 'http://localhost:5000/';

    useEffect(() => {
        question_store?.answers.forEach(answer => {
            fetchOneUser(answer.userId ?? -1).then(data => {
                setAuthors(prevState => ({...prevState, [answer.id ?? -1]: data.email}));
            });
            fetchUserPersonalsByUserId(answer.userId ?? -1).then(data => {
                if (data !== null) setPhotos(prevState => ({...prevState, [answer.id ?? -1]: data.avatar}));
                else setPhotos(prevState => ({...prevState, [answer.id ?? -1]: 'default_avatar.jpg'}));
            });
            fetchLikesByAnswerId(answer.id ?? -1).then(data => {
                setLikes(prevState => ({...prevState, [answer.id ?? -1]: data.length}));
            });
        });
        setUserLikes({});
        fetchLikesByUserId(user_store?.user.id ?? -1).then(data => {
            data.forEach((like : UserLikes) => {
                setUserLikes(prevState => ({...prevState, [like.answerId ?? -1]: like.is_liked ?? false}));
            });
        });
        setReload(false);
    }, [question_store?.answers, reload]);
    
    const likeAnswer = (answerId: number | undefined) => {
        if (answerId !== undefined) {
            const like : UserLikes = {
                userId: user_store?.user.id ?? -1,
                answerId: answerId,
                is_liked: true
            };
            createLike(like);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Accordion className="mt-3" defaultActiveKey="0">
                        {question_store?.answers.map(answer => (
                        <Accordion.Item key={answer.id} eventKey={answer.id?.toString() ?? '-1'}>
                            <Accordion.Header>
                                <Container className="d-flex flex-nowrap justify-content-between align-items-center">
                                    <Row className="align-items-center me-4">
                                        <Col className="me-3">
                                            Автор: {authors[answer.id ?? -1]}
                                        </Col>
                                        Понравилось: {likes[answer.id ?? -1]}
                                        <img className="ms-3" src={avatar_url + (photos[answer.id ?? -1] || 'default_avatar.jpg')} alt="avatar" style={{width: '75px', height: '75px', borderRadius: '50%'}}/>                                    </Row>
                                </Container>
                            </Accordion.Header>

                            <Accordion.Body className="align-items-center">
                                <Container className="d-flex justify-content-between align-items-center">
                                    <Row className="d-flex"> 
                                        <Col className="ms-2">
                                            {answer.text}
                                        </Col>
                                    </Row>  
                                    { userLikes[answer.id ?? -1] === true ? 
                                        <Button 
                                        onClick={() => { likeAnswer(answer.id); setReload(!reload); }} 
                                        variant="outline"
                                        className="border-0"
                                        >
                                            <FaHeart  color="green"></FaHeart>
                                        </Button>
                                    :
                                        <Button
                                        onClick={() => { likeAnswer(answer.id); setReload(!reload); }}
                                        variant="outline"
                                        className="border-0"
                                        >
                                            <FaHeartBroken color="red"></FaHeartBroken>
                                        </Button>
                                    }
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
});

export default AnswerBar;