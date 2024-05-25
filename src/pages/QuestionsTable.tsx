import React, { useContext, useEffect } from "react";
import { Col, Container, FormLabel, Row } from "react-bootstrap";
import QuestionBar from "../components/QuestionBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchQuestionsBySectionId } from "../http/questionsApi";
import { useLocation } from "react-router-dom";
import { fetchOneSection } from "../http/sectionsApi";

const SectionPage: React.FC = observer ( () => {

    const { question_store } = useContext(Context) || {};
    const location = useLocation();
    const sectionFromUrl = Number.parseInt(location.pathname.split('section/')[1]);

    useEffect(() => {
        fetchQuestionsBySectionId(sectionFromUrl).then(data => {
            if (question_store) {
                question_store.setQuestions(data.rows);
            }
        });
        fetchOneSection(sectionFromUrl).then(data => {
            if (question_store) {
                question_store.setSelectedSection(data);
            }
        });
    }, [question_store, sectionFromUrl]);

    return (
        <Container className="mt-5"> 
            <FormLabel className="mb-3"></FormLabel>
            <Row>
                <Col>
                    <div className="ms-2 mb-3">Раздел: {question_store?.selectedSection.name}</div>
                    <QuestionBar />
                </Col>
            </Row>
        </Container>
    );
});

export default SectionPage;
