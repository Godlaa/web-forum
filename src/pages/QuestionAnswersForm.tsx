import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerBar from "../components/AnswerBar";
import { Context } from "..";
import { createAnswer, fetchAnswersByQuestionId } from "../http/answersApi";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneQuestion } from "../http/questionsApi";
import { fetchOneUser } from "../http/userApi";
import { QUESTION_ROUTE, SECTION_ROUTE } from "../utils/consts";
import AnswerCreate from "../components/modals/answerCreate";
import { User, UserPersonals } from "../models";
import { fetchUserPersonalsByUserId } from "../http/userPersonalsApi";

const QuestionPage: React.FC = observer(() => {
  const { question_store } = useContext(Context) || {};
  const { user_store } = useContext(Context) || {};
  const [text, setText] = useState("");
  const [reload, setReload] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [author, setAuthor] = useState<User>();
  const [authorPersInfo, setAuthorPersInfo] = useState<UserPersonals>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const loadAnswerPage = (questionId: number) => {
    fetchAnswersByQuestionId(questionId).then(
      (data) => question_store && question_store.setAnswers(data)
    );
    fetchOneQuestion(questionId).then((data) => {
      question_store && question_store.setSelectedQuestion(data);
      fetchOneUser(question_store?.selectedQuestion.userId ?? -1).then((data) =>
        setAuthor(data)
      );
      fetchUserPersonalsByUserId(
        question_store?.selectedQuestion.userId ?? -1
      ).then((data) => setAuthorPersInfo(data));
    });
    setReload(false);
  };

  const reloadAnswers = () => {
    setReload(true);
  };

  useEffect(() => {
    if (id) {
      loadAnswerPage(parseInt(id));
    }
  }, [id, question_store, user_store, reload]);

  return (
    <Container
      className="container-bg mt-5"
      style={{ backgroundColor: "#E5E5E5", border: "1px solid gray" }}
    >
      <Row className="shadow-text header-bg d-flex align-items-center">
        <Col className="ms-4">
          <h1>Ответы</h1>
        </Col>
        <Col xs="auto">
          {question_store?.selectedQuestion.header}
          <img
            security="true"
            src="https://cdn.icon-icons.com/icons2/1993/PNG/512/chat_chatting_communication_conversation_email_mail_message_icon_123226.png"
            alt="question"
            width="80"
            height="80"
            className="mx-3"
          />
        </Col>
      </Row>
      <Row className="ms-3 mt-3">
        <Col xs="auto">
          <svg
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                SECTION_ROUTE + "/" + question_store?.selectedQuestion.sectionId
              )
            }
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"
            />
          </svg>
        </Col>
        <Col md={9} className="ms-5">
          <div
            className="shadow-text question-button px-4 d-flex align-items-center"
            style={{ height: "2em" }}
          >
            {authorPersInfo?.name ? authorPersInfo?.name : author?.email}{" "}
            {authorPersInfo?.faculty} {authorPersInfo?.course} курс
          </div>
          <AnswerBar reloadAnswers={reloadAnswers} />
        </Col>
        <Col md={1} className="mx-3">
          <Button
            variant="danger"
            className="shadow-text question-button"
            onClick={() => {
              setAnswerVisible(true);
            }}
          >
            Ответить
          </Button>
        </Col>
      </Row>
      <AnswerCreate
        show={answerVisible}
        onHide={() => {
          setAnswerVisible(false);
          setReload(true);
        }}
      />
    </Container>
  );
});

export default QuestionPage;
