import React, {
    useState,
    useEffect,
  } from "react";
  import Card from "react-bootstrap/Card";
  import Col from "react-bootstrap/Col";
  import Container from "react-bootstrap/Container";
  import Row from "react-bootstrap/Row";
  import {
    fetchUserPersonalsByUserId,
  } from "../http/userPersonalsApi";
  import { UserPersonals } from "../models";
import { useParams } from "react-router-dom";
  
  const OtherProfile: React.FC = () => {

    const avatar_url = "http://localhost:5000/";
    const { id } = useParams<{ id: string }>();

    const fetchUserPersonals = async (id: number) => {
      try {
        const response = await fetchUserPersonalsByUserId(id);
        setUser(response === null ? user : response);
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
    if (id) {
      fetchUserPersonals(parseInt(id));
    }
  }, [id]);
  
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <Card className="mt-5">
              <Card.Body>
                <Card.Title>Профиль пользователя</Card.Title>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default OtherProfile;
  