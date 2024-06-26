import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Context } from "..";
import {
  createUserPersonals,
  fetchUserPersonalsByUserId,
  updateUserPersonals,
} from "../http/userPersonalsApi";
import { UserPersonals } from "../models";
import { avatar_url } from "../utils/consts";
import "../css/Profile.css";
import AnswerModal from "../components/modals/answersModal";
import QuestionModal from "../components/modals/questionsModal";

const UserProfile: React.FC = () => {
  const user_store = useContext(Context)?.user_store;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);

  const fetchUserPersonals = async () => {
    try {
      if (user_store?.user?.id !== undefined) {
        const response = await fetchUserPersonalsByUserId(user_store?.user?.id);
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

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { id, name, surname, age, faculty, course, group, avatar } = user;
    const userId = user_store?.user?.id;

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("userId", String(userId));
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("age", String(age));
    formData.append("faculty", faculty);
    formData.append("course", String(course));
    formData.append("group", group);

    if (photoFile) {
      formData.append("avatar", photoFile);
    } else {
      formData.append("avatar", avatar);
    }

    try {
      let response = await fetchUserPersonalsByUserId(userId ?? -1);
      if (response === null) {
        response = await createUserPersonals(formData, {
          "Content-Type": "multipart/form-data",
        });
      } else {
        response = await updateUserPersonals(formData, {
          "Content-Type": "multipart/form-data",
        });
      }

      const photoUrl = response.avatar;
      setUser((prevUser) => ({
        ...prevUser,
        avatar: photoUrl,
      }));
      fetchUserPersonals();
      setIsEditing(false);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

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
              !isEditing
                ? "https://cdn.icon-icons.com/icons2/1769/PNG/512/4092564-about-mobile-ui-profile-ui-user-website_114033.png"
                : "https://cdn.icon-icons.com/icons2/569/PNG/512/pen-black-diagonal-symbol-of-writing-tool_icon-icons.com_54470.png"
            }
            alt="book"
            width="80"
            height="80"
            className="mx-5"
          />
        </Col>
      </Row>
      {isEditing ? (
        <>
          <Row className="profile-content d-flex align-items-center justify-content-between mt-3 ms-5">
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
                  style={{ width: 300, height: 300 }}
                  src={
                    photoFile
                      ? URL.createObjectURL(photoFile)
                      : "https://cdn.icon-icons.com/icons2/3553/PNG/512/account_profile_user_ecommerce_icon_224942.png"
                  }
                  alt="profile"
                />
              </Card>
            </Col>
            <Col className="d-flex" md={8}>
              <Col
                className="shadow-text profile-details "
                style={{ backgroundColor: "#E5E5E5", border: "none" }}
              >
                <Form className="ms-5">
                  <Form.Group controlId="formName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formSurname">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      value={user.surname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAge">
                    <Form.Label>Возраст</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={user.age}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {user_store?.user.role === "USER" ? (
                    <>
                      <Form.Group controlId="formFaculty">
                        <Form.Label>Факультет</Form.Label>
                        <Form.Control
                          type="text"
                          name="faculty"
                          value={user.faculty}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formCourse">
                        <Form.Label>Курс</Form.Label>
                        <Form.Control
                          type="number"
                          name="course"
                          value={user.course}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formGroup">
                        <Form.Label>Группа</Form.Label>
                        <Form.Control
                          type="text"
                          name="group"
                          value={user.group}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  ) : null}
                </Form>
              </Col>
              <Col
                className="shadow-text profile-details"
                style={{
                  backgroundColor: "#E5E5E5",
                  border: "none",
                  display: "flex",
                  justifyContent: "end",
                  height: "20%",
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  className="shadow-text question-button btn btn-danger"
                  style={{ width: "200px", fontSize: "40px" }}
                  onClick={handleEditClick}
                >
                  Отменить
                </Button>
              </Col>
            </Col>
          </Row>
          <Row className="profile-buttons d-flex align-items-center px-5">
            <Col>
              <label
                htmlFor="formAvatar"
                className="shadow-text question-button mx-4 btn btn-danger form-control"
                style={{ fontSize: "38px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="6 2 24 24"
                >
                  <g fill="none">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M13.06 3.283a1.5 1.5 0 0 0-2.12 0L5.281 8.939a1.5 1.5 0 0 0 2.122 2.122L10.5 7.965V19.5a1.5 1.5 0 0 0 3 0V7.965l3.096 3.096a1.5 1.5 0 1 0 2.122-2.122z"
                    />
                  </g>
                </svg>
                Фото
              </label>
              <input
                style={{ cursor: "pointer", display: "none" }}
                id="formAvatar"
                type="file"
                name="avatar"
                onChange={handleFileChange}
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                className="shadow-text question-button mx-4 btn btn-danger"
                style={{ fontSize: "40px" }}
                onClick={handleSubmit}
              >
                Сохранить
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="profile-content d-flex align-items-center justify-content-between mt-3 ms-5">
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
                className="shadow-text profile-details "
                style={{ backgroundColor: "#E5E5E5", border: "none" }}
              >
                <p>
                  <strong>Имя:</strong> {user?.name}
                </p>
                <p>
                  <strong>Фамилия:</strong> {user?.surname}
                </p>
                <p>
                  <strong>Почта:</strong> {user_store?.user.email}
                </p>
                {user_store?.user.role === "USER" ? (
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
              <Col
                className="shadow-text profile-details"
                style={{
                  backgroundColor: "#E5E5E5",
                  border: "none",
                  display: "flex",
                  justifyContent: "end",
                  height: "20%",
                }}
              >
                <Button
                  variant="primary"
                  className="shadow-text question-button mx-4 btn btn-danger"
                  style={{ width: "200px", fontSize: "40px" }}
                  onClick={handleEditClick}
                >
                  Изменить
                </Button>
              </Col>
            </Col>
          </Row>
          <Row className="profile-buttons d-flex align-items-center justify-content-between px-5">
            <Col>
              <Button
                variant="danger"
                className="shadow-text question-button"
                onClick={() => setQuestionVisible(true)}
                style={{ fontSize: "40px" }}
              >
                Мои Вопросы
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                className="shadow-text question-button"
                onClick={() => setAnswerVisible(true)}
                style={{ fontSize: "40px" }}
              >
                Мои Ответы
              </Button>
            </Col>
          </Row>
        </>
      )}
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

export default UserProfile;
