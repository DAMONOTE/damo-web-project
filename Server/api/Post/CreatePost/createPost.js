import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Mutation: {
		createPost: async (root, { Token, GroupID, Title = '', Contents = '' }) => {
			// Check Token
			let tokenUid = verifyToken(Token)
			
			// 해당 유저가 해당 그룹 유저인지 확인
			var postGroup = await group.findById(GroupID)
			if(!postGroup){
				throw new Error("[MSG] Can not find the group.")
			}
			var members = postGroup.Members
			console.log(members)
			console.log(tokenUid, typeof(tokenUid))
			const isFound = members.find(res => res == tokenUid)
			if(!isFound){
				throw new Error("[MSG] user is not member in group.")
			}
			// create post
			return await post.create({ GroupID: GroupID, UserID: tokenUid, Title: Title, Contents: Contents,CreatedDate: undefined,ModifiedDate: undefined});
		}
	} // new
};