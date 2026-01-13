import { NotFoundError } from "../../../shared/errors/NotFoundError";

export class IdNotFoundError extends NotFoundError {
  constructor() {
    super("Id not found");
  }
}
