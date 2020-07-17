import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Mutation: {
		updatePost: async (root, { Token, GroupID, PostID, Title, Contents, Images}) => {
            let date = new Date();
            let modifiedDate = date;
			
			if(!verifyPost(Token, PostId)){
				throw new Error("[DEBUG] error")
			}else{
				// modify data
				return await post.findByIdAndUpdate(
					PostID, 
					{
						$set: {
								Title:Title,
								Contents:Contents,
								Images: Images,
								ModifiedDate:modifiedDate
						}
		
					},
					{new: "true"}
				)
			}
		}
	} // new
};