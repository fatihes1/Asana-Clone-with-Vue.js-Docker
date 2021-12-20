const Task = require("../models/Tasks");

const insert = (data) => {
    // ... kayıt işlemleri yapılacak
    return new Task(data).save();
};

const list = (where) => {
    return Task.find(where || {}).populate({
        path: "user_id",
        select: "full_name email profile_image",
    }).populate({
        path: "project_id",
        select: "name",
    });
};

const modify = (data, id) => {
    return Task.findByIdAndUpdate(id, data, {
        new: true
    });
    // return Project.findById(id).then(project => {
    //     project.name = data?.name;
    //     return project.save();
    // });
};

const remove = (id) => {
    return Task.findByIdAndDelete(id)
};

const findOne = (where, expand) => {
    if(!expand) return Task.findOne(where);
    return Task.findOne(where).populate({
        path : "user_id",
        select : "full_name email profile_image"
    })
    .populate({
        path : "comments",
        populate : {
            path : "user_id",
            select : "full_name email profile_image",
        }
    })
    .populate({
        path : "sub_tasks",
        select : "title description isCompleted assigned_to due_date order sub_tasks statuses"
    });
};

module.exports = {
    insert,
    list,
    modify,
    remove,
    findOne,
};