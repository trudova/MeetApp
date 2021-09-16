const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
//addd
router.post("/", async(req, res)=>{
    const newMassage = new Message(req.body);
    try {
        const massage = await newMassage.save();
        res.status(200).json(massage);
    } catch (error) {
         res.status(500).json(error);
    }
})
//gett
router.get("/:conversationId", async(req, res)=>{
    const {conversationId} = req.params;
    try {
        const massages = await Message.find({
            conversationId
        });
        res.status(200).json(massages)

    } catch (error) {
       res.status(500).json(error);
    }
})
module.exports = router;