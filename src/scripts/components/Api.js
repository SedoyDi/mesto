export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _check(res){
        if(res.ok){
            return res.json();
        }else {
            return Promise.reject('Извините произошла ошибка')
        }
    }
    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._check);
    }
    getAllCard() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._check);
    }
    postNewCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._check);
    }
    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._check);
    }
}