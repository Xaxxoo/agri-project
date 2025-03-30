const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userAuth.role)) {
            

        throw new Error("Access Denied");
        }
        next();
     }
}

module.exports = isAuthorized;