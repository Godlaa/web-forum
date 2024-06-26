import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { createSection } from "../../http/sectionsApi";
import { Answer } from "../../models";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../..";
import { fetchAnswersByUserId } from "../../http/answersApi";
import { ListGroup, Col } from "react-bootstrap";
import { QUESTION_ROUTE } from "../../utils/consts";

export interface AnswerModalProps {
  show: boolean;
  onHide: () => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ show, onHide }) => {
  const [name, setName] = useState<string>("");
  const [discipline, setDiscipline] = useState("");
  const { id } = useParams<{ id: string }>();
  const user_store = useContext(Context)?.user_store;
  const [answersList, setAnswersList] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const redirectToQuestion = (questionId: number) => {
    navigate(QUESTION_ROUTE + `/${questionId}`);
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchAnswersByUserId(parseInt(id)).then((data) => {
        setAnswersList(data);
      });
    } else {
      fetchAnswersByUserId(user_store?.user.id ?? -1).then((data) => {
        setAnswersList(data);
      });
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Ответы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className="shadow-text d-flex">
          {answersList.map((answer, index) => (
            <ListGroup.Item
              key={index}
              style={{
                borderRadius: "50px",
                width: "93%",
                margin: "0.5rem auto",
                cursor: "pointer",
              }}
              onClick={() => redirectToQuestion(answer.questionId ?? -1)}
            >
              <Col className="d-flex align-items-center">
                <Col>
                  <span>{answer.text}</span>
                </Col>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

AnswerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AnswerModal;
