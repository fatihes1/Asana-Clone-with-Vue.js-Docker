const Section = require("../models/Sections");

const insert = (data) => {
    // ... kayıt işlemleri yapılacak
    return new Section(data).Section.save();
};

const list = (where) => {
    return Section.find(where || {}).populate({
        path: "user_id",
        select: "full_name email profile_image",
    });
};

const modify = (data, id) => {
    return Section.findByIdAndUpdate(id, data, {
        new: true
    });
    // return Project.findById(id).then(project => {
    //     project.name = data?.name;
    //     return project.save();
    // });
};

const remove = (id) => {
    return Section.findByIdAndDelete(id)
};

module.exports = {
    insert,
    list,
    modify,
    remove,
};