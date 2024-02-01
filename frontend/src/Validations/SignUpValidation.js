const SignUpValidation = (values) => {
  let signUpError = {
    surname: "",
    name: "",
    email: "",
    password: "",
  };
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.surname === "") {
    signUpError.surname = "Введите фамилию";
  } else {
    signUpError.surname = "";
  }

  if (values.name === "") {
    signUpError.name = "Введите имя";
  } else {
    signUpError.name = "";
  }

  if (values.email === "") {
    signUpError.email = "Введите почту";
  } else if (!email_pattern.test(values.email)) {
    signUpError.email = "Электронная почта не соответствует";
  } else {
    signUpError.email = "";
  }

  if (values.password === "") {
    signUpError.password = "Введите пароль";
  } else if (!password_pattern.test(values.password)) {
    signUpError.password = "Пароль не соответствует";
  } else {
    signUpError.password = "";
  }

  return signUpError;
};

export default SignUpValidation;
