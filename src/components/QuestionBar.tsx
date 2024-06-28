import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import {
  FORUM_ROUTE,
  QUESTION_CREATE_ROUTE,
  QUESTION_ROUTE,
} from "../utils/consts";
import { fetchAnswersByQuestionId } from "../http/answersApi";
import { ListGroup, Col, Row, Button } from "react-bootstrap";
import SearchLine from "./questionSearchQuestions";
import { deleteQuestionById, fetchQuestions } from "../http/questionsApi";
import { Question } from "../models";
import QuestionUpdate from "./modals/questionUpdate";

const QuestionBar: React.FC = observer(() => {
  const question_store = useContext(Context)?.question_store;
  const user_store = useContext(Context)?.user_store;
  const [updateQuestionVisible, setUpdateQuestionVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState<Question[]>([]);

  const handleSuggestionsChange = (newSuggestions: Question[]) => {
    setSuggestions(newSuggestions);
  };

  const redirectToQuestion = (questionId: number) => {
    navigate(QUESTION_ROUTE + `/${questionId}`);
  };

  const deleteQuestion = (questionId: number) => {
    if (questionId) {
      deleteQuestionById(questionId);
    }
  };

  const [questionId_answersCount, setQuestionId_answersCount] = useState<{
    [key: number]: number;
  }>({});

  const loadQuestions = async () => {
    try {
      const response = await fetchQuestions();
      question_store?.setQuestions(response.rows);
      setSuggestions(response.rows);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    loadQuestions();
    setReload(false);
  }, [updateQuestionVisible, reload]);

  useEffect(() => {
    question_store?.questions.map((question) =>
      fetchAnswersByQuestionId(question.id ?? -1).then((data) => {
        setQuestionId_answersCount((prevState) => ({
          ...prevState,
          [question.id ?? -1]: data.length,
        }));
      })
    );
  }, [question_store?.questions]);

  return (
    <Container
      className="container-bg mt-5"
      style={{ backgroundColor: "#E5E5E5", border: "1px solid gray" }}
    >
      <Row className="shadow-text header-bg d-flex align-items-center">
        <Col className="ms-4">
          <h1>{question_store?.selectedSection.name ?? ""}</h1>
        </Col>
        <Col xs="auto">
          <img
            security="true"
            src="https://cdn.icon-icons.com/icons2/1304/PNG/512/book_86005.png"
            alt="book"
            width="80"
            height="80"
            className="mx-5"
          />
        </Col>
      </Row>
      <Row className="search-bar ms-3">
        <Col xs="auto">
          <svg
            onClick={() => navigate(FORUM_ROUTE)}
            style={{ cursor: "pointer" }}
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
        <Col>
          <SearchLine
            onSuggestionsChange={handleSuggestionsChange}
            placeholder="Поиск вопроса..."
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="danger"
            className="shadow-text question-button mx-5"
            onClick={() =>
              navigate(
                QUESTION_CREATE_ROUTE + "/" + question_store?.selectedSection.id
              )
            }
            style={{
              backgroundColor: "#C62E3E",
              border: "none",
              borderRadius: "40px",
              position: "relative",
              paddingRight: "20px",
              fontSize: "35px",
              width: "300px",
            }}
          >
            Задать вопрос
          </Button>
        </Col>
      </Row>
      <ListGroup className="mt-3 shadow-text d-flex">
        {suggestions.map((question, index) =>
          user_store?.user.role === "ADMIN" ? (
            <Row key={index} className="d-flex align-items-center ms-3">
              <QuestionUpdate
                show={updateQuestionVisible}
                onHide={() => setUpdateQuestionVisible(false)}
                questionId={question.id ?? -1}
              />
              <Button
                variant="outline"
                className="d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <img
                  onClick={() => setUpdateQuestionVisible(true)}
                  security="true"
                  src="https://cdn.icon-icons.com/icons2/569/PNG/512/pen-black-diagonal-symbol-of-writing-tool_icon-icons.com_54470.png"
                  alt="pen"
                  width="40px"
                  height="40px"
                />
              </Button>
              <Button
                variant="outline"
                className="d-flex align-items-center justify-content-center mx-4"
                onClick={() => {
                  deleteQuestion(question.id ?? -1);
                  setReload(!reload);
                }}
                style={{ width: "40px", height: "40px" }}
              >
                <img
                  security="true"
                  src="https://cdn.icon-icons.com/icons2/3247/PNG/512/xmark_icon_198582.png"
                  alt="xmark"
                  width="40px"
                  height="40px"
                />
              </Button>
              <Col>
                <ListGroup.Item
                  key={index}
                  style={{
                    borderRadius: "50px",
                    width: "100%",
                    margin: "0.5rem auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    redirectToQuestion(question.id ?? -1);
                  }}
                >
                  <Col className="d-flex align-items-center">
                    <Col>
                      <span>{question.header}</span>
                    </Col>
                    <span>
                      Ответы: {questionId_answersCount[question.id ?? -1]} шт
                    </span>
                  </Col>
                </ListGroup.Item>
              </Col>
            </Row>
          ) : (
            <ListGroup.Item
              key={index}
              style={{
                borderRadius: "50px",
                width: "93%",
                margin: "0.5rem auto",
                cursor: "pointer",
              }}
              onClick={() => {
                redirectToQuestion(question.id ?? -1);
              }}
            >
              <Col className="d-flex align-items-center">
                <Col>
                  <span>{question.header}</span>
                </Col>
                <span>
                  Ответы: {questionId_answersCount[question.id ?? -1]} шт
                </span>
              </Col>
            </ListGroup.Item>
          )
        )}
      </ListGroup>
    </Container>
  );
});

export default QuestionBar;
