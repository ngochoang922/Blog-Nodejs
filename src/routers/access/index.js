const express = require('express')
const router = express.Router()
const AccessController = require('../../controllers/access.controller')
const AuthUtil = require('../../auth/auth.util')

router.post('/sign-up', AccessController.signUp)
router.post('/sign-in', AccessController.signIn)

router.use(AuthUtil.authentication)

router.post('/refresh-token', AccessController.refreshToken)
router.post('/sign-out', AccessController.signOut)

module.exports = router