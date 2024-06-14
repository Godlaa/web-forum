import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QuestionBar from "../components/QuestionBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchQuestionsBySectionId } from "../http/questionsApi";
import { useParams } from "react-router-dom";
import { fetchOneSection } from "../http/sectionsApi";
import { Button } from "react-bootstrap";
import QuestionCreate from "../components/modals/questionCreate";
import SearchLine from "../components/questionSearch";

const SectionPage: React.FC = observer(() => {
  const { question_store } = useContext(Context) || {};
  const [section, setSection] = useState("");
  const [reload, setReload] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const { id } = useParams<{ id: string }>();

  const sectionPageLoad = (sectionId: number) => {
    fetchQuestionsBySectionId(sectionId).then((data) => {
      if (question_store) {
        question_store.setQuestions(data.rows);
      }
    });
    fetchOneSection(sectionId).then((data) => {
      if (question_store) {
        question_store.setSelectedSection(data);
        setSection(data.name);
      }
    });
    setReload(false);
  };

  useEffect(() => {
    if (id) {
      sectionPageLoad(parseInt(id));
    }
  }, [question_store, reload, id]);

  return (
    <Container className="mt-5">
      <FormLabel className="mb-3"></FormLabel>
      <Row className="d-flex justify-content-md-between">
        <Col>
          <div className="ms-2 mb-3">Раздел: {section}</div>
        </Col>
        <Col>
          <SearchLine />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            className="me-2 mb-5"
            variant="dark"
            type="submit"
            onClick={() => setQuestionVisible(true)}
          >
            Задать вопрос
          </Button>
        </Col>
      </Row>
      <QuestionBar />
      <QuestionCreate
        show={questionVisible}
        onHide={() => {
          setQuestionVisible(false);
          setReload(!reload);
        }}
      />
    </Container>
  );
});

export default SectionPage;
