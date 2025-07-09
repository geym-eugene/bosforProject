import { createSlice } from "@reduxjs/toolkit";
import type { UserStatType } from "./userType";
import {
  getAllUsersThunk,
  getCurrentUser,
  giveAdminRoleThunk,
  logout,
  refresh,
  signin,
  signup,
} from "./userThunks";

// начальное состояние юзера
const initialState: UserStatType = {
  users: [],
  user: null,
  loading: true,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  // Экстроредьюсер прописываем дополнительный редуктор (передаем конструктор)
  extraReducers(builder) {
    // для регистрации
    //  загрузка pending
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //  rejected ошибка
    builder.addCase(signup.rejected, (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message ?? "Что-то не так";
      state.loading = false;
    });
    // fulfilled добавление
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      // state.isModalOpen = false;
      state.error = null;
    });

    // для входа
    //  загрузка pending
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //  rejected ошибка
    builder.addCase(signin.rejected, (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message ?? "Что-то не так";
      state.loading = false;
    });
    // fulfilled добавление
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      // state.isModalOpen = false;
      state.error = null;
    });

    // для refresh
    //  загрузка pending
    builder.addCase(refresh.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //  rejected ошибка
    builder.addCase(refresh.rejected, (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message ?? "Что-то не так";
      state.loading = false;
    });
    // fulfilled добавлени
    builder.addCase(refresh.fulfilled, (state, action) => {
      // state.user = action.payload;
      state.loading = false;
      state.error = null;
    });

    // выход
    //  загрузка pending
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //  rejected ошибка
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message ?? "Что-то не так";
      state.loading = false;
    });
    // fulfilled добавлени
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(giveAdminRoleThunk.fulfilled, (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);

      if (index !== -1 && state.users[index].role === 'user') {
        state.users[index] = {...state.users[index], role: 'moder'}
      }
       else if (index !== -1 && state.users[index].role === 'moder') {
        state.users[index] = {...state.users[index], role: 'user'}
      }
    });
  },
});

export default userSlice.reducer;
