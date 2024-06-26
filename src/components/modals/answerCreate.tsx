import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { Context } from "../..";
import { createAnswer } from "../../http/answersApi";
import { fetchQuestions } from "../../http/questionsApi";
import { observer } from "mobx-react-lite";

const AnswerCreate: React.FC<{ show: boolean; onHide: () => void }> = observer(
  ({ show, onHide }) => {
    const question_store = useContext(Context)?.question_store;
    const user_store = useContext(Context)?.user_store;
    const [text, setText] = useState("");

    useEffect(() => {
      if (question_store) {
        fetchQuestions().then((data) => question_store.setQuestions(data.rows));
      }
    }, [question_store]);

    const addAnswer = () => {
      const userId = user_store?.user?.id;
      if (userId) {
        createAnswer({
          userId: userId,
          questionId: question_store?.selectedQuestion.id ?? -1,
          text: text,
          likes: 0,
        }).then(() => {
          setText("");
        });
        onHide();
      } else {
        console.log("user_store.user is not set or does not contain id");
      }
    };

    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить новый ответ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button type="submit" variant="outline-success" onClick={addAnswer}>
            Ответить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);

AnswerCreate.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AnswerCreate;
