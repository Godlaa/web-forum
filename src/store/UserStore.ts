import { makeAutoObservable } from 'mobx';
import { User } from '../models';

export default class UserStore {

    private _is_auth: boolean;
    private _user: User;

    constructor() {
        this._is_auth = false;
        this._user = {id: 0, email: '', role: '', password: '', createdAt: new Date(), updatedAt: new Date()};
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean){
        this._is_auth = bool;
    }
    
    setUser(user: User){
        this._user = user;
    }

    get isAuth(){
        return this._is_auth;
    }

    get user(){
        return this._user;
    }

    get userId(){
        return this._user.id;
    }
}