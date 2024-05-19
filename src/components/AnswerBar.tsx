import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Col, Row, Container, Accordion, Button } from "react-bootstrap";
import { Context } from "..";

const AnswerBar : React.FC  = observer(() => {

    const question_store = useContext(Context)?.question_store;
    
    return (
        <Container>
            <Row>
                <Col>
                    <Accordion className="mt-3" defaultActiveKey="0">
                        {question_store?.answers.map(answer => (
                        <Accordion.Item key={answer.id} eventKey={answer.id}>
                            <Accordion.Header>
                                <Container className="d-flex flex-nowrap justify-content-between align-items-center">
                                    <Row> 
                                        <Col>
                                            Ответ {answer.id}
                                        </Col>
                                    </Row>   
                                    <Row className="align-items-center me-4">
                                        <Col className="me-3">
                                            Автор: {answer.userId}
                                        </Col>
                                        Понравилось: {answer.likes}
                                    </Row>
                                </Container>
                            </Accordion.Header>

                            <Accordion.Body className="align-items-center">
                                <Container className="d-flex justify-content-between align-items-center">
                                    <Row className="d-flex"> 
                                        <Col md={11} className="ms-2">
                                            {answer.text}
                                        </Col>
                                    </Row>  
                                    <Button variant="outline-success">Понравилось</Button> 
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
});

export default AnswerBar;