import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Query: {
        getUserInfo: async (root, {Token}) => {
        // 토큰 확인
        let tokenUid = verifyToken(Token)
        // 사용자 정보 반환
        return await user.findById(tokenUid)
        }
    }
}
