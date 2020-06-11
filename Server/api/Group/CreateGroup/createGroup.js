/*
*
*   그룹 생성
*
*/

import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Mutation: {
		createGroup: async (root, { GroupName, Token }) => {
    	// 토큰 확인
		let tokenUid = verifyToken(Token)

		// 기존 그룹이 있는지 확인
		let checkGroupName = await group.findOne({GroupName})
		//console.log(checkGroupName,typeof(checkGroupName))
		if(checkGroupName){
			throw new Error("[MSG] Group Name is duplicated.")
		}
		// 그룹장 정보 찾기
		const masterUser = await user.findById(tokenUid)
		// 그룹 생성
		const createdGroup = group.create({GroupMasterID: tokenUid, Members: [tokenUid] , GroupName})

		// 그룹장의 Account 정보에 gid 추가
		await user.updateOne({_id: masterUser._id}, {$push: {Gid: (await createdGroup)._id}})
		// 그룹 생성
		return await createdGroup;
    }
  }
};