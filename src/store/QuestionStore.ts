import { makeAutoObservable } from 'mobx';



export default class QuestionStore {

    private _questions: any[] = [];
    private _selectedQuestion: any = {};
    private _answers: any[] = [];
    private _sections: any[] = [];
    private _selectedSection: any = {};

    constructor() {
        this._questions = [];
        this._selectedQuestion = {};
        this._selectedSection = {};
        this._answers = [];
        this._sections = [];
        makeAutoObservable(this);
    }

    setQuestions(questions : any[]){
        this._questions = questions;
    }

    get questions(){
        return this._questions;
    }

    setSelectedQuestion(question: any){
        this._selectedQuestion = question;
    }   

    get selectedQuestion(){
        return this._selectedQuestion;
    }

    setAnswers(answers: any[]){
        this._answers = answers;
    }
    get answers(){
        return this._answers;
    }

    setSections(sections: any[]){
        this._sections = sections;
    }

    get sections(){
        return this._sections;
    }

    setSelectedSection(section: any){
        this._selectedSection = section;
    }   

    get selectedSection(){
        return this._selectedSection;
    }
}