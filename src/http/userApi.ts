import { User } from "../models";
import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    id: number;
    email: string;
    role: string;
    iat?: number; // Поле временной метки в токене JWT (необязательно)
    exp?: number; // Поле временной метки окончания действия токена (необязательно)
}

function mapJwtPayloadToUser(payload: JwtPayload): User {
    return {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        password: '', // Пароль не доступен в JWT токене
        createdAt: undefined,
        updatedAt: undefined
    };
}

export const registration = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'});
    localStorage.setItem('token', data.token);
    return mapJwtPayloadToUser(jwtDecode(data.token));
}

export const login = async (email: string, password: string) => {
    const {data}  = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return mapJwtPayloadToUser(jwtDecode(data.token));
}

export const check = async () => {
    try {
        const {data}  = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return mapJwtPayloadToUser(jwtDecode(data.token));
    } catch (e) {
        console.log(e);
    }
}

export const fetchUsers = async () => {
    const {data}  = await $authHost.get('api/user');
    return data;
}

export const fetchOneUser = async (id: number) => {
    const {data}  = await $authHost.get('api/user/' + id);
    return data;
}

export const deleteUser = async (id: number) => {
    const {data}  = await $authHost.delete('api/user/' + id);
    return data;
}