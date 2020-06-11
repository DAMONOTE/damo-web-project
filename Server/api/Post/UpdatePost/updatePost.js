import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Mutation: {
		updatePost: async (root, { Token, GroupID, PostID, Title, Contents}) => {
            let date = new Date();
            let modifiedDate = date;
            
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
			const isFound = await members.find(res => res == tokenUid)
			if(!isFound){
				throw new Error("[MSG] user is not member in group.")
			}
            
            // modify data
            return await post.findByIdAndUpdate(
                PostID, 
                {
                    $set: {
                            Title:Title,
                            Contents:Contents,
                            ModifiedDate:modifiedDate
                    }
    
                },
                {new: "true"}
            )
		}
	} // new
};