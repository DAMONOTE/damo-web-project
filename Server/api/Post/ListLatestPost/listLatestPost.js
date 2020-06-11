import post from '../../../models/Post'
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Query: {
		listLatestPost: async (root, { Token, GroupID}) => {
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
			//var count = post.find().count({Title})
			//console.log(count)
			//var test = post.find().where('Title').limit(10)
			// DB에서 가장 최신글 10개 불러오기
			return (await post.find().select('_id Title UserID CreatedDate').sort({CreatedDate: -1}).limit(10))
		}
	} // new
};