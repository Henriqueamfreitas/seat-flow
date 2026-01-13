import { NotFoundError } from "../../../shared/errors/NotFoundError";

export class EmailNotFoundError extends NotFoundError {
  constructor() {
    super("Email not found");
  }
}
