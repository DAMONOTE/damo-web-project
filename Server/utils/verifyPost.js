import post from '../models/Post'
import group from '../models/Group'
import verifyToken from './verifyToken'


export default function verifyPost(token,postId){
    var tokenUid=verifyToken(token)
    console.log(tokenUid)
    if(!tokenUid){
        throw new Error("[DEBUG] Verify failed.")
    }
    // Group check
    var postData = post.findById(postId)
    var groupData = group.findById(postData.GroupID)
    var groupMembers = groupData.Members

    return postId
    // 멤버 찾기 수정
    // if(!groupMembers.findById(tokenUid)){
    //     throw new Error("[DEBUG] You don't have permission for the article.")
    // }else{
    //     return postId
    // }
}