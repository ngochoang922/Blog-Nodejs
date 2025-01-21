const { SuccessResponse } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController{
    static signUp = async (req, res, next) => {
        new SuccessResponse({
            message: "Sign Up Success",
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }

    static signIn = async (req, res, next) => {
        new SuccessResponse({
            message: "Sign In Success",
            metadata: await AccessService.signIn(req.body)
        }).send(res)
    }

    static refreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: "Refresh Token Success",
            metadata: await AccessService.refreshToken({
                refreshToken: req.refreshToken,
                userId: req.user
            })
        }).send(res)
    }

    static signOut = async (req, res, next) => {
        new SuccessResponse({
            message: "Sign Out Success",
            metadata: await AccessService.signOut(req.user)
        }).send(res)
    }
}

module.exports = AccessController