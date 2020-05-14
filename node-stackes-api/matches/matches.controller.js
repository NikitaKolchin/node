const express = require("express");
const router = express.Router();
const Match = require("./Match");

module.exports = router;

//get all matches
router.get("/", async (req, res, next) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add new match
router.post("/", async (req, res, next) => {
  if (req.user.isAdmin) {
    const match = new Match({
      matchNo: req.body.matchNo,
      home: req.body.home,
      away: req.body.away,
      homeName: req.body.homeName,
      awayName: req.body.awayName,
      coefficient: req.body.coefficient,
      enable: req.body.enable,
      visability: req.body.visability,
    });
    try {
      res.status(201).json(await match.save());
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Need admin" });
  }
});

//middleware
async function getMatch(req, res, next) {
  let match;
  try {
    match = await Match.findById(req.params.id);
    if (match == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.match = match;
  next();
}

//get one match by id
router.get("/:id", getMatch, (req, res) => {
  res.json(res.match);
});

//delete One user
router.delete("/:id", getMatch, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedMatchNo = res.match.matchNo;
      await res.match.deleteOne();
      res.json({ message: `Match ${deletedMatchNo} has been deleted` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Administrator rights required" });
  }
});

//delete all users
router.delete("/", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Match.deleteMany();
      res.json({ message: "All matches has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Administrator rights required" });
  }
});

//update one match
router.put("/:id", getMatch, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMatch = {
        matchNo: req.body.matchNo,
        home: req.body.home,
        away: req.body.away,
        homeName: req.body.homeName,
        awayName: req.body.awayName,
        coefficient: req.body.coefficient,
        enable: req.body.enable,
        visability: req.body.visability,
      };
      const matchArterUpdate = await Match.findOneAndUpdate(
        { _id: res.match.id },
        updatedMatch,
        { new: true }
      );
      res.json(matchArterUpdate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Administrator rights required" });
  }
});
