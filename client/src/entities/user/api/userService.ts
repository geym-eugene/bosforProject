import type {AxiosInstance} from "axios";
import {authApiResponseSchema} from "../model/userSchems";
import type {FavoriteT, SigninFormType, SignupFormType, UsersT, UserType,} from "../model/userType";
import axiosInstance from "@/shared/api/axiosInstanse";
import {jwtDecode} from "jwt-decode";

export type objectRoleT = {
    role: string;
};

class UserService {
    constructor(private readonly client: AxiosInstance) {
    }

    async signup(data: SignupFormType): Promise<UserType> {
        const response = await this.client.post("/auth/register", data);
        // парсим на соответствие authApiResponseSchema полученного ответа
        return authApiResponseSchema.parse(response.data).user;
    }

    async signin(data: SigninFormType): Promise<UserType> {
        const response = await this.client.post("/auth/login", data);
        return authApiResponseSchema.parse(response.data).user;
    }

    async refresh(): Promise<UserType> {
        const response = await this.client.post("/auth/refresh");
        const decodedUser = await jwtDecode(response.data.accessToken);
        return authApiResponseSchema.parse(response.data).user;
    }

    async getCurrentUser(): Promise<UserType> {
        const response = await this.client.post("/auth/refresh");
        return jwtDecode(response.data.accessToken);
    }

    async logout(): Promise<null> {
        await this.client.post("/auth/logout");
        return null;
    }

    async getAllUsersService(): Promise<UsersT> {
        return (await this.client.get("/users")).data;
    }

    async giveAdminRole(id: number, rol: objectRoleT): Promise<void> {
        console.log(rol);
        const role = {
            role: rol,
        };

        const response = await this.client.patch(`/users/${id}/role`, role);

        console.log(response.data);
        return response.data;
    }

    async addToFavorite(projectId: number): Promise<void> {
        await this.client.post(`favorites/${projectId}`);
    }

    async getFavorites() {
        const response = await this.client.get<FavoriteT[]>('favorites');
        return response.data
    }

    async deleteFavorite(id: number): Promise<number> {
        await this.client.delete<FavoriteT[]>(`favorites/${id}`);
        return id
    }

    // async getThatUserService(id: number): Promise<UserType> {
    //   return (await this.client.get(`/user/:${id.toString()}`)).data;
    // }
}

export default new UserService(axiosInstance);
