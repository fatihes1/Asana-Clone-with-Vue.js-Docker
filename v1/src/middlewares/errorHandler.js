module.exports = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message || "Internal Server Error !",
        },
    });
};