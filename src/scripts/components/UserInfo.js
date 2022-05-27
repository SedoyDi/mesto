export default class UserInfo {
    static avatar = document.querySelector('.profile__avatar')

    constructor(nickNameSelector, aboutMeSelector){
        this._nickName = document.querySelector(nickNameSelector);
        this._aboutMe = document.querySelector(aboutMeSelector);
        this._userInfo = {}
    }

    setUserInfo(data) {
        this._nickName.textContent = data.name;
        this._aboutMe.textContent = data.about;
        UserInfo.avatar.src = data.avatar;
        this._userInfo = data;
    }

    getUserInfo () {
        return this._userInfo;
    }
    getIdUser() {
        return this._userInfo._id;
    }
}