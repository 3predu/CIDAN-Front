export default class NotFoundException extends Error {
    constructor(message, severityWarning) {
        super(message);
        this.name = this.constructor.name;
        this.severityWarning = severityWarning;
    }
}