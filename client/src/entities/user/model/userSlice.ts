import {createSlice} from "@reduxjs/toolkit";
import type {UserStatType} from "./userType";
import {
    addToFavoriteThunk,
    deleteFavoritesThunk,
    getAllUsersThunk,
    getCurrentUser,
    getFavoritesThunk,
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
    favorites: []
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

        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true
        });

        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false
        });

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false
        });

        builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        builder.addCase(giveAdminRoleThunk.fulfilled, (state, action) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);

            if (index !== -1 && state.users[index].role === 'user') {
                state.users[index] = {...state.users[index], role: 'moder'}
            } else if (index !== -1 && state.users[index].role === 'moder') {
                state.users[index] = {...state.users[index], role: 'user'}
            }
        });

        builder.addCase(getFavoritesThunk.fulfilled, (state, action) => {
            state.favorites = action.payload
        })

        builder.addCase(addToFavoriteThunk.fulfilled, (state, action) => {
            const newItem = state.favorites.find(el => el.id === action.payload)

            if (newItem) {
                state.favorites = [...state.favorites, newItem]
            }
        })

        builder.addCase(deleteFavoritesThunk.fulfilled, (state, action) => {
            console.log(state.favorites, action.payload);

            state.favorites = state.favorites.filter(({project: {id}}) => {
                console.log({id, payload: action.payload})
                return id !== action.payload
            })
        })
    },
});

export default userSlice.reducer;
