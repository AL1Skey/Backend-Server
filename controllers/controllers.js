const {User} = require('../models/index.js');

class Controllers{
    static async register(req,res){
        try {
            console.log(req.body);
            const user = await User.create(req.body)
            res.send({
                "message":{
                    "username":user.username,
                    "password":user.password,
                    "email":user.email
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}

module.exports = Controllers;