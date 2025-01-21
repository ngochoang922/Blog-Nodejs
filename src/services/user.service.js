const UserModel = require('../models/user.model')

class UserService {
    static findByEmail = async (email) => {
        const user = await UserModel.findOne({ email })
        return user
    }
}

module.exports = UserService