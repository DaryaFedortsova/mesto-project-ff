// показать ошибку
function showError(formElement, input, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

//скрыть ошибку
function hideError(formElement, input, settings) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

//проверка полей на валидность
function isValid(formElement, input, settings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showError(formElement, input, input.validationMessage, settings);
  } else {
    hideError(formElement, input, settings);
  }
}

//ф. валидация всех форм
function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => {
    setEventListnersForInput(formElement, settings);
  });
}

// ф.проверки полей на валидность
function hasInvalidInput(inputs) {
  return inputs.some((element) => {
    return !element.validity.valid;
  });
}

//ф. очистки ошибок и дезактивации кнопки
function clearValidation(popupForm, settings) {
  const inputs = Array.from(popupForm.querySelectorAll(settings.inputSelector));
  const button = popupForm.querySelector(settings.submitButtonSelector);
  inputs.forEach((input) => {
    hideError(popupForm, input, settings);
  });

  button.disabled = true;
}

//слушатели на поля ввода
function setEventListnersForInput(formElement, settings) {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const button = formElement.querySelector(settings.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
  toggleButtonState(inputs, button, settings);
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
