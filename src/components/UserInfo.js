export default class UserInfo {
    constructor (elementName, elementInfoMe) {
        this._elementName = elementName;
        this._elementInfoMe = elementInfoMe;
    }

    getUserInfo() {
        return{
           name: this._elementName.textContent,
           info: this._elementInfoMe.textContent
        }
    }

    setUserInfo(newName, newInfoMe) {
        this._elementName.textContent = newName.value;
        this._elementInfoMe.textContent = newInfoMe.value;
    }
}