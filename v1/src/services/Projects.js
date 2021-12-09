const Project = require("../models/Projects");

const insert = (data) => {
    // ... kayıt işlemleri yapılacak
    const project = new Project(data);
    return project.save();
};

const list = () => {
    return Project.find({}).populate({
        path : "user_id",
        select : "full_name email",
    });
};

const modify = (data, id) => {
    return Project.findByIdAndUpdate(id, data, { new : true });
    // return Project.findById(id).then(project => {
    //     project.name = data?.name;
    //     return project.save();
    // });
};
module.exports = {
    insert,
    list,
    modify
};