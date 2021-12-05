const User = require("../models/Users");

const insert = (data) => {
    const user = new User(data);
    return user.save();
};

const loginUser = (loginData) => {
    return User.findOne({ loginData });
};

const list = () => {
    return User.find({});
};


module.exports = {
    insert,
    list,
    loginUser,
}