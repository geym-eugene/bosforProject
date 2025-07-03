import { signinSchema } from '@/entities/user/model/userSchems';
import { signin } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './SignForm.module.css';

function SignInForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const hendleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const validated = signinSchema.parse(data);
      dispatch(signin(validated))
        .unwrap()
        .then(() => navigate('/'))
        .catch(() => {
          setError('Ошибка входа');
          setLoading(false);
        });
    } catch {
      setError('Неверные данные');
      setLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={hendleSubmit}>
      <div className={styles.formTitle}>ВХОД</div>
      <input
        className={styles.inputField}
        name="email"
        type="email"
        placeholder="Введи email"
        autoComplete="email"
      />
      <input
        className={styles.inputField}
        name="password"
        type="password"
        placeholder="Введи пароль"
        autoComplete="current-password"
      />
      <button className={styles.button} type="submit" disabled={loading}>
        Войти
      </button>
      <div className={styles.error}>{error}</div>
    </form>
  );
}

export default SignInForm;
