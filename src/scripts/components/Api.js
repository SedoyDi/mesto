export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _checkResponse(res){
        if(res.ok){
            return res.json();
        }else {
            return Promise.reject('Извините произошла ошибка')
        }
    }
    _getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResponse);
    }
    _getAllCard() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResponse);
    }
    getAllData() {
        return Promise.all([this._getAllCard(), this._getUserData()])
    }
    postNewCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }
    patchDataUser(data){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkResponse);
    }

    patchAvatarUser(data){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponse);
    }
    
    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    likeCard(data){
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse);
    }
}