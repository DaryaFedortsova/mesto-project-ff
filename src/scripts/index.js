import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLikeButton, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

//DOM узлы
//Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
//выбираем место куда выгружается массив
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

//Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(
    createCard(element, deleteCard, openImagePopup, handleLikeButton)
  );
});

// слушатель на окна для звкрытия нажатием вне окна
document.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});

// слушатель на кнопку открытия окна полльзователя
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});

// слушатель на кнопку добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

//слушатель на кнопку-крестик для открытых окон
popupClose.forEach((cross) => {
  cross.addEventListener("click", function (evt) {
    const element = evt.target.closest(".popup");
    if (element) {
      closePopup(element);
    }
  });
});

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
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// значения в инпутах = значения в профиле
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

//Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  // вставить новые значения
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

// обработчик формы добавления информации профиля
formElement.addEventListener("submit", handleFormSubmit);

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
 
  //очистка поля
  placeName.value = "";
  linkInput.value = "";

  placesList.prepend(createCard(newCard, deleteCard, openImagePopup, handleLikeButton));
  closePopup(popupNewCard);
}


// обработчик формы добавления новой карточки
formNewPlase.addEventListener("submit", handleFormAddCard);

// плавное открытие
const popups = document.querySelectorAll(".popup");
function smoothOpenPopup() {
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}
smoothOpenPopup();
