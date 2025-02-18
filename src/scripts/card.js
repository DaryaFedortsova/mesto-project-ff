const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(item, deleteCard, openImagePopup, handleLikeButton) {
  //клонирование шаблона карточки
  const patternCard = cardTemplate.querySelector(".card").cloneNode(true);
  //определяем переменные для элементов карточки
  const cardImage = patternCard.querySelector(".card__image");
  const cardTitel = patternCard.querySelector(".card__title");
  const buttonDelete = patternCard.querySelector(".card__delete-button");

  // элементы карточки
  cardImage.src = item.link;
  cardImage.alt = `Изображение места: ${item.name}`;
  cardTitel.textContent = item.name;
  //слушатель на кнопке для удаления
  buttonDelete.addEventListener("click", () => deleteCard(patternCard));

  //слушатель на элемент карточки для открытия картинки в окне
  cardImage.addEventListener("click", () => openImagePopup(item));

  const likeButton = patternCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeButton);

  return patternCard;
};

//функция лайка
function handleLikeButton(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};

export { createCard, handleLikeButton, deleteCard };