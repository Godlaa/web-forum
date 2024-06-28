import { Section } from "../models";
import { $authHost, $host } from "./index";

export const createSection = async (section: Section) => {
  const { data } = await $authHost.post("api/section", section);
  return data;
};

export const fetchSections = async () => {
  const { data } = await $host.get("api/section");
  return data;
};

export const fetchOneSection = async (id: number) => {
  const { data } = await $host.get("api/section/" + id);
  return data;
};

export const deleteSectionById = async (id: number) => {
  try {
    await $host.delete("api/section/" + id);
  } catch (error) {
    console.error("Bad delete section", error);
  }
};

export const updateSection = async (id: number, section: Partial<Section>) => {
  try {
    const { data } = await $authHost.put("api/section/" + id, section);
    return data;
  } catch (error) {
    console.error("Failed to update section", error);
    throw error;
  }
};
