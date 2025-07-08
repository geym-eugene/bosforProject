import type { AxiosInstance } from "axios";
import { authApiResponseSchema } from "../model/userSchems";
import type {
  SigninFormType,
  SignupFormType,
  UserType,
} from "../model/userType";
import axiosInstance from "@/shared/api/axiosInstanse";
import { jwtDecode } from "jwt-decode";

class UserService {
  constructor(private readonly client: AxiosInstance) {}

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
}

export default new UserService(axiosInstance);
