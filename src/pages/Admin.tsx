import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import AnswerCreate from "../components/modals/answerCreate";
import QuestionCreate from "../components/modals/questionCreate";
import SectionCreate from "../components/modals/sectionCreate";

const Admin: React.FC = () => {
  const [answerVisible, setAnswerVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  return (
    <Container className="d-flex flex-column mt-5">
      <Button
        variant="dark"
        className="mt-2 p-3"
        onClick={() => setQuestionVisible(true)}
      >
        Добавить вопрос
      </Button>
      <Button
        variant="dark"
        className="mt-2 p-3"
        onClick={() => setAnswerVisible(true)}
      >
        Добавить ответ
      </Button>
      <Button
        variant="dark"
        className="mt-2 p-3"
        onClick={() => setSectionVisible(true)}
      >
        Добавить раздел
      </Button>
      <AnswerCreate
        show={answerVisible}
        onHide={() => setAnswerVisible(false)}
      />
      <QuestionCreate
        show={questionVisible}
        onHide={() => setQuestionVisible(false)}
      />
      <SectionCreate
        show={sectionVisible}
        onHide={() => setSectionVisible(false)}
      />
    </Container>
  );
};

export default Admin;
