import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QuestionBar from "../components/QuestionBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchQuestionsBySectionId } from "../http/questionsApi";
import { useParams } from "react-router-dom";

const SectionPage: React.FC = observer(() => {
  const { question_store } = useContext(Context) || {};

  const { id } = useParams<{ id: string }>();

  const loadQuestionBySection = (sectionId: number) => {
    fetchQuestionsBySectionId(sectionId).then((data) => {
      if (question_store) {
        question_store.setQuestions(data.rows);
      }
    });
  };

  useEffect(() => {
    if (id) {
      loadQuestionBySection(parseInt(id));
    }
  });

  return (
    <Container className="mt-5">
      <FormLabel className="mb-3"></FormLabel>
      <Row>
        <Col>
          <QuestionBar />
        </Col>
      </Row>
    </Container>
  );
});

export default SectionPage;
