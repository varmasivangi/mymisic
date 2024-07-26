"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userDetailsController_1 = require("../controllers/userDetailsController");
const router = express_1.default.Router();
router.post('/adduser', userDetailsController_1.addUserDetals);
router.post('/verify', userDetailsController_1.verifyUser);
router.post('/login', userDetailsController_1.userLogin);
module.exports = router;
