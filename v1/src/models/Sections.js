const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Sections");

const SectionSchema = new Mongoose.Schema({
    name : String,
    user_id: {
        type: Mongoose.Types.ObjectId,
        ref : "user"
    },
    project_id : {
        type : Mongoose.Types.ObjectId,
        ref : "project"
    },
}, { timestamps: true, versionKey:false});

// ProjectSchema.pre("save", (next, object) => {
//     console.log("Öncesi", object);
//     next();
// });
SectionSchema.post("save", (doc) => {
    // console.log("Sonrası", object);
    logger.log({
        level : "info",
        message : doc,
    });
    // ... Kayıt edilmiştir ... Loglama
});

module.exports = Mongoose.model("section", SectionSchema);