import EmptyFieldException from "../exceptions/EmptyFieldException";

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

            return {
                message: "Usuário logado com sucesso."
            }
        } catch (error) {
            throw error;
        }
    }
}