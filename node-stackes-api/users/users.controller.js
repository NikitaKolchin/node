const express = require('express');
const router = express.Router();
const User = require("./User");
const findUser = require("./findUser");


module.exports =  router;

//authentication
router.post('/authenticate', async (req, res, next) => {
    let user = await findUser.findUser(req.body);
    user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
});

//get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
      } catch (err) {
        res.status(500).json({message: err.message})
      }
});

//add new user
router.post('/', async (req, res, next) => {
    const user = new User({
        username: req.body.username, 
        password: req.body.password, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName
      });
      try {
        const newUser = await user.save();
        res.status(201).json({ newUser });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

//middleware
async function getUser (req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cannot find User" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

//get one user by id 
router.get('/:id',getUser, (req, res) => {
    res.json(res.user);
}); 

//delete One user
router.delete("/:id", getUser, async (req, res) => {
    try {
      const deletedUserName = res.user.username; 
      await res.user.deleteOne();
      res.json({ message: `User ${deletedUserName} has been deleted` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//update one user
router.put("/:id", getUser, async (req, res) => {
    try {
        const updatedUser = {userName: req.body.username, 
                        password: req.body.password,
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName };  
        const userArterUpdate = await User.findOneAndUpdate({_id: res.user.id}, updatedUser, {new: true});
        res.json(userArterUpdate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

