const LoginValidation = (values) => {
  let loginError = {
    email: "",
    password: "",
  };
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.email === "") {
    loginError.email = "Введите почту";
  } else if (!email_pattern.test(values.email)) {
    loginError.email = "Электронная почта не соответствует";
  } else {
    loginError.email = "";
  }

  if (values.password === "") {
    loginError.password = "Введите пароль";
  } else {
    loginError.password = "";
  }

  return loginError;
};

export default LoginValidation;
