import { signup } from "@/entities/user/model/userThunks";
import { useAppDispatch } from "@/shared/library/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SignForm.module.css";

function SignUpForm({ logReg, logRegHandler }): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (formData.password.length <= 3) {
      setError("Слишком короткий пароль");
      return;
    }
    if (
      formData.password
        .split("")
        .every((c) => c.toLowerCase() !== c.toUpperCase())
    ) {
      setError("Нужны цифры или спецсимволы");
      return;
    }

    setLoading(true);

    dispatch(signup(formData))
      .unwrap()
      // .then(() => navigate("/"))
      .catch((err) => {
        setError("Ошибка регистрации");
        setLoading(false);
      });
  };

  const isValid =
    formData.username.length > 0 &&
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <div className={styles.formTitle}>РЕГИСТРАЦИЯ</div>
      <input
        className={styles.inputField}
        name="username"
        type="text"
        placeholder="Введи имя пользователя"
        value={formData.username}
        onChange={handleChange}
        autoComplete="username"
      />
      <input
        className={styles.inputField}
        name="email"
        type="email"
        placeholder="Введи email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
      />
      <input
        className={styles.inputField}
        name="password"
        type="password"
        placeholder="Введи пароль"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      <input
        className={styles.inputField}
        name="confirmPassword"
        type="password"
        placeholder="Повтори пароль"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
      />
      <button
        className={styles.button}
        type="submit"
        disabled={!isValid || loading}
      >
        Зарегистрироваться
      </button>
      <div className={styles.error}>{error}</div>
      <div>
        есть аккаунт? <button onClick={logRegHandler}>Войти</button>
      </div>
    </form>
  );
}

export default SignUpForm;
