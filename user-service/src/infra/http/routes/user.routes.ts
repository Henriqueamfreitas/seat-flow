import { Router } from "express";
import { CreateUserController } from "../controllers/user/create-user.controller";
import { FindUserByEmailController } from "../controllers/user/find-user-by-email.controller";
import { FindUserByIdController } from "../controllers/user/find-user-by-id.controller";
import { ListUsersController } from "../controllers/user/list-users.controller";
import { UpdateUserController } from "../controllers/user/update-user.controller";
import { UpdatePasswordController } from "../controllers/user/update-password.controller";
import { DeactivateUserController } from "../controllers/user/deactivate-user.controller";
import { ActivateUserController } from "../controllers/user/activate-user.controller";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
userRoutes.get("/", new ListUsersController().handle);

userRoutes.get("/:id", new FindUserByIdController().handle);
userRoutes.put("/:id", new UpdateUserController().handle);
userRoutes.delete("/:id", new DeactivateUserController().handle);

userRoutes.patch("/:id/password", new UpdatePasswordController().handle);

userRoutes.get("/email/:email", new FindUserByEmailController().handle);
userRoutes.patch("/:id/activate", new ActivateUserController().handle);

export default userRoutes;
