import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { updateSection, fetchOneSection } from "../../http/sectionsApi";
import { Section } from "../../models";

export interface ISectionUpdateProps {
  show: boolean;
  onHide: () => void;
  sectionId: number;
}

const SectionUpdate: React.FC<ISectionUpdateProps> = ({
  show,
  onHide,
  sectionId,
}) => {
  const [name, setName] = useState<string>("");
  const [discipline, setDiscipline] = useState<string>("");

  useEffect(() => {
    if (show && sectionId) {
      fetchOneSection(sectionId).then((data: Section) => {
        setName(data.name);
        setDiscipline(data.discipline);
      });
    }
  }, [show, sectionId]);

  const updateExistingSection = () => {
    updateSection(sectionId, { name, discipline })
      .then(() => {
        onHide();
      })
      .catch((error) => {
        console.error("Failed to update section", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Обновить раздел
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
        <Button variant="outline-success" onClick={updateExistingSection}>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SectionUpdate.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  sectionId: PropTypes.number.isRequired,
};

export default SectionUpdate;
