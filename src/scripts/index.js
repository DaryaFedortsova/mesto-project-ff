import "../pages/index.css";
import {
  placesList,
  editButton,
  popupEdit,
  addButton,
  popupNewCard,
  popups,
  popupAvatarEdit,
  profileImage,
  profileButton,
  newCardButton,
  avatarButton,
  validationConfig,
  popupImageCard,
  popupImage,
  popupTitle,
  profileForm,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  avatarForm,
  avatarLink,
  avatar,
  formNewPlase,
  placeName,
  linkInput,
} from "../utils/constants.js";
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
  clearValidation(popupAvatarEdit, validationConfig);
});

// слушатель на кнопку открытия окна полльзователя
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  // значения в инпутах = значения в профиле
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(popupEdit, validationConfig);
});

// слушатель на кнопку добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
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

// функция открытия попапа с картинкой
function openImagePopup(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupTitle.textContent = item.name;

  openPopup(popupImageCard);
}

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileButton.textContent = "Сохранение...";
  //Отправка данных на сервер
  redactProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      // вставить новые значения
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileButton.textContent = "Сохранить";
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
      evt.target.reset();
    })
    .catch((err) => {
      console.log("Ошибка отправки аватарки:", err);
    })
    .finally(() => {
      avatarButton.textContent = "Сохранить";
    });
}

// обработчик формы добавления нового аватара
avatarForm.addEventListener("submit", handleProfileAvatarSubmit);

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
    })
    .catch((err) => {
      console.log("Ошибка создания карточки:", err);
    })
    .finally(() => {
      newCardButton.textContent = "Сохранить";
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
    console.log("Ошибка при загрузке данных:", err);
  });
