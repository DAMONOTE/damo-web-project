/*
*
*   그룹 정보 쿼리
*
*/
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Query: {
        // 인자: Token, 그룹ID
        getGroupInfo: async (root, { Token, _id}) => {
        // 토큰 확인
        let tokenUid = verifyToken(Token)
        
        return await group.findById({_id})
        }
    }

}