import { observer } from "mobx-react-lite";
import React, { memo, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "..";
import { fetchOneUser } from "../http/userApi";
import { fetchUserPersonalsByUserId } from "../http/userPersonalsApi";
import { Answer, UserLikes, UserPersonals } from "../models";
import {
  createLike,
  fetchLikesByAnswerId,
  fetchLikesByUserId,
} from "../http/userLikesApi";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE, avatar_url } from "../utils/consts";
import { deleteAnswerById } from "../http/answersApi";
import "../css/AnswerBar.css";
import { Card } from "react-bootstrap";

interface ChildComponentProps {
  reloadAnswers: () => void;
}

interface CardProps {
  answer: Answer;
  index: number;
  likeAnswer: (answerId: number | undefined) => void;
  deleteAnswer: (answerId: number) => void;
  reloadAnswers: () => void;
  redirectToProfile: (profileId: number) => void;
  authors: {
    [key: number]: {
      email: string;
      id: number;
    };
  };
  photos: { [key: number]: string };
  likes: { [key: number]: number };
  userLikes: { [key: number]: boolean };
  userPersonal: { [key: number]: UserPersonals };
  setReload: (state: boolean) => void;
}

const AnswerCard: React.FC<CardProps> = memo(
  ({
    answer,
    index,
    likeAnswer,
    deleteAnswer,
    reloadAnswers,
    redirectToProfile,
    authors,
    photos,
    likes,
    userLikes,
    userPersonal,
    setReload,
  }) => {
    const user_store = useContext(Context)?.user_store;
    return (
      <Card
        key={index}
        className="mb-3"
        style={{
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
      >
        <Card.Header className="align-items-center">
          <Row className="align-items-center me-4">
            <img
              onClick={() => redirectToProfile(authors[answer.id ?? -1]?.id)}
              className="ms-3"
              src={
                avatar_url + (photos[answer.id ?? -1] || "default_avatar.jpg")
              }
              alt="avatar"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
              }}
            />
            <Col className="me-3">
              {userPersonal[answer.id ?? -1]?.name ??
                authors[answer.id ?? -1]?.email}{" "}
              {userPersonal[answer.id ?? -1]?.faculty ?? ""}{" "}
              {userPersonal[answer.id ?? -1]?.course ?? ""} курс
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              {userLikes[answer.id ?? -1] === true ? (
                <Button
                  onClick={() => {
                    likeAnswer(answer.id);
                    setReload(true);
                  }}
                  variant="outline"
                  className="border-0 me-2"
                >
                  <FaHeart color="green"></FaHeart>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    likeAnswer(answer.id);
                    setReload(true);
                  }}
                  variant="outline"
                  className="border-0 me-2"
                >
                  <FaHeartBroken color="red"></FaHeartBroken>
                </Button>
              )}
              Понравилось: {likes[answer.id ?? -1]}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body
          style={{
            backgroundColor: "#ADADAD",
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <div
            className="align-items-center justify-content-between"
            style={{
              backgroundColor: "#E5E5E5",
              borderRadius: "10px",
              paddingLeft: "10px",
            }}
          >
            {answer.text}
          </div>
          {user_store?.user.role === "ADMIN" && (
            <Row
              className="d-flex justify-content-end mt-1"
              style={{ height: "15px" }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  deleteAnswer(answer.id ?? -1);
                  reloadAnswers();
                }}
                className="d-flex align-items-center justify-content-center mx-4"
                style={{ width: "30px", height: "30px" }}
              >
                <img
                  security="true"
                  src="https://cdn.icon-icons.com/icons2/3247/PNG/512/xmark_icon_198582.png"
                  alt="xmark"
                  width="30px"
                  height="30px"
                />
              </Button>
            </Row>
          )}
        </Card.Body>
      </Card>
    );
  }
);

const AnswerBar: React.FC<ChildComponentProps> = observer(
  ({ reloadAnswers }) => {
    const navigate = useNavigate();

    const redirectToProfile = (profileId: number) => {
      user_store?.user.id === profileId
        ? navigate(PROFILE_ROUTE)
        : navigate(PROFILE_ROUTE + `/${profileId}`);
    };

    const question_store = useContext(Context)?.question_store;
    const user_store = useContext(Context)?.user_store;

    const [authors, setAuthors] = useState<{
      [key: number]: { email: string; id: number };
    }>({});
    const [photos, setPhotos] = useState<{ [key: number]: string }>({});
    const [likes, setLikes] = useState<{ [key: number]: number }>({});
    const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
    const [userPersonal, setUserPersonal] = useState<{
      [key: number]: UserPersonals;
    }>({});
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
      question_store?.answers.forEach((answer) => {
        fetchOneUser(answer.userId ?? -1).then((data) => {
          setAuthors((prevState) => ({
            ...prevState,
            [answer.id ?? -1]: { email: data.email, id: data.id },
          }));
        });
        fetchUserPersonalsByUserId(answer.userId ?? -1).then((data) => {
          if (data !== null) {
            setPhotos((prevState) => ({
              ...prevState,
              [answer.id ?? -1]: data.avatar,
            }));
            setUserPersonal((prevState) => ({
              ...prevState,
              [answer.id ?? -1]: data,
            }));
          } else
            setPhotos((prevState) => ({
              ...prevState,
              [answer.id ?? -1]: "default_avatar.jpg",
            }));
        });
        fetchLikesByAnswerId(answer.id ?? -1).then((data) => {
          setLikes((prevState) => ({
            ...prevState,
            [answer.id ?? -1]: data.length,
          }));
        });
      });
      setUserLikes({});
      fetchLikesByUserId(user_store?.user.id ?? -1).then((data) => {
        data.forEach((like: UserLikes) => {
          setUserLikes((prevState) => ({
            ...prevState,
            [like.answerId ?? -1]: like.is_liked ?? false,
          }));
        });
      });
      setReload(false);
    }, [question_store?.answers, reload, user_store?.user.id]);

    const likeAnswer = (answerId: number | undefined) => {
      if (answerId !== undefined) {
        const like: UserLikes = {
          userId: user_store?.user.id ?? -1,
          answerId: answerId,
          is_liked: true,
        };
        createLike(like);
      }
    };

    const deleteAnswer = (answerId: number) => {
      if (answerId) {
        deleteAnswerById(answerId);
      }
    };

    return (
      <Container>
        <Row>
          <Col>
            {question_store?.answers.map((answer, index) => (
              <AnswerCard
                key={index}
                answer={answer}
                index={index}
                likeAnswer={likeAnswer}
                deleteAnswer={deleteAnswer}
                reloadAnswers={reloadAnswers}
                redirectToProfile={redirectToProfile}
                authors={authors}
                likes={likes}
                photos={photos}
                setReload={setReload}
                userLikes={userLikes}
                userPersonal={userPersonal}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
);

export default AnswerBar;
