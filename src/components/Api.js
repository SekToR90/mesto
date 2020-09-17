export default class Api {
    constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
    }

    // Получаем массив карточек
    getAllCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Загружаем информацию о пользователе с сервера
    getUserMe() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Сохраняем отредактированные данные профиля
    patchUsersMe(value) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: value.name,
                about: value.aboutMe
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //добавляем новую карточку
    postAddCard(value) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: value.plase,
                link: value.url
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Обновление аватара пользователя
    patchUsersAvatar(value) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: value.urlAvatar
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Запрос на лайк карточки
    putLikeCards() {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Запрос на снятие лайка
    deleteLikeCards() {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}