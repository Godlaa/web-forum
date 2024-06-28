import { Question } from "../models";
import { $authHost, $host } from "./index";

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

export const fetchQuestionsByUserId = async (userId: number) => {
  const { data } = await $host.get("api/question/?userId=" + userId);
  return data;
};

export const deleteQuestionById = async (id: number) => {
  try {
    await $host.delete("api/question/" + id);
  } catch (error) {
    console.error("Bad delete question", error);
  }
};

export const updateQuestion = async (
  id: number,
  question: Partial<Question>
) => {
  try {
    const { data } = await $authHost.put("api/question/" + id, question);
    return data;
  } catch (error) {
    console.error("Failed to update question", error);
    throw error;
  }
};
