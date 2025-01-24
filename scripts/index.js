// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard (item, deleteCard) {
  //клонирование шаблона карточки
  const patternCard = cardTemplate.querySelector('.card').cloneNode(true);
  // элементы карточки
  patternCard.querySelector('.card__image').src = item.link;
  patternCard.querySelector('.card__title').textContent = item.name;
  //выбрали кнопку для удаления карточки
  const buttonDelete = patternCard.querySelector('.card__delete-button');
  //слушатель на кнопке для удаления
  buttonDelete.addEventListener('click', deleteCard);   
  // получение карточки
  return patternCard;
}

// @todo: Функция удаления карточки
function deleteCard (event) {
  //элемент события на который навели мышку
  const eventTarget = event.target;
  //назначение переменной  которая выберет родительские элемент объекта события на котором есть таргет
  const cardRemove = eventTarget.closest('.card');
  //удаление карточки
  cardRemove.remove();
}

// @todo: Вывести карточки на страницу
//элементы массива пропускается через функцию
initialCards.forEach(function(element) {
  //выбираем место куда выгружается массив
  const placesList = document.querySelector('.places__list');
  //выгружаем массив через функцию создания 
  placesList.append(createCard(element, deleteCard))
})

