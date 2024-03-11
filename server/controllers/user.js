const { User } = require("../models/user");

const newUser = async (req, res) => {
  // const { name, username, password } = req.body;
  const avatar = {
    public_id: "sample",
    url: "asdsdas",
  };

  const entry = await User.create({
    name: "Amish",
    password: "amish0301",
    username: "amish",
    avatar: avatar,
  });

  return res.status(200).json({message: "User Created Successfully"});
};

module.exports = {
  newUser,
};
