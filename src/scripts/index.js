import "../pages/index.css";
import { createCard, handleLikeButton, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  getProfile,
  getCards,
  redactProfile,
  addNewCard,
  redactAvatar,
} from "./api.js";

//выбираем место куда выгружается массив
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const popupAvatarEdit = document.querySelector(".popup_edit_avatar");
const profileImage = document.querySelector(".profile__image");
const profileButton = popupEdit.querySelector(".popup__button");
const newCardButton = popupNewCard.querySelector(".popup__button");
const avatarButton = popupAvatarEdit.querySelector(".popup__button");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// универсальная функция добавления карточки
// функция принимает в вызов карточку и метод вставки
function renderCard(element, method) {
  const cardElement = createCard(
    element,
    deleteCard,
    openImagePopup,
    handleLikeButton,
    userId
  );
  placesList[method](cardElement);
}

profileImage.addEventListener("click", () => {
  openPopup(popupAvatarEdit);
})

// слушатель на кнопку открытия окна полльзователя
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  // значения в инпутах = значения в профиле
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(popupEdit);
})

// слушатель на кнопку добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
})

// Закрытие нажатием на оверлей или крест
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
})

// элементы для попапа с картинкой
const popupImageCard = document.querySelector(".popup_type_image");
const popupImage = popupImageCard.querySelector(".popup__image");
const popupTitle = popupImageCard.querySelector(".popup__caption");

// функция открытия попапа с картинкой
function openImagePopup(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupTitle.textContent = item.name;

  openPopup(popupImageCard);
}

// работа с инпутами в редакторе профиля
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//форма и инпут смены аватара
const avatarForm = document.forms["avatar-edit"];
const avatarLink = avatarForm.elements.avatar;
const avatar = document.querySelector(".profile__image");

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // вставить новые значения
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  profileButton.textContent = "Сохранение...";

  //Отправка данных на сервер
  redactProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileButton.textContent = "Сохранить";
    })
    .then(() => {
      closePopup(popupEdit);
    });
}

// обработчик формы добавления информации профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

//обработчик отправки ссылки на новый аватар
function handleProfileAvatarSubmit(evt) {
  evt.preventDefault();

  avatarButton.textContent = "Сохранение...";
  redactAvatar(avatarLink.value)
    .then((data) => {
      avatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupAvatarEdit);
      clearValidation(popupAvatarEdit);
      evt.target.reset();
    })
    .then(() => {
      avatarButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log("Ошибка отправки аватарки:", err);
    });
}

// обработчик формы добавления нового аватара
avatarForm.addEventListener("submit", handleProfileAvatarSubmit);

// инпуты добавления новой карточки
const formNewPlase = document.forms["new-place"];
const placeName = formNewPlase.elements["place-name"];
const linkInput = formNewPlase.elements.link;

// функция добавления новой карточки и информации к ней
function handleFormAddCard(evt) {
  evt.preventDefault();

  const newPlaceName = placeName.value;
  const newImage = linkInput.value;
  //обьекты для новой карточки
  const newCard = {
    name: newPlaceName,
    link: newImage,
    alt: newPlaceName,
  };
  newCardButton.textContent = "Сохранение...";
  addNewCard(newCard)
    .then((data) => {
      renderCard(data, "prepend");
      //очистка поля
      evt.target.reset();
      closePopup(popupNewCard);
      clearValidation(popupNewCard);
    })
    .then(() => {
      newCardButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log("Ошибка создания карточки:", err);
    });
}

// обработчик формы добавления новой карточки
formNewPlase.addEventListener("submit", handleFormAddCard);

// плавное открытие
function setSmoothPopupOpening() {
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}
setSmoothPopupOpening();

enableValidation(validationConfig);

let userId;

Promise.all([getProfile(), getCards()])
  .then(([profileInfo, cards]) => {
    userId = profileInfo._id;
    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    avatar.style.backgroundImage = `url(${profileInfo.avatar})`;

    cards.forEach((item) => {
      renderCard(item, "append", userId);
    });
  })
  .catch((err) => {
    console.log(err);
  });
