import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { fetchUserPersonalsByUserId } from "../http/userPersonalsApi";
import { User, UserPersonals } from "../models";
import { useParams } from "react-router-dom";
import { avatar_url } from "../utils/consts";
import { Button } from "react-bootstrap";
import { fetchOneUser } from "../http/userApi";
import AnswerModal from "../components/modals/answersModal";
import QuestionModal from "../components/modals/questionsModal";

const OtherProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [answerVisible, setAnswerVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);

  const fetchUserPersonals = async (id: number) => {
    try {
      const response = await fetchUserPersonalsByUserId(id);
      setUser(response === null ? user : response);
      const responseSuper = await fetchOneUser(id);
      setUserSuperInfo(responseSuper === null ? userSuperInfo : responseSuper);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const [user, setUser] = useState<UserPersonals>({
    id: 0,
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

  const [userSuperInfo, setUserSuperInfo] = useState<User>({
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      fetchUserPersonals(parseInt(id));
    }
  }, [id]);

  return (
    <Container
      className="container-bg mt-5 mb-5"
      style={{ backgroundColor: "#E5E5E5", border: "1px solid gray" }}
    >
      <Row className="header-bg d-flex align-items-center">
        <Col className="shadow-text ms-4" style={{ fontSize: "44px" }}>
          Профиль
        </Col>
        <Col xs="auto">
          <img
            security="true"
            src={
              "https://cdn.icon-icons.com/icons2/1769/PNG/512/4092564-about-mobile-ui-profile-ui-user-website_114033.png"
            }
            alt="book"
            width="80"
            height="80"
            className="mx-5"
          />
        </Col>
      </Row>
      <Row className="profile-content d-flex justify-content-between mt-3 ms-5">
        <Col style={{ width: 300, height: 300 }}>
          <Card
            style={{
              backgroundColor: "#B6B6B6",
              width: 300,
              height: 300,
              marginLeft: 100,
            }}
          >
            <img
              style={{
                width: 300,
                height: 300,
              }}
              src={
                user?.avatar
                  ? avatar_url + user?.avatar
                  : "https://cdn.icon-icons.com/icons2/3553/PNG/512/account_profile_user_ecommerce_icon_224942.png"
              }
              alt="profile"
            />
          </Card>
        </Col>
        <Col className="d-flex" md={8}>
          <Col
            className="shadow-text profile-details d-column ms-4"
            style={{ backgroundColor: "#E5E5E5", border: "none" }}
          >
            <p>
              <strong>Имя:</strong> {user?.name}
            </p>
            <p>
              <strong>Фамилия:</strong> {user?.surname}
            </p>
            <p>
              <strong>Почта:</strong> {userSuperInfo?.email}
            </p>
            {userSuperInfo?.role === "USER" ? (
              <>
                <p>
                  <strong>Факультет:</strong> {user?.faculty}
                </p>
                <p>
                  <strong>Направление:</strong> {user?.group}
                </p>
                <p>
                  <strong>Курс:</strong> {user?.course}
                </p>
              </>
            ) : null}
          </Col>
        </Col>
      </Row>
      <Row className="profile-buttons d-flex align-items-center justify-content-between px-5">
        <Col>
          <Button
            variant="danger"
            className="shadow-text question-button"
            style={{ fontSize: "40px" }}
            onClick={() => setQuestionVisible(true)}
          >
            Вопросы
          </Button>
        </Col>
        <Col>
          <Button
            variant="danger"
            className="shadow-text question-button"
            style={{ fontSize: "40px" }}
            onClick={() => setAnswerVisible(true)}
          >
            Ответы
          </Button>
        </Col>
      </Row>
      <QuestionModal
        show={questionVisible}
        onHide={() => setQuestionVisible(false)}
      />
      <AnswerModal
        show={answerVisible}
        onHide={() => setAnswerVisible(false)}
      />
    </Container>
  );
};

export default OtherProfile;
