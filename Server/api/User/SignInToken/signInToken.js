import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'
import jwt from 'jsonwebtoken'
var serverSecretKey = "test"

export default {
	Query: {
        signInToken: async (root, {Token}) => {
        console.log(Token)
        // 토큰 확인
        let userId = verifyToken(Token)
        console.log(userId.AccountName)
        return {AccessToken: Token, AccountName: userId.AccountName}
        }
    }
}