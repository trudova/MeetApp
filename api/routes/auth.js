const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//ROUTERS


router.post("/register", async (req, res)=>{
    const {username, email} = req.body;
    try {
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        ///reristering new user
        const newUser = new User({
        username,
        email,
        password:hashedPassword
    });
        const user = await newUser.save();
        //returning user without password
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(400).json("wrong email or password");
        const validePassword = await bcrypt.compare(req.body.password, user.password)
        !validePassword && res.status(400).json("wrong email or password");
        
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;