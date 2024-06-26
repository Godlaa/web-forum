import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import QuestionBar from "../components/QuestionBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchQuestionsBySectionId } from "../http/questionsApi";
import { useParams } from "react-router-dom";
import { fetchOneSection } from "../http/sectionsApi";
import QuestionCreate from "../components/modals/questionCreate";

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
    <Container>
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
