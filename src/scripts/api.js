const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "ce3e7b41-6515-4e50-831f-7896e40a48a0",
    "Content-Type": "application/json",
  },
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// инфо о пользователе
function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponse);
}

//изменение профиля
function redactProfile(newInfo) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newInfo.name,
      about: newInfo.about,
    }),
  }).then(getResponse);
}

//изменение аватара
function redactAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(getResponse);
}

//карточки
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponse);
}

//добавление новой карточки на сервер
function addNewCard(cardItem) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardItem.name,
      link: cardItem.link,
    }),
  }).then(getResponse);
}

//удаление карточки с сервера
function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
}

//Поставить лайк
function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponse);
}

//Убрать лайк
function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
}

export {
  getProfile,
  getCards,
  redactProfile,
  addNewCard,
  deleteCardApi,
  redactAvatar,
  putLike,
  removeLike,
}
