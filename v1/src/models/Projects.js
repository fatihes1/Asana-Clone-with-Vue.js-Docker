const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Projets");

const ProjectSchema = new Mongoose.Schema({
    name : String,
    user_id: {
        type: Mongoose.Types.ObjectId,
        ref : "user"
    },
}, { timestamps: true, versionKey:false});

// ProjectSchema.pre("save", (next, object) => {
//     console.log("Öncesi", object);
//     next();
// });
ProjectSchema.post("save", (doc) => {
    // console.log("Sonrası", object);
    logger.log({
        level : "info",
        message : doc,
    });
    // ... Kayıt edilmiştir ... Loglama
});

module.exports = Mongoose.model("project", ProjectSchema);