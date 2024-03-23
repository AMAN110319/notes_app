const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token)  return res.status(400).json({msg: "Invalid authentication"});

        jwt.verify(token, "aman", (err, user) => {
            if (err) return res.status(400).json({msg: "Authorization not valid"});
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"});
    }
};

module.exports = auth;
