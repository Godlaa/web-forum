import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { QUESTION_ROUTE } from "../utils/consts";
import { fetchAnswersByQuestionId } from "../http/answersApi";

const QuestionBar: React.FC = observer(() => {
  const question_store = useContext(Context)?.question_store;
  const navigate = useNavigate();

  const [questionId_answersCount, setQuestionId_answersCount] = useState<{
    [key: number]: number;
  }>({});

  const redirectToQuestion = (questionId: number) => {
    navigate(QUESTION_ROUTE + `/${questionId}`);
  };

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
    <Container>
      <Table>
        <thead>
          <tr>
            <th style={{ width: "1000px", border: "1px solid black" }}>
              Вопрос
            </th>
            <th
              style={{
                width: "200px",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              Дата обновления
            </th>
            <th
              style={{
                width: "200px",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              Количество ответов
            </th>
          </tr>
        </thead>
        <tbody>
          {question_store?.questions.map((question) => (
            <tr
              key={question.id}
              className={
                question.id === question_store.selectedQuestion.id
                  ? "table-active"
                  : ""
              }
              style={{ border: "1px solid black" }}
              onClick={() => question_store.setSelectedQuestion(question)}
            >
              <td
                style={{
                  width: "1000px",
                  cursor: "pointer",
                  border: "1px solid black",
                }}
                onClick={() => redirectToQuestion(question.id ?? -1)}
              >
                {" "}
                {question.header}
              </td>
              <td
                style={{
                  width: "200px",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                {new Date(question?.updatedAt as Date).toLocaleDateString(
                  "ru-RU",
                  { year: "numeric", month: "numeric", day: "numeric" }
                ) +
                  " " +
                  new Date(question?.updatedAt as Date).toLocaleTimeString(
                    "ru-RU",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
              </td>
              <td
                style={{
                  width: "100px",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                {" "}
                {questionId_answersCount[question.id ?? -1]}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
});

export default QuestionBar;
