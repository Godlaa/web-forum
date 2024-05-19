import { $authHost, $host } from "./index";

export const createSection = async (section : {}) => {
    const {data} = await $authHost.post('api/section', section);
    return data;
}

export const fetchSections = async () => {
    const {data}  = await $host.get('api/section');
    return data;
}
