const express = require("express");
const router = express.Router();
const User = require("./User");
const findUser = require("./findUser");

module.exports = router;

//authentication
router.post("/authenticate", async (req, res, next) => {
  let user = await findUser.findUser(req.body);
  user
    ? res.json(user)
    : res.status(400).json({ message: "Username or password is incorrect" });
});

//get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add new user
router.post("/", async (req, res, next) => {
  if (req.user.isAdmin) {
    const stakes = []
    for (let i = 1; i < 52; i++) { //явное количество матчей на ЧМ будет 64(65)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      stakes.push({ matchNo: i, home: null, away: null, money: null })
    }
    //Как альтернатива, по тестам рпботающая медленнее, но зато в одну строку))))
    // const stakes = ","
    //   .repeat(52)
    //   .split(",")
    //   .map((_, index) => ({ matchNo: index + 1, home: null, away: null, money: null }));
    const user = new User({
      // username: req.body.username,
      // password: req.body.password,
      // firstName: req.body.firstName,
      // lastName: req.body.lastName,
      // email: req.body.email,
      // isAdmin: req.body.isAdmin,
      stakes: stakes,
      ...req.body,
    });

    try {
      // const newUser = await user.save();
      // res.status(201).json({ newUser });

      res.status(201).json(await user.save());
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Need admin" });
  }
});

//middleware
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};
//имеет смысл сделать:
//router.use(getUser), чтобы req принципиально заполнялся и тогда ссылку на getUser можно везде убрать и уже и не вспоминать.
// router.get('/:id', (req, res) => {
//   res.json(res.user)
// })
//get one user by id
//большой вопрос в использовании асинхронной функции в get, нашел для решения только express-async-router. Здесь должно прокатить, так как возврат из функции не обрабатывается.
//Но это место возможный источник ошибок заполнения res.user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//delete One user
router.delete("/:id", getUser, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedUserName = res.user.username;
      await res.user.deleteOne();
      res.json({ message: `User ${deletedUserName} has been deleted` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Need admin" });
  }
});

//delete all users
router.delete("/", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await User.deleteMany();
      res.json({ message: "All users has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Administrator rights required" });
  }
});

