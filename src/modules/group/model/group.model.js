const mongoose = require("mongoose");

const Group = mongoose.model("Group", {
  from: {
    type: mongoose.Types.ObjectId,
  },
  message: String,
});

module.exports = Group;
