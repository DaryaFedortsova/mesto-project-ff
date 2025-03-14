// показать ошибку
function showError(formElement, input, errorMessage) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

//скрыть ошибку
function hideError(formElement, input) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

//проверка полей на валидность
function isValid(formElement, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showError(formElement, input, input.validationMessage);
  } else {
    hideError(formElement, input);
  }
}

//ф. валидация всех форм
function enableValidation() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  forms.forEach((formElement) => {
    setEventListnersForInput(formElement);
  });
}

// ф.проверки полей на валидность
function hasInvalidInput(inputs) {
  return inputs.some((element) => {
    return !element.validity.valid;
  });
}

//ф. очистки ошибок и дезактивации кнопки
function clearValidation(popupForm) {
  const inputs = Array.from(popupForm.querySelectorAll(".popup__input"));
  const button = popupForm.querySelector(".popup__button");
  inputs.forEach((input) => {
    const errorElement = popupForm.querySelector(`.${input.id}-error`);
    hideError(popupForm, input, errorElement);
  });

  button.disabled = true;
}

//слушатели на поля ввода
function setEventListnersForInput(formElement) {
  const inputs = Array.from(formElement.querySelectorAll(".popup__input"));
  const button = formElement.querySelector(".popup__button");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input);
      toggleButtonState(inputs, button);
    });
  });
  toggleButtonState(inputs, button);
}

//ф. состояния кнопки
function toggleButtonState(inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

export { clearValidation, enableValidation };
