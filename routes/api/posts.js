const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()});
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    });

    const post = await newPost.save();

    res.json(post);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // get all posts and sort by the newest
    const posts = await Post.find().sort({date: -1});
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({errors: [{msg: 'Post not found'}]});
    }

    res.json(post);

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({errors: [{msg: 'Post not found'}]});
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts
// @desc    DELETE a post by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({errors: [{msg: 'Post not found'}]});
    }

    //Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({errors: [{msg: 'User not authorized'}]});
    }

    await post.remove();

    res.json({msg: 'Post removed'});

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({errors: [{msg: 'Post not found'}]});
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post by ID
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by current user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({errors: [{msg: 'Post already liked'}]});
    }

    post.likes.unshift({user: req.user.id});

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post by ID
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by current user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({errors: [{msg: 'Post has not yet been liked'}]});
    }

    //Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:post_id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()});
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

  //  Pull out comment
    const comment = post.comments.find(
      comment => comment.id.toString() === req.params.comment_id
    );

  //  Make sure comment exists
    if(!comment){
      return res.status(404).json({errors: [{msg: 'Comment does not exists'}]});
    }

  //  Check if the comment relates to user(owner)
    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({errors: [{msg: 'User not authorized'}]});
    }

    //Get remove index
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;