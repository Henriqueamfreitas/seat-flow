import { Router } from "express";
import { CreateUserController } from "../controllers/user/create-user.controller";
import { FindUserByEmailController } from "../controllers/user/find-user-by-email.controller";
import { FindUserByIdController } from "../controllers/user/find-user-by-id.controller";
import { ListUsersController } from "../controllers/user/list-users.controller";
import { UpdateUserController } from "../controllers/user/update-user.controller";
import { UpdatePasswordController } from "../controllers/user/update-password.controller";
import { DeactivateUserController } from "../controllers/user/deactivate-user.controller";
import { ActivateUserController } from "../controllers/user/activate-user.controller";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureSelfOrAdmin } from "../middlewares/ensureSelfOrAdmin";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
userRoutes.get("/", [ensureAuthenticated, ensureAdmin], new ListUsersController().handle);

userRoutes.get("/:id", [ensureAuthenticated, ensureSelfOrAdmin], new FindUserByIdController().handle);
userRoutes.put("/:id", [ensureAuthenticated, ensureSelfOrAdmin], new UpdateUserController().handle);
userRoutes.delete("/:id", [ensureAuthenticated, ensureSelfOrAdmin], new DeactivateUserController().handle);

userRoutes.patch("/:id/password", [ensureAuthenticated, ensureSelfOrAdmin], new UpdatePasswordController().handle);

userRoutes.get("/email/:email", [ensureAuthenticated, ensureAdmin], new FindUserByEmailController().handle);
userRoutes.patch("/:id/activate", [ensureAuthenticated, ensureAdmin], new ActivateUserController().handle);

export default userRoutes;
