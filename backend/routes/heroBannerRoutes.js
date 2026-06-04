import express from "express";
import {
  getHeroBanners,
  getAllHeroBanners,
  addHeroBanner,
  deleteHeroBanner,
} from "../controllers/heroBannerController.js";

const router = express.Router();

router.get("/", getHeroBanners);
router.get("/all", getAllHeroBanners);
router.post("/", addHeroBanner);
router.delete("/:id", deleteHeroBanner);

export default router;
