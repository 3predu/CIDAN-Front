import { API_URL } from "../config";

import EmptyFieldException from "../exceptions/EmptyFieldException";
import ServerSideException from "../exceptions/ServerSideException";
import UnauthorizedException from "../exceptions/UnauthorizedException";

export default class UserModel {
    #login;
    #password;

    constructor({ login, password }) {
        this.#login = login;
        this.#password = password;
    }

    get login() {
        return this.#login;
    }

    async signIn() {
        try {
            if (!this.#login || !this.#password) {
                throw new EmptyFieldException('Login e senha são obrigatórios', 'warning');
            }

            const requestBody = {
                login: this.#login,
                password: this.#password
            }

            const response = await fetch(`${API_URL}/auth/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const statusResponse = response.status;

            const { message } = await response.json();

            switch (statusResponse) {
                case 200:
                    return {
                        message
                    }

                case 401:
                    throw new UnauthorizedException(message, "warning");

                case 500:
                    throw new ServerSideException(message);
            }

        } catch (error) {
            throw error;
        }
    }
}