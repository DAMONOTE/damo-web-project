import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Query: {
		listPost: async (root, { Token, GroupID, Amount, Page}) => {
			// Check Token
			let tokenUid = verifyToken(Token)
			console.log('> '+tokenUid)
			let test=user.findById(tokenUid)
			console.log(test.AccountName)
			// 해당 유저가 해당 그룹 유저인지 확인
			var postGroup = await group.findById(GroupID)
			if(!postGroup){
				throw new Error("[DEBUG] Can not find the group.")
			}
			var members = postGroup.Members
			const isFound = members.find(res => res == tokenUid)
			if(!isFound){
				throw new Error("[DEBUG] user is not member in group.")
			}
			// DB에서 특정 페이지 게시글 특정 수량 만큼 가져오기
			return (await post.find().select('_id Title UserID CreatedDate').sort({CreatedDate: 1}).skip((Page-1)*Amount).limit(Amount))
		}
	} // new
};