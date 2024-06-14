import { UserLikes } from "../models";
import { $host } from "./index";

export const fetchLikesByUserId = async (userId: number) => {
  try {
    const { data } = await $host.get("api/userLikes/?userId=" + userId);
    return data;
  } catch (error) {
    console.error("Error fetching likes", error);
  }
};

export const fetchLikesByAnswerId = async (answerId: number) => {
  try {
    const { data } = await $host.get("api/userLikes/?answerId=" + answerId);
    return data;
  } catch (error) {
    console.error("Error fetching likes", error);
  }
};

export const fetchLikesByAnswerIdAndUserId = async (
  answerId: number,
  userId: number
) => {
  try {
    const { data } = await $host.get(
      "api/userLikes/?answerId=" + answerId + "&userId=" + userId
    );
    return data;
  } catch (error) {
    console.error("Error fetching likes", error);
  }
};

export const createLike = async (like: UserLikes) => {
  try {
    const { data } = await $host.post("api/userLikes", like);
    return data;
  } catch (error) {
    console.error("Error creating like", error);
  }
};
