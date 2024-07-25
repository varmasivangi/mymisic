import express from "express"
import { addUserDetals,verifyUser,userLogin} from "../controllers/userDetailsController"

const router = express.Router()



router.post('/adduser',addUserDetals)
router.post('/verify',verifyUser)
router.post('/login',userLogin)


export = router