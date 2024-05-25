import { $host } from "./index";

export const createAnswer = async (section: {}) => {
    const {data} = await $host.post('api/answer', section);
    return data;
}

export const fetchAnswers = async () => {
    const {data}  = await $host.get('api/answer');
    return data;
}

export const fetchOneAnswer = async (id: number) => {
    const {data}  = await $host.get('api/answer/' + id);
    return data;
}

export const fetchAnswersByQuestionId = async (id: number) => {
    const {data}  = await $host.get('api/answer/?questionId=' + id);
    return data;
}