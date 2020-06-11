import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Query: {
		readPost: async (root, { Token, PostID}) => {
			
			// Token 검증
			let tokenUid = verifyToken(Token)
			
			// Post의 GID 확인
			var post_data=post.findById(PostID)
			/*
			var postGroup = await group.findById('GroupID')
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
			*/
			// find post in DB
			return await post.findById(PostID)
			
		}
	} // new
};