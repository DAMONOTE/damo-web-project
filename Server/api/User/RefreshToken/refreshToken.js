import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'
import jwt from 'jsonwebtoken'
import serverConfig from '../../../utils/serverConfig'
export default {
	Query: {
        signInToken: async (root, {Token}) => {
            let userId = verifyToken(Token)
            console.log(serverConfig.serverSecretKey)
            // Re sign
            let accessToken=jwt.sign({userId},serverConfig.serverSecretKey,{expiresIn: '2h'})
            if (!accessToken){
                throw new Error("[DEBUG] Generation failure.")
                return "[DEBUG] ERROR"
            }
            return {AccessToken: accessToken, AccountName: userId}
        }
    }
}