import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestion } from "../http/questionsApi";
import { SECTION_ROUTE } from "../utils/consts";
import { fetchUserPersonalsByUserId } from "../http/userPersonalsApi";
import { UserPersonals } from "../models";
import { fetchOneSection } from "../http/sectionsApi";

interface Marker {
  title: string;
  number: number;
}

const QuestionCreatePage: React.FC = observer(() => {
  const question_store = useContext(Context)?.question_store;
  const user_store = useContext(Context)?.user_store;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [header, setHeader] = useState("");
  const [isVip, setIsVip] = useState(false);
  const fetchUserPersonals = async () => {
    try {
      if (user_store?.user?.id !== undefined) {
        const response = await fetchUserPersonalsByUserId(user_store?.user?.id);
        if (id) {
          const responseSection = await fetchOneSection(parseInt(id) ?? -1);
          question_store?.setSelectedSection(responseSection);
        }
        setUser(response === null ? user : response);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const [user, setUser] = useState<UserPersonals>({
    id: user_store?.user?.id ?? -1,
    name: "",
    surname: "",
    age: 0,
    faculty: "",
    course: 0,
    group: "",
    avatar: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    fetchUserPersonals();
  }, []);

  const addQuestion = () => {
    const userId = user_store?.user?.id;
    if (userId) {
      createQuestion({
        header: header,
        markers: markers.map((marker) => marker.title),
        isVip: isVip,
        userId: user_store.user.id ?? -1,
        sectionId: question_store?.selectedSection.id ?? -1,
      }).then(() => {
        setHeader("");
        setIsVip(false);
        setMarkers([]);
      });
    } else {
      console.log("user_store.user is not set or does not contain id");
    }
  };

  return (
    <Container
      className="container-bg mt-5"
      style={{ backgroundColor: "#E5E5E5", border: "1px solid gray" }}
    >
      <Row className="shadow-text header-bg d-flex align-items-center">
        <Col className="ms-4">
          <h1>Ваш вопрос</h1>
        </Col>
        <Col xs="auto">
          {question_store?.selectedSection.name}
          <img
            security="true"
            src="https://cdn.icon-icons.com/icons2/1238/PNG/512/questionmark_83826.png"
            alt="question"
            width="80"
            height="80"
            className="mx-3"
          />
        </Col>
      </Row>
      <Row className="search-bar ms-3">
        <Col xs="auto">
          <svg
            onClick={() => navigate(SECTION_ROUTE + "/" + id)}
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"
            />
          </svg>
        </Col>
        <Col>
          <Form>
            <Form.Group
              controlId="answerForm"
              className="shadow-text question-button"
            >
              <Form.Label className="ms-5 mt-2">
                {user.name ?? user_store?.user.email} {user.faculty}{" "}
                {user.course} курс
              </Form.Label>
              <Form.Control
                style={{ boxShadow: "none" }}
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Row className="d-flex justify-content-end align-items-end mx-3">
              <Button
                className="mt-3 shadow-text question-button"
                variant="danger"
                type="submit"
                onClick={addQuestion}
              >
                Отправить
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default QuestionCreatePage;
