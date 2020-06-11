/*
*
*   그룹 제거
*
*/
import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Mutation: {
		removeGroup: async (root, { GroupName, Token }) => {
    	// 토큰 확인
		let tokenUid = verifyToken(Token)
		
		// 기존 그룹이 있는지 확인
		const checkGroup = await group.findOne({GroupName})
		if(!checkGroup){
			throw new Error("[MSG] Group Name is not existed!")
		}
        
        // uid가 그룹 장인지 확인
        const masterUser = await user.findById(tokenUid)
        console.log(masterUser._id, typeof(masterUser._id))
        console.log(checkGroup.GroupMasterID, typeof(masterUser._id))
        if(masterUser._id.toString() != checkGroup.GroupMasterID.toString()){
            throw new Error("[MSG] Permission denied!")
        }
        // 멤버가 남아 있는지 확인
        var members = checkGroup.Members
        console.log(members.length)
        if(members.length != 1){
            throw new Error("[MSG] The members of the group remain. Please remove all members and try again!")
        }
        // 남아있는 멤버가 멤버장 자신인지 확인
        if(members[0] != masterUser._id.toString()){
            throw new Error("[MSG] You are not member master!")
        }

		// 그룹 생성
		return await group.findOneAndRemove({GroupName});
    }
  }
};