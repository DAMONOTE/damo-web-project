import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'
import verifyPost from '../../../utils/verifyPost';

export default {
	Query: {
		readPost: async (root, { Token, PostID}) => {
			if(!verifyPost(Token, PostID)){
				throw new Error("[DEBUG] error")
			}else{
				return await post.findById(PostID)
			}
		}
	}
};