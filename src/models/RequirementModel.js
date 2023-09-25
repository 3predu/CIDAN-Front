import { API_URL } from "../config";
import EmptyFieldException from "../exceptions/EmptyFieldException";
import BadRequestException from "../exceptions/BadRequestException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import CustomException from "../exceptions/CustomException";
import ServerSideException from "../exceptions/BadRequestException";

export default class RequirementModel {
    #id;
    #name;
    #pointAmount;
    #description;
    #createdAt;
    #updatedAt;

    constructor({ id, name, pointAmount, description, createdAt, updatedAt }) {
        this.#id = id;
        this.#name = name;
        this.#pointAmount = pointAmount;
        this.#description = description;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get pointAmount() {
        return this.#pointAmount;
    }

    get description() {
        return this.#description;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    async create() {
        try {
            if (!this.#name) {
                throw new EmptyFieldException('Nome é obrigatório', 'warning');
            }

            const token = localStorage.getItem('token');

            const requestBody = {
                name: this.#name,
                pointAmount: this.#pointAmount,
                description: this.#description
            }

            const response = await fetch(`${API_URL}/requirements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const reponseStatus = response.status;
            const responseBody = await response.json();

            switch (reponseStatus) {
                case 200:
                    return responseBody;

                case 400:
                    throw new BadRequestException(responseBody.message, 'warning');

                case 401:
                    throw new UnauthorizedException(responseBody.message, 'warning');

                case 500:
                    throw new ServerSideException(responseBody.message, 'error');

                default:
                    throw new CustomException(`Erro inesperado: ${responseBody.message}`, 'warning');
            }
        } catch (error) {
            if (error.constructor === Error) {
                throw new CustomException(`Erro inesperado: ${error.message}`, 'warning');
            }

            throw error;
        }
    }

    async findMany() {
        try {
            const endpoint = `${API_URL}/requirements?name=${this.#name}&pointAmount=${this.#pointAmount}&description=${this.#description}`;

            const token = localStorage.getItem('token');

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const reponseStatus = response.status;

            const responseBody = await response.json();

            switch (reponseStatus) {
                case 200:
                    return responseBody;

                case 400:
                    throw new BadRequestException(responseBody.message, 'warning');

                case 401:
                    throw new UnauthorizedException(responseBody.message, 'warning');

                case 500:
                    throw new ServerSideException(responseBody.message, 'error');

                default:
                    throw new CustomException(`Erro inesperado: ${responseBody.message}`, 'warning');
            }
        } catch (error) {
            if (error.constructor === Error) {
                throw new CustomException(`Erro inesperado: ${error.message}`, 'warning');
            }

            throw error;
        }
    }
}