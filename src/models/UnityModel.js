import ServerSideException from "../exceptions/ServerSideException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { API_URL } from "../config";
import EmptyFieldException from "../exceptions/EmptyFieldException";
import BadRequestException from "../exceptions/BadRequestException";
import CustomException from "../exceptions/CustomException";
import NotFoundException from "../exceptions/NotFoundException";

export default class UnityModel {
    #id;
    #name;
    #createdAt;
    #updatedAt;
    #deletedAt;

    constructor({ id, name, createdAt, updatedAt, deletedAt }) {
        this.#id = id;
        this.#name = name;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#deletedAt = deletedAt;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    get deletedAt() {
        return this.#deletedAt;
    }

    async create() {
        try {
            if (!this.#name) {
                throw new EmptyFieldException('Nome é obrigatório', 'warning');
            }

            const token = localStorage.getItem('token');
    
            const requestBody = {
                name: this.#name
            }
    
            const response = await fetch(`${API_URL}/unity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
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

                case 400:
                    throw new BadRequestException(message, "warning");

                case 401:
                    throw new UnauthorizedException(message, "warning");

                case 500:
                    throw new ServerSideException(message, "error");
            }
        } catch (error) {
            throw error;
        }
    }

    async update() {}

    async deleteById() {}

    async findMany(name) {
        try {
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${API_URL}/unity?name=${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const statusResponse = response.status;

            const { message, unities } = await response.json();

            switch (statusResponse) {
                case 200:
                    return {
                        message,
                        unities
                    }

                case 400:
                    throw new BadRequestException(message, "warning");

                case 401:
                    throw new UnauthorizedException(message, "warning");

                case 500:
                    throw new ServerSideException(message, "error");
            }
        } catch (error) {
            throw error;
        }
    }

    async findById() {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/unity/${this.#id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const statusResponse = response.status;

            const responseBody = await response.json();

            switch (statusResponse) {
                case 200:
                    return responseBody;

                case 400:
                    throw new BadRequestException(responseBody.message, "warning");

                case 401:
                    throw new UnauthorizedException(responseBody.message, "warning");

                case 404:
                    throw new NotFoundException(responseBody.message, "warning");

                case 500:
                    throw new ServerSideException(responseBody.message, "error");

                default:
                    throw new CustomException("Erro inesperado", "error");
            }

        } catch (error) {
            if (error.constructor === Error) {
                throw CustomException(`Erro inesperado: ${error.message}`, "error");
            }

            throw error;
        }
    }

    async getRequirements() {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/unity/${this.#id}/requirements`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const statusResponse = response.status;

            const responseBody = await response.json();

            switch (statusResponse) {
                case 200:
                    return responseBody;

                case 400:
                    throw new BadRequestException(responseBody.message, "warning");

                case 401:
                    throw new UnauthorizedException(responseBody.message, "warning");

                case 404:
                    throw new NotFoundException(responseBody.message, "warning");

                case 500:
                    throw new ServerSideException(responseBody.message, "error");

                default:
                    throw new CustomException("Erro inesperado", "error");
            }
        } catch (error) {
            if (error.constructor === Error) {
                throw CustomException(`Erro inesperado: ${error.message}`, "error");
            }

            throw error;
        }
    }

    async saveRequirements(requirements) {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/unity/${this.#id}/requirements`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requirements)
            });

            const statusResponse = response.status;

            const responseBody = await response.json();

            console.log(responseBody);

            switch (statusResponse) {
                case 200:
                    return responseBody;

                case 400:
                    throw new BadRequestException(responseBody.message, "warning");

                case 401:
                    throw new UnauthorizedException(responseBody.message, "warning");

                case 404:
                    throw new NotFoundException(responseBody.message, "warning");

                case 500:
                    throw new ServerSideException(responseBody.message, "error");

                default:
                    throw new CustomException("Erro inesperado", "error");
            }
        } catch (error) {
            if (error.constructor === Error) {
                throw CustomException(`Erro inesperado: ${error.message}`, "error");
            }

            throw error;
        }
    }
}