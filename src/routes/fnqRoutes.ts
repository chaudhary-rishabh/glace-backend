import express from "express";
import { getFnq, insertFnq } from "../controllers/fnqController";
const router = express.Router();

router.get("/getFnq", getFnq);
router.post("/insertFnq", insertFnq);

export default router;  