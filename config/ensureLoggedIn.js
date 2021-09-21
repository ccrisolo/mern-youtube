module.exports = function (req, res, next) {
    //Status code of 401 is Unauthroized
    if (!req.user) return res.status(401).json("Unauthorized");
    //A okay?
    next();
};
