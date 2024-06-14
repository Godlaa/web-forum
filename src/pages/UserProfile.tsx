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

const UserProfile: React.FC = () => {
  const user_store = useContext(Context)?.user_store;
  const [photoFile, setPhotoFile] = useState<File | null>(null);

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
    id: 0,
    name: "",
    surname: "",
    age: 0,
    faculty: "",
    course: "",
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
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
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
    formData.append("course", course);
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
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Профиль пользователя</Card.Title>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
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
                      type="text"
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
                  <Form.Group controlId="formAvatar">
                    <Form.Label>Фото</Form.Label>
                    <Form.Control
                      type="file"
                      name="avatar"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  <Button className="mt-3" variant="success" type="submit">
                    Сохранить
                  </Button>
                  <Button
                    className="mt-3 mx-3"
                    variant="secondary"
                    onClick={handleCancelClick}
                  >
                    Отмена
                  </Button>
                </Form>
              ) : (
                <Row className="align-items-center mt-3">
                  <Col md={6}>
                    <p>
                      <strong>Имя:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Фамилия:</strong> {user.surname}
                    </p>
                    <p>
                      <strong>Возраст:</strong> {user.age}
                    </p>
                    <p>
                      <strong>Факультет:</strong> {user.faculty}
                    </p>
                    <p>
                      <strong>Курс:</strong> {user.course}
                    </p>
                    <p>
                      <strong>Группа:</strong> {user.group}
                    </p>
                    <Button
                      className="mt-4"
                      variant="primary"
                      onClick={handleEditClick}
                    >
                      Редактировать
                    </Button>
                  </Col>
                  <Col md={4}>
                    {user.avatar && (
                      <img
                        src={avatar_url + user.avatar}
                        alt="Аватар пользователя"
                        width="250"
                        height="250"
                      />
                    )}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
