/*
*
*   그룹 수정
*
*/

import group from '../../../models/Group'
import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
	Mutation: {
		updateGroup: async (root, { Token, _id, GroupMasterID, GroupName, Members}) => {
    	// 유저 토큰 확인
		let tokenUid = verifyToken(Token)
        
		// 기존 그룹이 있는지 확인
		const checkGroup = await group.findById({_id})
		if(!checkGroup){
			throw new Error("[DEBUG] Group Name is not existed!")
		}
        
        // uid가 그룹 장인지 확인
        const masterUser = await user.findById(tokenUid)
        console.log(masterUser._id, typeof(masterUser._id))
        console.log(checkGroup.GroupMasterID, typeof(masterUser._id))
        if(masterUser._id.toString() != checkGroup.GroupMasterID.toString()){
            throw new Error("[DEBUG] Permission denied!")
        }

        // 변경하려는 GroupName이 겹치는지

        // 변경하려는 GroupMasterID가 존재하는지

        // 변경하려는 Members의 멤버가 존재하는지
        
        return await group.findByIdAndUpdate(
            _id, 
            {
                $set: {
                        GroupName:GroupName,
                        GroupMasterID:GroupMasterID,
                        GroupName:GroupName,
                        Members:Members,
                }

            },
            {new: "true"}
        )
    }
  }
};