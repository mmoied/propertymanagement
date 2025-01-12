const { sign, verify } = require("jsonwebtoken");
const token_secret = process.env.ACCESS_TOKEN_SECRET
const createTokens = (user) => {
    const accessToken = sign(
        { email: user.email, id: user.id },
        token_secret
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });

    try {
        const validToken = verify(accessToken, token_secret);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = { createTokens, validateToken };