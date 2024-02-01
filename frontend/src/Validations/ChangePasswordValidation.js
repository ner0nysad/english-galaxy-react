const ChangePasswordValidation = (values, password) => {
  let passwordError = {
    currentPassword: "",
    newPassword: "",
  };

  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.currentPassword === "") {
    passwordError.currentPassword = "Введите старый пароль";
  } else if (values.currentPassword.toString() !== password) {
    passwordError.currentPassword = "Неверный пароль";
  } else {
    passwordError.currentPassword = "";
  }

  if (values.newPassword === "") {
    passwordError.newPassword = "Введите новый пароль";
  } else if (!password_pattern.test(values.newPassword)) {
    passwordError.newPassword = "Пароль не соответствует";
  } else if (values.newPassword === values.currentPassword) {
    passwordError.newPassword = "Новый пароль должен быть другим";
  } else {
    passwordError.newPassword = "";
  }

  return passwordError;
};

export default ChangePasswordValidation;
