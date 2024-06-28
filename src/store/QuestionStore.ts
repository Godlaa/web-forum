import { makeAutoObservable } from "mobx";
import { Answer, Question, Section } from "../models";

export default class QuestionStore {
  private _questions: Question[] = [];
  private _selectedQuestion: Question;
  private _answers: Answer[] = [];
  private _sections: Section[] = [];
  private _selectedSection: Section;

  constructor() {
    this._questions = [];
    this._selectedQuestion = {
      id: 0,
      header: "",
      markers: [],
      is_vip: false,
      userId: 0,
      sectionId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this._selectedSection = {
      id: 0,
      name: "",
      discipline: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this._answers = [];
    this._sections = [];
    makeAutoObservable(this);
  }

  setQuestions(questions: Question[]) {
    this._questions = questions;
  }

  get questions() {
    return this._questions;
  }

  setSelectedQuestion(question: Question) {
    this._selectedQuestion = question;
  }

  get selectedQuestion() {
    return this._selectedQuestion;
  }

  setAnswers(answers: Answer[]) {
    this._answers = answers;
  }
  get answers() {
    return this._answers;
  }

  setSections(sections: Section[]) {
    this._sections = sections;
  }

  get sections() {
    return this._sections;
  }

  setSelectedSection(section: Section) {
    this._selectedSection = section;
  }

  get selectedSection() {
    return this._selectedSection;
  }
}
