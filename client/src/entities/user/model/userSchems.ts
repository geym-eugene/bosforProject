import { z } from 'zod';

// cxeма для возвращения юзера
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});

// схема для регистрации
export const signupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(3),
  confirmPassword: z.string(),
});

// схема для входа (прописываем true и убираем все лишнее)
export const signinSchema = signupSchema.omit({ username: true, confirmPassword: true });

// для проверки авторизации напишем схему (то что нам возвращается)
export const authApiResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});
