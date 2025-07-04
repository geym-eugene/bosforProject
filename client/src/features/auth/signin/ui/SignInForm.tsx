import { signinSchema } from "@/entities/user/model/userSchems";
import { signin } from "@/entities/user/model/userThunks";
import { useAppDispatch } from "@/shared/library/hooks";
import React, { useState } from "react";

function SignInForm({
  logReg,
  logRegHandler,
}: {
  logReg: boolean;
  logRegHandler: () => void;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const validated = signinSchema.parse(data);
      dispatch(signin(validated))
        .unwrap()
        .catch(() => {
          setError("Ошибка входа");
          setLoading(false);
        });
    } catch {
      setError("Неверные данные");
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-md space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Вход</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="email"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="current-password"
        required
      />

      {error && (
        <div className="text-sm text-red-600 text-center">{error}</div>
      )}

      <button
        className={`w-full bg-blue-600 text-white py-2 rounded font-semibold transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Вход..." : "Войти"}
      </button>

      <div className="text-center text-sm text-gray-600">
        Нет аккаунта?{" "}
        <button
          type="button"
          onClick={logRegHandler}
          className="text-blue-600 hover:underline"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export default SignInForm;