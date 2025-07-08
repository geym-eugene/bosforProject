import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SigninFormType, SignupFormType } from "./userType";
import userService from "../api/userService";

// для работы с ассинхонными
// нужен для удобной работы с асинхронными запросами в Redux Toolkit. Он автоматически создаёт экшены для разных стадий запроса и позволяет легко управлять состоянием загрузки и ошибок. (pending, fulfilled, rejected )
export const signup = createAsyncThunk(
  "user/signup",
  async (data: SignupFormType) => userService.signup(data)
);

export const signin = createAsyncThunk(
  "user/signin",
  async (data: SigninFormType) => userService.signin(data)
);

export const refresh = createAsyncThunk("user/refresh", async () =>
  userService.refresh()
);

export const logout = createAsyncThunk("user/logout", async () =>
  userService.logout()
);

export const getCurrentUser = createAsyncThunk("user/decode", async () =>
  userService.getCurrentUser()
);
