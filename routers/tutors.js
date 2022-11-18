import express from "express";
const router = express.Router();
import myDB from "../db/myDB.js";

/** Yian
 * function that lets users search tutors
 */
router.post("/book/tutors", async (req, res) => {
  try {
    console.log("req.query", req.query);
    const page = req.query.page || 0;
    const keyword = req.query.query;
    const getTutors = await myDB.findTutors(keyword, page);
    res.status(200).json({ data: getTutors });
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "There was an error" });
  }
});

/** Yian
 * function that gets specific tutor
 */
router.get("/book/tutors/:tutorId", async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    const getTutor = await myDB.getTutor(tutorId);
    res.status(200).json({ data: getTutor });
    console.log("GOT TUTOR DATA")
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "There was an error" });
  }
});

router.post("/api/addClass/:user",async(req,res)=>{
  try{
    const user = req.params.user;
    const booking = req.body
    console.log("booking",req.body)
    await myDB.createBooking(user,booking)
    res.status(200).json({msg: "successfully created booking"})
  }catch(err){
    console.error(err);
    res.status(404).json({ msg: "There was an error" })
  }
})


export default router;
