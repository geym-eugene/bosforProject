import type { z } from 'zod';
import type { signinSchema, signupSchema, userSchema } from './userSchems';

// cxeма для возвращения юзера
export type UserType = z.infer<typeof userSchema>;
// схема для регистрации
export type SignupFormType = z.infer<typeof signupSchema>;
// схема для входа (прописываем true и убираем все лишнее)
export type SigninFormType = z.infer<typeof signinSchema>;
// пропишем состояние юзера
export type UserStatType = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
//   isModalOpen: boolean;
};
