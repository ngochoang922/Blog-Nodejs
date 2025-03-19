const UserService = require("../services/user.service");
const { SuccessResponse } = require("../core/success.response")


class UserController {
    static async getUserByEmail(req, res) {
        new SuccessResponse({
            message: "Get User By Email Success",
            metadata: await UserService(req.params.email)
        }).send(res)
    }

    static async getUserById(req, res) {
        new SuccessResponse({
            message: "Get User By Id Success",
            metadata: await UserService.findById(req.query.id)
        }).send(res)
    }

}

module.exports = UserController


