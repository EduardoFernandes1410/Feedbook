const jwt = require("jsonwebtoken");

class AuthController{
    constructor(){
        this.expiration = process.env.TOKEN_EXPIRE;
        this.secretKey = process.env.SECRET;
    }

    // Returns a token for a given user (instance of 'User' class)
    async getToken(user){
        const token = await jwt.sign({id: user.getId(), name: user.getName()}, this.secretKey, {expiresIn: this.expiration});
        return token;
    }

    // Validates a given token. Returns true if the token is valid and false otherwise
    async validateToken(token){
        try{
            const payload = await jwt.verify(token, this.secretKey);
        }catch{
            return false;
        }
        return true;
    }
};

module.exports = AuthController;