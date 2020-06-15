import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'
import jwt from 'jsonwebtoken'
var serverSecretKey = "test"

export default {
	Query: {
        signInToken: async (root, {Token}) => {
            let userId = verifyToken(Token)
            // Re sign
            let accessToken=jwt.sign({userId},serverSecretKey,{expiresIn: '2h'})
            if (!accessToken){
                throw new Error("[DEBUG] Generation failure.")
                return "[DEBUG] ERROR"
            }
            return {AccessToken: accessToken, AccountName: userId}
        }
    }
}