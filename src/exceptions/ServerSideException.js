export default class ServerSideException extends Error {
    constructor(message, severityAlert) {
        super(message);
        this.name = this.constructor.name;
        this.severityAlert = severityAlert;
    }
}