import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { createSection } from "../../http/sectionsApi";

export interface ISectionCreateProps {
  show: boolean;
  onHide: () => void;
}

const SectionCreate: React.FC<ISectionCreateProps> = ({ show, onHide }) => {
  const [name, setName] = useState("");
  const [discipline, setDiscipline] = useState("");

  const addSection = () => {
    createSection({ name: name, discipline: discipline }).then(() => {
      setDiscipline("");
      setName("");
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый раздел
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Введите название раздела"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder={"Введите название дисциплины"}
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addSection}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SectionCreate.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SectionCreate;
