import { Router } from "express";
import multer from "multer";
import {
  addMessage,
  getMessages,
  addImageMessage,
  addAudioMessage,
} from "../controllers/MessageController.js";

const router = Router();

const uploadAudio = multer({ dest: "uploads/recordings" });
const uploadImage = multer({ dest: "uploads/images" });

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", uploadAudio.single("audio"), addAudioMessage);

export default router;
