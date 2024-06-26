import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { SECTION_ROUTE } from "../utils/consts";
import { fetchQuestionsBySectionId } from "../http/questionsApi";
import "../css/SectionsBar.css";
import SearchLine from "./questionSearchSections";
import { deleteSectionById } from "../http/sectionsApi";
import SectionCreate from "./modals/sectionCreate";
import { Section } from "../models";

const SectionsBar: React.FC = observer(() => {
  const question_store = useContext(Context)?.question_store;
  const user_store = useContext(Context)?.user_store;
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [sectionId_questionCount, setSectionId_questionCount] = useState<{
    [key: number]: number;
  }>({});
  const [sectionVisible, setSectionVisible] = useState(false);

  const [suggestions, setSuggestions] = useState<Section[]>([]);

  const handleSuggestionsChange = (newSuggestions: Section[]) => {
    setSuggestions(newSuggestions);
  };

  const redirectToSection = (id: number) => {
    navigate(SECTION_ROUTE + `/${id}`);
  };

  useEffect(() => {
    question_store?.sections.map((section) =>
      fetchQuestionsBySectionId(section.id ?? -1).then((data) => {
        setSectionId_questionCount((prevState) => ({
          ...prevState,
          [section.id ?? -1]: data.count,
        }));
      })
    );
    setReload(false);
  }, [question_store?.sections, reload]);

  const deleteSection = (sectionId: number) => {
    if (sectionId) {
      deleteSectionById(sectionId);
    }
  };

  const renderSectionsRow = (section: Section, index: number) => {
    if (user_store?.user.role === "ADMIN") {
      return (
        <Row key={index} className="d-flex align-items-center ms-3">
          <Button
            variant="outline"
            className="d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <img
              security="true"
              src="https://cdn.icon-icons.com/icons2/569/PNG/512/pen-black-diagonal-symbol-of-writing-tool_icon-icons.com_54470.png"
              alt="pen"
              width="40px"
              height="40px"
            />
          </Button>
          <Button
            onClick={() => deleteSection(section.id ?? -1)}
            variant="outline"
            className="d-flex align-items-center justify-content-center mx-4"
            style={{ width: "40px", height: "40px" }}
          >
            <img
              security="true"
              src="https://cdn.icon-icons.com/icons2/3247/PNG/512/xmark_icon_198582.png"
              alt="xmark"
              width="40px"
              height="40px"
            />
          </Button>
          <Col>
            <ListGroup.Item
              key={index}
              style={{
                borderRadius: "50px",
                width: "100%",
                margin: "0.5rem auto",
                cursor: "pointer",
              }}
              onClick={() => redirectToSection(section.id ?? -1)}
            >
              <Col className="d-flex align-items-center">
                <Col>
                  <span>{section.name}</span>
                </Col>
                <span>
                  Вопросы: {sectionId_questionCount[section.id ?? -1]} шт
                </span>
              </Col>
            </ListGroup.Item>
          </Col>
        </Row>
      );
    } else {
      return (
        <ListGroup.Item
          key={index}
          style={{
            borderRadius: "50px",
            width: "93%",
            margin: "0.5rem auto",
            cursor: "pointer",
          }}
          onClick={() => redirectToSection(section.id ?? -1)}
        >
          <Col className="d-flex align-items-center">
            <Col>
              <span>{section.name}</span>
            </Col>
            <span>Вопросы: {sectionId_questionCount[section.id ?? -1]} шт</span>
          </Col>
        </ListGroup.Item>
      );
    }
  };

  return (
    <Container
      className="container-bg"
      style={{ backgroundColor: "#E5E5E5", border: "1px solid gray" }}
    >
      <Row className="shadow-text header-bg d-flex align-items-center">
        <Col className="ms-4">
          <h1>Разделы</h1>
        </Col>
        <Col xs="auto">
          {user_store?.user.role === "ADMIN" && (
            <Button
              variant="danger"
              className="shadow-text"
              onClick={() => {
                setSectionVisible(true);
                setReload(true);
              }}
            >
              Добавить раздел
            </Button>
          )}
          <img
            security="true"
            src="https://cdn.icon-icons.com/icons2/1579/PNG/512/3586373-book-education-learning-school_107944.png"
            alt="book"
            width="80"
            height="80"
            className="mx-5"
          />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col className="search-bar ms-3 ps-5 px-5">
          <SearchLine
            onSuggestionsChange={handleSuggestionsChange}
            placeholder="Поиск раздела..."
          />
        </Col>
      </Row>
      <ListGroup className="mt-3 shadow-text d-flex">
        {suggestions.map((section, index) => renderSectionsRow(section, index))}
      </ListGroup>
      <SectionCreate
        show={sectionVisible}
        onHide={() => setSectionVisible(false)}
      />
    </Container>
  );
});

export default SectionsBar;
