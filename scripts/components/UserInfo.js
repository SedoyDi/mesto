export default class UserInfo {
    constructor({nickNameSelector, aboutMeSelector}){
        this._nickName = document.querySelector(nickNameSelector);
        this._aboutMe = document.querySelector(aboutMeSelector);
        this._userInfo = {};
    }
    getUserInfo = () => {
        this._userInfo.nickName = this._nickName.textContent;
        this._userInfo.aboutMe = this._aboutMe.textContent;
        return this._userInfo;
    }
    setUserInfo = (data) => {
        this._nickName.textContent = data.nickName;
        this._aboutMe.textContent = data.aboutMe;
    }
}