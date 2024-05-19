import { makeAutoObservable } from 'mobx';

export default class UserStore {

    private _is_auth: boolean;
    private _user: any;

    constructor() {
        this._is_auth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean){
        this._is_auth = bool;
    }
    
    setUser(user: any){
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