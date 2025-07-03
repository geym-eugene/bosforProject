import { createSlice } from '@reduxjs/toolkit';
import type { UserStatType } from './userType';
import { logout, refresh, signin, signup } from './userThunks';

// начальное состояние юзера
const initialState: UserStatType = {
  user: null,
  loading: true,
  error: null,
  //   isModalOpen: false,
};

export const userSlice = createSlice({
  name: 'user',
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
      state.error = action.error.message ?? 'Что-то не так';
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
      state.error = action.error.message ?? 'Что-то не так';
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
      state.error = action.error.message ?? 'Что-то не так';
      state.loading = false;
    });
    // fulfilled добавлени
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.user = action.payload;
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
      state.error = action.error.message ?? 'Что-то не так';
      state.loading = false;
    });
    // fulfilled добавлени
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export default userSlice.reducer;
