import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { SECTION_ROUTE } from "../utils/consts";

const SectionsBar : React.FC  = observer( () => {
    const question_store = useContext(Context)?.question_store;
    const navigate = useNavigate();
    
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
                        <td style={{border: '1px solid black', textAlign: 'center'}}> {0.9}</td>
                        <td style={{border: '1px solid black', textAlign: 'center'}}> {5}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
});

export default SectionsBar;


