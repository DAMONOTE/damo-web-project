/*
*
*   모든 그룹 리스팅
*
*/

import group from '../../../models/Group'
import verifyToken from '../../../utils/verifyToken'

export default {
  Query: {
    getAllGroups: async (root,{Token}) => {
    // 토큰 확인
    let tokenUid = verifyToken(Token)
    return await group.find();
    }
  }
};