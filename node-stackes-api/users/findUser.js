const User = require("./User");
exports.findUser = async function ({ username, password }) {
  return await User.findOne(
    { username: username, password: password },
    function (err, user) {
      if (err) return console.log(err);
      return user;
    }
  );
};
