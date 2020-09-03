export default class UserInfo {
    constructor (elementName, elementInfoMe) {
        this._elementName = elementName;
        this._elementInfoMe = elementInfoMe;
    }

    getUserInfo(newName, newInfoMe) {
        return{
           name: newName.value =  this._elementName.textContent,
           info: newInfoMe.value = this._elementInfoMe.textContent
        }
    }

    setUserInfo(newName, newInfoMe) {
        this._elementName.textContent = newName.value;
        this._elementInfoMe.textContent = newInfoMe.value;
    }
}