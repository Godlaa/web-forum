import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { updateQuestion, fetchOneQuestion } from "../../http/questionsApi";
import { Question } from "../../models";

export interface IQuestionUpdateProps {
  show: boolean;
  onHide: () => void;
  questionId: number;
}

const QuestionUpdate: React.FC<IQuestionUpdateProps> = ({
  show,
  onHide,
  questionId,
}) => {
  const [userId, setUserId] = useState<number>();
  const [sectionId, setSectionId] = useState<number>();
  const [header, setHeader] = useState<string>("");
  const [markers, setMarkers] = useState<string[]>([]);
  const [is_vip, setIsVip] = useState<boolean>(false);

  useEffect(() => {
    if (show && questionId) {
      fetchOneQuestion(questionId).then((data: Question) => {
        setUserId(data.userId);
        setSectionId(data.sectionId);
        setHeader(data.header);
        setMarkers(data.markers); // Assuming markers are stored as an array of strings
        setIsVip(data.is_vip);
      });
    }
  }, [show, questionId]);

  const handleMarkerChange = (index: number, value: string) => {
    const newMarkers = [...markers];
    newMarkers[index] = value;
    setMarkers(newMarkers);
  };

  const updateExistingQuestion = () => {
    updateQuestion(questionId, {
      userId,
      sectionId,
      header,
      markers,
      is_vip: is_vip,
    }) // Send markers as array of strings
      .then(() => {
        onHide();
      })
      .catch((error) => {
        console.error("Failed to update question", error);
      });
  };

  const addMarkerField = () => {
    setMarkers([...markers, ""]);
  };

  const removeMarkerField = (index: number) => {
    setMarkers(markers.filter((_, i) => i !== index));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Обновить вопрос
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Введите заголовок"}
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
          {markers.map((marker, index) => (
            <div key={index} className="mt-3 d-flex align-items-center">
              <Form.Control
                placeholder={"Введите метку"}
                value={marker}
                onChange={(e) => handleMarkerChange(index, e.target.value)}
              />
              <Button
                variant="outline-danger"
                onClick={() => removeMarkerField(index)}
                className="ml-2"
              >
                Удалить
              </Button>
            </div>
          ))}
          <Button
            variant="outline-primary"
            onClick={addMarkerField}
            className="mt-3"
          >
            Добавить метку
          </Button>
          <Form.Check
            className="mt-3"
            type="checkbox"
            label="VIP"
            checked={is_vip}
            onChange={(e) => setIsVip(e.target.checked)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={updateExistingQuestion}>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

QuestionUpdate.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuestionUpdate;
