import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { createSection } from "../../http/sectionsApi";
import { ListGroup, Col } from "react-bootstrap";
import { Context } from "../..";
import { useNavigate, useParams } from "react-router-dom";
import { QUESTION_ROUTE } from "../../utils/consts";
import { fetchAnswersByQuestionId } from "../../http/answersApi";
import { fetchQuestionsByUserId } from "../../http/questionsApi";
import { Question } from "../../models";

export interface QuestionModalProps {
  show: boolean;
  onHide: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ show, onHide }) => {
  const user_store = useContext(Context)?.user_store;
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const redirectToQuestion = (questionId: number) => {
    navigate(QUESTION_ROUTE + `/${questionId}`);
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchQuestionsByUserId(parseInt(id)).then((data) => {
        setQuestionList(data.rows);
      });
    } else {
      fetchQuestionsByUserId(user_store?.user.id ?? -1).then((data) => {
        setQuestionList(data.rows);
      });
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Вопросы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className="shadow-text d-flex">
          {questionList.map((question, index) => (
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
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

QuestionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default QuestionModal;
