export default class UserInfo {
    constructor ({name, about, avatar}) {
        this._elementName = name;
        this._elementInfoMe = about;
        this._elementAvatar = avatar;
    }

    getUserInfo() {
        return{
           name: this._elementName.textContent,
           info: this._elementInfoMe.textContent
        }
    }

    getUserId() {
        return this._userId;
    }

    setUserInfo({name, about, avatar, _id}) {
        this._elementName.textContent = name;
        this._elementInfoMe.textContent = about;
        this._elementAvatar.src = avatar;
        this._userId = _id;
    }

}