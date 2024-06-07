import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QuestionBar from "../components/QuestionBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchQuestionsBySectionId } from "../http/questionsApi";
import { useLocation } from "react-router-dom";
import { fetchOneSection } from "../http/sectionsApi";
import { Button } from "react-bootstrap";
import QuestionCreate from "../components/modals/questionCreate";

const SectionPage: React.FC = observer(() => {
  const { question_store } = useContext(Context) || {};
  const location = useLocation();
  const [section, setSection] = useState('');
  const [reload, setReload] = useState(false);
  const sectionFromUrl = Number.parseInt(
    location.pathname.split("section/")[1]
  );
  const [questionVisible, setQuestionVisible] = useState(false);

  useEffect(() => {
    fetchQuestionsBySectionId(sectionFromUrl).then((data) => {
      if (question_store) {
        question_store.setQuestions(data.rows);
      }
    });
    fetchOneSection(sectionFromUrl).then((data) => {
      if (question_store) {
        question_store.setSelectedSection(data);
        setSection(data.name);
      }
    });
    setReload(false);
  }, [question_store, reload, sectionFromUrl]);

  return (
    <Container className="mt-5">
      <FormLabel className="mb-3"></FormLabel>
      <Row className="d-flex justify-content-md-between align-items-center">
        <Col>
          <div className="ms-2 mb-3">
            Раздел: {section}
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
              className="me-2 mb-5"
              variant="dark"
              type="submit"
              onClick = {() => setQuestionVisible(true)}
            >
              Задать вопрос
          </Button>
        </Col>
      </Row>
      <QuestionBar />
      <QuestionCreate
        show={questionVisible}
        onHide={() => { setQuestionVisible(false); setReload(!reload); }}
      />
    </Container>
  );
});

export default SectionPage;
