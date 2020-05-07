const express = require('express');
const router = express.Router();
const Match = require("./Match");


module.exports =  router;



//get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await Match.find()
        res.json(users)
      } catch (err) {
        res.status(500).json({message: err.message})
      }
});

//add new match
router.post('/', async (req, res, next) => {
  if (req.user.isAdmin){
    const match = new Match({
      matchNo: req.body.matchNo, 
      home: req.body.home, 
      away: req.body.away,
      homeName: req.body.homeName, 
      awayName: req.body.awayName, 
      coefficient: req.body.coefficient, 
      enable: req.body.enable,
      visability: req.body.visability
    });
    try {
      // const newUser = await user.save();
      // res.status(201).json({ newUser });

      res.status(201).json(await match.save());
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  else {
    res.status(403).json({ message: "Need admin" });
  }    

});

//middleware
async function getUser (req, res, next) {
    let user;
    try {
      user = await Match.findById(req.params.id);
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
  if (req.user.isAdmin){
    try {
      const deletedUserName = res.user.username; 
      await res.user.deleteOne();
      res.json({ message: `User ${deletedUserName} has been deleted` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    res.status(403).json({ message: "Need admin" });
  }  
});

//delete all users
router.delete("/", async (req, res) => {
  if (req.user.isAdmin){
    try {
      await Match.deleteMany();
      res.json({ message: "All users has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    res.status(403).json({ message: "Administrator rights required" });
  } 
});

//update one user
router.put("/:id", getUser, async (req, res) => {
  if (req.user.isAdmin){
    try {
        const updatedUser = {username: req.body.username, 
                        password: req.body.password,
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName,
                        email: req.body.email,
                        isAdmin: req.body.isAdmin
                       };  
        const userArterUpdate = await Match.findOneAndUpdate({_id: res.user.id}, updatedUser, {new: true});
        res.json(userArterUpdate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  }
  else {
    res.status(403).json({ message: "Administrator rights required" });
  }  
});


//update and set stakes
router.put("/:id/stakes", getUser, async (req, res) => {
    try {
        const updatedUser = {stakes: req.body.stakes};  
        const userArterUpdate = await Match.findOneAndUpdate({_id: res.user.id}, updatedUser, {new: true});
        res.json(userArterUpdate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//get one user by id 
router.get('/:id/stakes',getUser, (req, res) => {
  res.json(res.user.stakes);
}); 

