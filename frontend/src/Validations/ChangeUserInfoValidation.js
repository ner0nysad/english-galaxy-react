const ChangeUserInfoValidation = (values) => {
  let userInfoError = {
    surname: "",
    name: "",
    email: "",
  };
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (values.surname === "") {
    userInfoError.surname = "Введите фамилию";
  } else {
    userInfoError.surname = "";
  }

  if (values.name === "") {
    userInfoError.name = "Введите имя";
  } else {
    userInfoError.name = "";
  }

  if (values.email === "") {
    userInfoError.email = "Введите почту";
  } else if (!email_pattern.test(values.email)) {
    userInfoError.email = "Электронная почта не соответствует";
  } else {
    userInfoError.email = "";
  }

  return userInfoError;
};

export default ChangeUserInfoValidation;
