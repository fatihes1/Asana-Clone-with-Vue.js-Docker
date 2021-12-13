const User = require("../models/Users");

const insert = (data) => {
    const user = new User(data);
    return user.save();
};

const loginUser = (loginData) => {
    return User.findOne(loginData);
};

const list = () => {
    return User.find({});
};

const modify = (where, data) => {
    //! Gelen data üzerinde bilgileri filtrelemek için kullanılır.
    //! Joi şu an bunu bizim için yapıyor :')
    const newData = Object.keys(data).reduce((obj, key) => {
        if (key !== "password") obj[key] = data[key];
        return obj;
    }, {});

    return User.findOneAndUpdate(where, newData, { new: true });
};

const remove = (id) => {
    return User.findByIdAndDelete(id)
};


module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove,
};