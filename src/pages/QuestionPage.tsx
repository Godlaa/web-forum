import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AnswerBar from "../components/AnswerBar";
import { Context } from "..";
import { createAnswer, fetchAnswersByQuestionId } from "../http/answersApi";
import { observer } from "mobx-react-lite";
import { useLocation } from 'react-router-dom';
import { fetchOneQuestion } from "../http/questionsApi";

const QuestionPage : React.FC  = observer ( () => {

    const { question_store } = useContext(Context) || {};
    const { user_store } = useContext(Context) || {};
    const location = useLocation();
    const [text, setText] = useState('');
    const questionIdFromUrl = Number.parseInt(location.pathname.split('question/')[1]);

    useEffect(() => {
        fetchAnswersByQuestionId(questionIdFromUrl).then(data => question_store && question_store.setAnswers(data));
        fetchOneQuestion(questionIdFromUrl).then(data => question_store && question_store.setSelectedQuestion(data));
    }, [questionIdFromUrl, question_store]);

    const addAnswer = () => {
        const userId = user_store?.user?.id; 
        console.log('userId: ', userId); 
        if (userId) {
            createAnswer({userId: userId, questionId: question_store?.selectedQuestion?.id, text: text, likes: 0}).then(data => { setText('') });
        } else {
            console.log('user_store.user is not set or does not contain id');
        }
    }

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <h1>{ question_store?.selectedQuestion.header}</h1>
                </Col>
            </Row>
            <Row className="mt-3"> 
                <Container>
                    <Col>
                        Дата создания: {new Date(question_store?.selectedQuestion.createdAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </Col>
                    {/* <Col>
                        Дата последнего обновления: {new Date(question_store.selectedQuestion.updatedAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </Col> */}
                    <Col>
                        Автор: {question_store?.selectedQuestion.userId} 
                    </Col>
                </Container>
            </Row>
            <Row className="mt-5">
                <Col>
                    { Array.isArray(question_store?.answers) && question_store?.answers?.length! > 0 ? <h2>Ответы</h2> : <h2>Ответов пока нет</h2> }
                    <AnswerBar />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Form>
                        <Form.Group controlId="answerForm">
                            <Form.Label>Твой ответ</Form.Label>
                            <Form.Control value={text} onChange={e => setText(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Button 
                            className="mt-3" 
                            variant="dark" 
                            type="submit"
                            onClick={addAnswer}
                        >
                            Ответить
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});

export default QuestionPage;
