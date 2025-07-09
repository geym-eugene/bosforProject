import type { z } from "zod";
import type { signinSchema, signupSchema, userSchema } from "./userSchems";
import { ProjectT } from "@/entities/projects/model/projectType";

// cxeма для возвращения юзера
export type UserType = z.infer<typeof userSchema>;
// схема для регистрации
export type SignupFormType = z.infer<typeof signupSchema>;
// схема для входа (прописываем true и убираем все лишнее)
export type SigninFormType = z.infer<typeof signinSchema>;
// пропишем состояние юзера
export type UserStatType = {
  users: UserType[];
  user: UserType | null;
  loading: boolean;
  error: string | null;
  //   isModalOpen: boolean;
};

export type UsersT = UserType[];

export type FavoriteT = {
  id: 1;
  project: ProjectT
};

export type FavoritestT = FavoriteT[];
