// функция открытие окна
function openPopup(item) {
  item.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// функция закрытие окна
function closePopup(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

// функция для нажатия на esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closePopup(popupOpen);
  }
}

export { openPopup, closePopup };
