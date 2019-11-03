const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");

const {
  getUsers,
  getUser,
  createUser,
  deleteUser
} = require("../controllers/users");

//TODO: Protecting route
router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser);

module.exports = router;
