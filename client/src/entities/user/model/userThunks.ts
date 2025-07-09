import {createAsyncThunk} from "@reduxjs/toolkit";
import type {SigninFormType, SignupFormType} from "./userType";
import userService, {objectRoleT} from "../api/userService";

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

export const getAllUsersThunk = createAsyncThunk("users/get", async () =>
    userService.getAllUsersService()
);

export const giveAdminRoleThunk = createAsyncThunk(
    "user/toAdmin",
    async ({id, role}: { id: number; role: objectRoleT }) => {
        userService.giveAdminRole(id, role);
        return {id, role};
    }
);

export const addToFavoriteThunk = createAsyncThunk(
    "favorites/add",
    async (projectId: number) => {
        await userService.addToFavorite(projectId);
        return projectId
    }
);

export const getFavoritesThunk = createAsyncThunk('get/favorites', async () => userService.getFavorites())

export const deleteFavoritesThunk = createAsyncThunk('delete/favorites', async (id: number) => userService.deleteFavorite(id))

// export const getThatUserSunk = createAsyncThunk("user/getOne", async (id: number) => {
//   await userService.getThatUserService
//   return id
// })
