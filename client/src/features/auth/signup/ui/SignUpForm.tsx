import { signup } from "@/entities/user/model/userThunks";
import { useAppDispatch } from "@/shared/library/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function SignUpForm({
  logReg,
  logRegHandler,
}: {
  logReg: boolean;
  logRegHandler: () => void;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
        .every((c) => c.toLowerCase() === c.toUpperCase())
    ) {
      setError("Пароль должен содержать цифры или спецсимволы");
      return;
    }

    setLoading(true);

    dispatch(signup(formData))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {
        setLoading(false);
      });
  };

  const isValid =
    formData.username.length > 0 &&
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-md space-y-6"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Регистрация
        </h2>

        <input
          name="username"
          type="text"
          placeholder="Имя пользователя"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full bg-blue-600 text-white py-2 rounded font-semibold transition duration-200 ${
            !isValid || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <div className="text-center text-sm text-gray-600">
          Есть аккаунт?{" "}
          <button
            type="button"
            onClick={logRegHandler}
            className="text-blue-600 hover:underline"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
