const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/",async(req, res)=>{
      const newPost = new Post(req.body);
   try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
   } catch (error) {
       res.status(500).json(error)
   }
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
    await post.updateOne({ $set: req.body});
  
    res.status(200).json("post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// like post
router.put("/:id/like", async(req, res)=>{
  const {id} = req.params;
    try{
        const post = await Post.findById(id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}})
            // let {likes, ...rest} = post._doc;
            res.status(200).json("Post has been liked");
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            // const {likes, ...rest} = post
            res.status(200).json("Post has been disliked");
        }
    }catch(error){
        res.status(500).json(error);
    }
})


//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a single post
router.get("/:id", async(req, res)=>{
  const {id} = req.params;
    try {
       const post= await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});
//get users all posts 
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
   const posts = await Post.find({userId:user._id });
   res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;