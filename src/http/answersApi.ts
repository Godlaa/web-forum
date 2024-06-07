import { Answer } from "../models";
import { $host } from "./index";

export const createAnswer = async (answer: Answer) => {
  try {
    const { data } = await $host.post("api/answer", answer);
    return data;
  } catch (error) {
    console.error("Error creating answer", error);
  }
};

export const fetchAnswers = async () => {
  try {
    const { data } = await $host.get("api/answer");
    return data;
  }
    catch (error) {
        console.error("Error fetching answers", error);
}
};

export const fetchOneAnswer = async (id: number) => {
  try {
    const { data } = await $host.get("api/answer/" + id);
    return data;
  }
    catch (error) {
        console.error("Error fetching answer", error);
    }
};

export const fetchAnswersByQuestionId = async (id: number) => {
  try {
    const { data } = await $host.get("api/answer/?questionId=" + id);
    return data;
  }
    catch (error) {
        console.error("Error fetching answers by question id", error);
    }
};
