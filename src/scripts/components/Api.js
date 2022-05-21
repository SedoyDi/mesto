export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _check(res){
        if(res.ok){
            return res.json();
        }
    }
    getAllCard() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._check);
    }
}