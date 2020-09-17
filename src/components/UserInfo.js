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

    setUserInfo({name, about, avatar}) {
        this._elementName.textContent = name;
        this._elementInfoMe.textContent = about;
        this._elementAvatar.src = avatar;
    }

    // setUserAvatar(avatar) {
    //
    // }
}