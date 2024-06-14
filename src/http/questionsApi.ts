import { Question } from "../models";
import { $host } from "./index";

export const createQuestion = async (question: Question) => {
  const { data } = await $host.post("api/question", question);
  return data;
};

export const fetchQuestions = async () => {
  const { data } = await $host.get("api/question");
  return data;
};

export const fetchOneQuestion = async (id: number) => {
  const { data } = await $host.get("api/question/" + id);
  return data;
};

export const fetchQuestionsBySectionId = async (id: number) => {
  const { data } = await $host.get("api/question/?sectionId=" + id);
  return data;
};
