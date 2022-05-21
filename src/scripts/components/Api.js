export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _check(){

    }
    getAllCard() {
        return fetch(this._url, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            return res.json()
        });
    }
}