const Project = require("../models/Projects");

const insert = (data) => {
    // ... kayıt işlemleri yapılacak
    const project = new Project(data);
    return project.save();
};

const list = () => {
    return Project.find({});
};

module.exports = {
    insert,
    list
}