// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
//выбираем место куда выгружается массив
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (item, deleteCard) {
  //клонирование шаблона карточки
  const patternCard = cardTemplate.querySelector('.card').cloneNode(true);
  //определяем переменные для элементов карточки
  const cardImage = patternCard.querySelector('.card__image');
  const cardTitel = patternCard.querySelector('.card__title');
  const buttonDelete = patternCard.querySelector('.card__delete-button');
  
  // элементы карточки
  cardImage.src = item.link;
  cardImage.alt = `Изображение места: ${item.name}`;
  cardTitel.textContent = item.name;
  //слушатель на кнопке для удаления
  buttonDelete.addEventListener('click', () => deleteCard(patternCard));   
  // получение карточки
  return patternCard;
  
}

// @todo: Функция удаления карточки
function deleteCard (cardElement) {
  //удаление карточки
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
//элементы массива пропускается через функцию
initialCards.forEach(function(element) {
  //выгружаем массив через функцию создания 
  placesList.append(createCard(element, deleteCard))
})

