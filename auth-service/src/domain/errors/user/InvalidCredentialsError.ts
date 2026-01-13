import { NotFoundError } from "../../../shared/errors/NotFoundError";

export class InvalidCredentialsError extends NotFoundError {
  constructor() {
    super("Invalid credentials");
  }
}
