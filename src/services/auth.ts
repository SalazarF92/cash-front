import { IUser } from "@/interfaces/user";
import { get, post } from "./api";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

class AuthService {
  
  async login(username: string, password: string) {
    try {
      const { data } = await post("/user/login", { username, password });
      authService.setToken(data);
    } catch (error) {
      return error.message;
    }
  }

  async logout() {
    authService.deleteToken();
  }

  public setToken(token: string) {
    return new Promise((resolve, reject) => {
      try {
        const expirationDate = new Date((jwtDecode(token) as any).exp * 1000);

        setCookie("token", token, {
          expires: expirationDate,
        });
        localStorage.setItem("token", token);

        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getToken() {
    return getCookie("token");
  }

  public async me(): Promise<IUser> {
    const result = await get("/auth/me");

    return result.data as IUser;
  }

  public deleteToken() {
    localStorage.removeItem("token");
    deleteCookie("token");
  }
}

export const authService = new AuthService();