//update one user
router.put("/:id", getUser, async (req, res) => {
  if (req.user.isAdmin) {
    // let stakes = [];  //создаём массив матчей при апдейте
    // for (var i = 1; i < 52; i++) {
    //   stakes.push({"matchNo": i, "home": null, "away": null});
    //  }
    try {
      const updatedUser = {
        // username: req.body.username,
        // password: req.body.password,
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // email: req.body.email,
        // isAdmin: req.body.isAdmin,
        ...req.body,
        //                        stakes: stakes
      };
      const userArterUpdate = await User.findOneAndUpdate(
        { _id: res.user.id },
        updatedUser,
        { new: true }
      );
      res.json(userArterUpdate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Administrator rights required" });
  }
});

//update stake by user and matchNo
router.put("/:id/stakes/:matchNo", getUser, async (req, res) => {
  try {
    //юзер должен ставить за себя - сделать проверку ----------------------------------------------------------------------------------------------------------------
    const updatedStake = {
      $set: {
        "stakes.$.home": req.body.home,
        "stakes.$.away": req.body.away,
        // "stakes.$.money": req.body.money
      },
    };
    const userArterUpdate = await User.findOneAndUpdate(
      { _id: res.user.id, "stakes.matchNo": req.params.matchNo },
      updatedStake,
      { upsert: true, new: true }
    );
    res.json(userArterUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update money by user and matchNo
router.put("/:id/money/:matchNo", getUser, async (req, res) => {
  try {
    //юзер должен ставить за себя - сделать проверку ----------------------------------------------------------------------------------------------------------------
    const updatedMoney = {
      $set: {
        // "stakes.$.home": req.body.home,
        // "stakes.$.away": req.body.away,
        "stakes.$.money": req.body.money
      },
    };
    const userArterUpdate = await User.findOneAndUpdate(
      { _id: res.user.id, "stakes.matchNo": req.params.matchNo },
      updatedMoney,
      { upsert: true, new: true }
    );
    res.json(userArterUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get one user by id
router.get("/:id/stakes", getUser, (req, res) => {
  res.json(res.user.stakes);
});

// const express = require("express");
// const router = express.Router();
// const User = require("./User");
// const findUser = require("./findUser");

// module.exports = router;

// //authentication
// router.post("/authenticate", async (req, res, next) => {
//   let user = await findUser.findUser(req.body);
//   user
//     ? res.json(user)
//     : res.status(400).json({ message: "Username or password is incorrect" });
// });

// //get all users
// router.get("/", async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //add new user
// router.post("/", async (req, res, next) => {
//   if (req.user.isAdmin) {
//     let stakes = [];
//     for (var i = 1; i < 52; i++) {
//       stakes.push({ matchNo: i, home: null, away: null });
//     }
//     const user = new User({
//       username: req.body.username,
//       password: req.body.password,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       isAdmin: req.body.isAdmin,
//       stakes: stakes,
//     });

//     try {
//       // const newUser = await user.save();
//       // res.status(201).json({ newUser });

//       res.status(201).json(await user.save());
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   } else {
//     res.status(403).json({ message: "Need admin" });
//   }
// });

// //middleware
// async function getUser(req, res, next) {
//   let user;
//   try {
//     user = await User.findById(req.params.id);
//     if (user == null) {
//       return res.status(404).json({ message: "Cannot find User" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.user = user;
//   next();
// }

// //get one user by id
// router.get("/:id", getUser, (req, res) => {
//   res.json(res.user);
// });

// //delete One user
// router.delete("/:id", getUser, async (req, res) => {
//   if (req.user.isAdmin) {
//     try {
//       const deletedUserName = res.user.username;
//       await res.user.deleteOne();
//       res.json({ message: `User ${deletedUserName} has been deleted` });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   } else {
//     res.status(403).json({ message: "Need admin" });
//   }
// });

// //delete all users
// router.delete("/", async (req, res) => {
//   if (req.user.isAdmin) {
//     try {
//       await User.deleteMany();
//       res.json({ message: "All users has been deleted" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   } else {
//     res.status(403).json({ message: "Administrator rights required" });
//   }
// });

// //update one user
// router.put("/:id", getUser, async (req, res) => {
//   if (req.user.isAdmin) {
//     // let stakes = [];  //создаём массив матчей при апдейте
//     // for (var i = 1; i < 52; i++) {
//     //   stakes.push({"matchNo": i, "home": null, "away": null});
//     //  }
//     try {
//       const updatedUser = {
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         isAdmin: req.body.isAdmin,
//         //                        stakes: stakes
//       };
//       const userArterUpdate = await User.findOneAndUpdate(
//         { _id: res.user.id },
//         updatedUser,
//         { new: true }
//       );
//       res.json(userArterUpdate);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   } else {
//     res.status(403).json({ message: "Administrator rights required" });
//   }
// });

// //update stake by user and matchNo
// router.put("/:id/stakes/:matchNo", getUser, async (req, res) => {
//   try {
//     //юзер должен ставить за себя - сделать проверку ----------------------------------------------------------------------------------------------------------------
//     const updatedStake = {
//       $set: {
//         "stakes.$.home": req.body.home,
//         "stakes.$.away": req.body.away,
//       },
//     };
//     const userArterUpdate = await User.findOneAndUpdate(
//       { _id: res.user.id, "stakes.matchNo": req.params.matchNo },
//       updatedStake,
//       { upsert: true, new: true }
//     );
//     res.json(userArterUpdate);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// //get one user by id
// router.get("/:id/stakes", getUser, (req, res) => {
//   res.json(res.user.stakes);
// });
