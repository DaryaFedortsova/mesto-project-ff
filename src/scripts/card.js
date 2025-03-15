import { deleteCardApi, putLike, removeLike } from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
function createCard(
  item,
  deleteCard,
  openImagePopup,
  handleLikeButton,
  userId
) {
  //клонирование шаблона карточки
  const patternCard = cardTemplate.querySelector(".card").cloneNode(true);
  //определяем переменные для элементов карточки
  const cardImage = patternCard.querySelector(".card__image");
  const cardTitel = patternCard.querySelector(".card__title");
  const buttonDelete = patternCard.querySelector(".card__delete-button");
  const likeCounter = patternCard.querySelector(".card__like-counter");

  // элементы карточки
  cardImage.src = item.link;
  cardImage.alt = `Изображение места: ${item.name}`;
  cardTitel.textContent = item.name;
  likeCounter.textContent = item.likes.length;

  if (userId !== item.owner._id) {
    buttonDelete.remove();
  } else {
    //слушатель на кнопке для удаления
    buttonDelete.addEventListener("click", () =>
      deleteCard(patternCard, item._id)
    );
  }

  //слушатель на элемент карточки для открытия картинки в окне
  cardImage.addEventListener("click", () => openImagePopup(item));

  const likeButton = patternCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    handleLikeButton(likeButton, item._id, likeCounter)
  );

  if (item.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return patternCard;
}

//функция лайка
function handleLikeButton(button, cardId, likeCounter) {
  const like = button.classList.contains("card__like-button_is-active");
  if (like) {
    removeLike(cardId)
      .then((update) => {
        likeCounter.textContent = update.likes.length;
        button.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка:", err);
      });
  } else {
    putLike(cardId)
      .then((update) => {
        likeCounter.textContent = update.likes.length;
        button.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка:", err);
      });
  }
}

// @todo: Функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки:", err);
    });
}

export { createCard, handleLikeButton, deleteCard };
