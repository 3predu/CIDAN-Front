import CustomException from "../../exceptions/CustomException";
import BadRequestException from "../../exceptions/BadRequestException";
import UnauthorizedException from "../../exceptions/UnauthorizedException";
import NotFoundException from "../../exceptions/NotFoundException";
import ServerSideException from "../../exceptions/BadRequestException";

import { API_URL } from "../../config";

export async function getTableData() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/dashboard/table`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const responseStatus = response.status;

        const responseBody = await response.json();

        switch (responseStatus) {
            case 200:
                return responseBody;

            case 400:
                throw new BadRequestException(responseBody.message, "error")

            case 401:
                throw new UnauthorizedException(responseBody.message, "error");

            case 404:
                throw new NotFoundException(responseBody.message, "error");

            case 500:
                throw new ServerSideException(responseBody.message, "error");

            default:
                throw new CustomException(responseBody.message, "error");
        }
    } catch (error) {
        if (error.construcotr === Error) {
            throw new CustomException(`Erro inesperado ao buscar dados da tabela: ${error.message}`, "error");
        }

        throw error;
    }
}