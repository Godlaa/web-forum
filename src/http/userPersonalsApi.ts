import { $authHost } from "./index";

export const fetchUsersPersonals = async () => {
    const {data}  = await $authHost.get('api/userInfo');
    return data;
}

export const fetchUserPersonalsByUserId = async (userId: number) => {
    const {data}  = await $authHost.get('api/userInfo/' + userId);
    return data;
}

export const deleteUserPersonals = async (id: number) => {
    const {data}  = await $authHost.delete('api/userInfo/' + id);
    return data;
}

export const createUserPersonals = async (userPersonals : FormData, headers : {'Content-Type': string}) => {
    const {data} = await $authHost.post('api/userInfo', userPersonals, {headers});
    return data;
}

export const updateUserPersonals = async (userPersonals : FormData, headers : {'Content-Type': string}) => {
    const {data} = await $authHost.put('api/userInfo/' + userPersonals.get('id'), userPersonals, {headers});
    return data;
}
