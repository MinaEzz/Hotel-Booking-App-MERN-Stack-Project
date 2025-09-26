import express from "express";
const router = express.Router();

router.route("/me").get((req, res) => {
  res.send("hello me route");
});

export default router;
