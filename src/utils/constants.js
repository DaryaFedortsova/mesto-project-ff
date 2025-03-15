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
// элементы для попапа с картинкой
const popupImageCard = document.querySelector(".popup_type_image");
const popupImage = popupImageCard.querySelector(".popup__image");
const popupTitle = popupImageCard.querySelector(".popup__caption");
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
// инпуты добавления новой карточки
const formNewPlase = document.forms["new-place"];
const placeName = formNewPlase.elements["place-name"];
const linkInput = formNewPlase.elements.link;
export {
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
};
