import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { QUESTION_ROUTE } from "../utils/consts";

const QuestionBar : React.FC  = observer( () => {
    const question_store = useContext(Context)?.question_store;
    const navigate = useNavigate();

    return (
        <Container> 
            <Table>
                <thead>
                    <tr>
                        <th style={{width: '1000px', border: '1px solid black'}}>Вопрос</th>
                        <th style={{width: '200px', border: '1px solid black', textAlign: 'center'}}>Дисциплина</th>
                        <th style={{width: '200px', border: '1px solid black', textAlign: 'center'}}>Дата обновления</th>
                        <th style={{width: '200px', border: '1px solid black', textAlign: 'center'}}>Количество ответов</th>
                    </tr>
                </thead>
                <tbody>
                    {question_store?.questions.map(question => 
                        <tr 
                        key = {question.id}
                        className={question.id === question_store.selectedQuestion.id ? 'table-active' : ''}
                        style={{border: '1px solid black'}}
                        onClick = {() => question_store.setSelectedQuestion(question)}
                        >
                            <td style={{width: '1000px', cursor: "pointer", border: '1px solid black'}} onClick={() => navigate(QUESTION_ROUTE + '/' + question.id)}> {question.header}</td>
                            <td style={{width: '200px', border: '1px solid black', textAlign: 'center'}}> {question.sectionId}</td>
                            <td style={{width: '200px', border: '1px solid black', textAlign: 'center'}}> 
                            {new Date(question.updatedAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric'}) + ' ' + new Date(question.updatedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit'})}
                            </td>
                            <td style={{width: '100px', border: '1px solid black', textAlign: 'center'}}> {}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
});

export default QuestionBar;


