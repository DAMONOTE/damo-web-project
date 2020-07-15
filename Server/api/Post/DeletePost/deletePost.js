import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'
import verifyPost from '../../../utils/verifyPost'

export default {
	Mutation: {
		deletePost: async (root, { Token, PostID}) => {
			// Verify that the post is user's.
			if(!verifyPost(Token, PostID)){
				throw new Error("[DEBUG] error")
			}else{
				return await post.findByIdAndRemove(PostID)
			}
			// delete post in DB
			
		}
	} // new
};