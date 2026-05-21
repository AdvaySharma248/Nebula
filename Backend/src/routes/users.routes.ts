import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { followParamsSchema, updateProfileSchema } from "../validators/user.validator";
import { usernameParamSchema } from "../validators/common.validator";

const router = Router();

router.patch("/me", requireAuth, validate({ body: updateProfileSchema }), userController.updateMe);
router.delete("/me", requireAuth, userController.deleteMe);
router.get("/me/saved-posts", requireAuth, userController.savedPosts);

router.get("/:username", validate({ params: usernameParamSchema }), userController.profile);
router.get("/:username/posts", validate({ params: usernameParamSchema }), userController.posts);
router.get("/:username/comments", validate({ params: usernameParamSchema }), userController.comments);

router.post("/:userId/follow", requireAuth, validate({ params: followParamsSchema }), userController.follow);
router.delete("/:userId/follow", requireAuth, validate({ params: followParamsSchema }), userController.unfollow);
router.post("/:userId/block", requireAuth, validate({ params: followParamsSchema }), userController.block);
router.delete("/:userId/block", requireAuth, validate({ params: followParamsSchema }), userController.unblock);

export default router;
