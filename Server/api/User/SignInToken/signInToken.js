import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'
import jwt from 'jsonwebtoken'
var serverSecretKey = "test"

export default {
	Query: {
        signInToken: async (root, {Token}) => {
        console.log(Token)
        // 토큰 확인
        let _id = verifyToken(Token)
        //console.log(tokenUid)
        // 토큰 재서명
        let signToken=jwt.sign({_id},serverSecretKey,{expiresIn: '2d'})
        if (!signToken){
            throw new Error("[MSG] Token incorrect.")
        }
        //console.log(signToken)
        return {Token: signToken}
        }
    }
}
