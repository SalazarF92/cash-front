import { IUser } from "@/interfaces/user";
import { get, post } from "./api";
import jwtDecode from "jwt-decode";
import { getCookie, setCookie, deleteCookie} from 'cookies-next'

class AuthService {
  async login(username: string, password: string) {
    try {
      const { data } = await post("/user/login", { username, password });
      await authService.setToken(data);
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async logout() {
    authService.deleteToken();
  }

  async setToken(token: string) {
    return new Promise((resolve, reject) => {
      try {
        const expirationDate = new Date((jwtDecode(token) as any).exp * 1000);

        setCookie("token", token, {
          expires: expirationDate,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getToken() {
    const result = getCookie("token");
    return result;
  }

  public async me(): Promise<IUser> {
    const result = await get("/user/me");

    return result.data as IUser;
  }

  public deleteToken() {
    deleteCookie("token");
  }
}

export const authService = new AuthService();
