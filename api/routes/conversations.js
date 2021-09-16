const router = require("express").Router();
const Conversation = require("../models/Conversation");

//create new conversation
router.post("/", async(req, res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error);
    }
})
// get conversations for particular user

router.get("/:userId", async(req, res)=>{
    const {userId} = req.params;
    try {
        const conversation = await Conversation.find({
            members:{$in:[userId]}
        });
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error);

    }

});
// get singl conversation
router.get("/find/:firstUserId/:secondUserId", async(req, res)=>{
    const {firstUserId,secondUserId } = req.params
    try {
        const conversation = await Conversation.findOne({
            members:{$all:[firstUserId,secondUserId ]}
        });
        res.status(200).json(conversation)
        
    } catch (error) {
        res.status.json(error)
    }
})

module.exports = router;