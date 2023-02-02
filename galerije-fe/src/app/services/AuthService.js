// import ApiService from "./ApiService";

// class AuthService extends ApiService {
//   async login(data) {
//     const response = await this.client.post("/auth/login", data);
//     this.setLoginTokenAndredirectToAuthPage(response.data.access_token);
//     console.log('login servis')

//     return response;
//   }

//   async logout() {
//     await this.client.post("/auth/logout", {}, { headers: this.getHeaders() });
//     window.localStorage.removeItem("loginToken");
//     window.location.replace("/login");
//   }

//   async register(data) {
//     const response = await this.client.post("/auth/register", data);
//     this.setLoginTokenAndredirectToAuthPage(response.data.access_token);

//     return response;
//   }

//   getHeaders() {
//     return {
//       Authorization: `Bearer ${window.localStorage.getItem("loginToken")}`,
//     };
//   }

//   setLoginTokenAndredirectToAuthPage(token) {
//     window.localStorage.setItem("loginToken", token);
//     window.location.replace("/galleries");
//   }

//   getActiveUser = async () => {
//     const response = await this.client.get("/me");
//     return response.data;
//   };
// }

// export const authService = new AuthService();

import HttpService from "./HttpService";

class AuthService extends HttpService {


    login = async (credentials) => {
        const response = await this.client.post("/login", credentials);
        localStorage.setItem("token", response.data.authorization.token);
        return response.data
    };

    logout = async () => {
        await this.client.post("/logout");
        localStorage.removeItem("token");
    };

    register = async (user) => {
        const response = await this.client.post("/register", user);
        localStorage.setItem("token", response.data.authorization.token);
        return response.data

    };

    getActiveUser = async () => {
        const response = await this.client.get("/me");
        return response.data;
    };


}

const authService = new AuthService();
export default authService;