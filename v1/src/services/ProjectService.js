const BaseService = require("./BaseService");
const BaseModel = require("../models/Projects");
class ProjectService extends BaseService {
    constructor() {
        super(BaseModel);
    }
    // @Override to list method
    list(where) {
        return BaseModel.find(where || {}).populate({
            path : "user_id",
            select : "full_name email profil_image",
        });
    }
}

module.exports = new ProjectService();