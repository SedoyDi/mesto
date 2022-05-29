export default class UserInfo {
    constructor(avatarSelector, nickNameSelector, aboutMeSelector){
        this._avatar = document.querySelector(avatarSelector);
        this._nickName = document.querySelector(nickNameSelector);
        this._aboutMe = document.querySelector(aboutMeSelector);
        this._userInfo = {}
    }

    setUserInfo(data) {
        this._nickName.textContent = data.name;
        this._aboutMe.textContent = data.about;
        this._avatar.src = data.avatar;
        this._userInfo = data;
    }

    getUserInfo () {
        return this._userInfo;
    }
    getIdUser() {
        return this._userInfo._id;
    }
}