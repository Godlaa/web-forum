import { observer } from "mobx-react-lite";
import React, { useContext, useEffect} from "react";
import { Table } from "react-bootstrap";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { SECTION_ROUTE } from "../utils/consts";
import { fetchQuestionsBySectionId } from "../http/questionsApi";

const SectionsBar : React.FC  = observer( () => {

    const question_store = useContext(Context)?.question_store;
    const navigate = useNavigate();
    const [sectionId_questionCount, setSectionId_questionCount] = React.useState<{[key: number]: number}>({});
    
    useEffect(() => {
        question_store?.sections.map(section => 
            fetchQuestionsBySectionId(section.id).then(data => {
                setSectionId_questionCount(prevState => ({...prevState, [section.id]: data.count}));
            })
        );
    }, [question_store?.sections]);


    return (
        <Table>
            <thead>
                <tr>
                    <th style={{width: '1000px', border: '1px solid black'}}>Название</th>
                    <th style={{width: '200px', border: '1px solid black', textAlign: 'center'}}>Дисциплина</th>
                    <th style={{width: '200px', border: '1px solid black', textAlign: 'center'}}>Дата обновления</th>
                    <th style={{width: '300px', border: '1px solid black', textAlign: 'center'}}>Количество вопросов</th>
                </tr>
            </thead>
            <tbody>
                {question_store?.sections.map(section =>
                    <tr 
                    key = {section.id}
                    className={section.id === question_store.selectedSection.id ? 'table-active' : ''}
                    style={{border: '1px solid black'}}
                    onClick = {() => question_store.setSelectedSection(section)}
                    >
                        <td style={{cursor: "pointer", border: '1px solid black'}} onClick={() => navigate(SECTION_ROUTE + '/' + section.id)}> {section.name}</td>
                        <td style={{border: '1px solid black', textAlign: 'center'}}> {section.discipline}</td>
                        <td style={{border: '1px solid black', textAlign: 'center'}}> 
                        {new Date(section.updatedAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric'}) + ' ' + new Date(section.updatedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit'})}
                        </td>
                        <td style={{border: '1px solid black', textAlign: 'center'}}> {sectionId_questionCount[section.id]} </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
});

export default SectionsBar;


