import { API_URL } from "../config";
import EmptyFieldException from "../exceptions/EmptyFieldException";
import BadRequestException from "../exceptions/BadRequestException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import CustomException from "../exceptions/CustomException";

export default class RequirementModel {
    #id;
    #name;
    #pointAmount;
    #description;

    constructor({ id, name, pointAmount, description }) {
        this.#id = id;
        this.#name = name;
        this.#pointAmount = pointAmount;
        this.#description = description;
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

            console.log(requestBody);

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