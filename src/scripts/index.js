import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLikeButton, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

//DOM узлы

//выбираем место куда выгружается массив
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");

//Вывести карточки на страницу
initialCards.forEach((item) => renderCard(item, "append"));

// универсальная функция добавления карточки
// функция принимает в вызов карточку и метод вставки
function renderCard(element, method) {
  const cardElement = createCard(
    element,
    deleteCard,
    openImagePopup,
    handleLikeButton
  );
  placesList[method](cardElement);
}

// слушатель на кнопку открытия окна полльзователя
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  // значения в инпутах = значения в профиле
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// слушатель на кнопку добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

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
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // вставить новые значения
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

// обработчик формы добавления информации профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

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
  evt.target.reset();

  renderCard(newCard, "prepend");
  closePopup(popupNewCard);
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
