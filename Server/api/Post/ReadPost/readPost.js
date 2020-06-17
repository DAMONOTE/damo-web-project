import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Query: {
		readPost: async (root, { Token, PostID}) => {
			
			// Token 검증
			let userId = verifyToken(Token)
			if(!userId){
				throw new Error("[MSG] Verify failed.")
			}
			// Post ID의 Group ID를 통해 해당 그룹에 유저가 포함되는지 확인
			var postData = post.findById(PostID)
			var groupData = group.findById(postData.GroupID)
			var groupMembers = groupData.Members

			if(!groupMembers.find(userId)){
				throw new Error("[MSG] You don't have permission for the article.")
			}else{
				return await post.findById(PostID)
			}
		}
	}
};