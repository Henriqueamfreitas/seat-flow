import { ConflictError } from "../../../shared/errors/ConflictError";

export class EmailAlreadyExistsError extends ConflictError {
  constructor() {
    super("Email already registered");
  }
}
