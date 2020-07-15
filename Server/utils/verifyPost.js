import post from '../models/Post'
import group from '../models/Group'
import verifyToken from './verifyToken'


export default async function verifyPost(token,postId){
    var tokenUid=verifyToken(token)
    if(!tokenUid){
        throw new Error("[DEBUG] Verify failed.")
    }
    // Group check
    console.log(">>>>"+postId)
    const postData = await post.findById(postId)
    console.log(postData.GroupID._id)
    if (!postData) {
        throw new Error("[DEBUG] Can not find post.")
    }
    var groupData = await group.findById(postData.GroupID)
    if (!groupData) {
        throw new Error("[DEBUG] Can not find group.")
    }
    var members = groupData.Members
    if(!members){
        throw new Error("[DEBUG] Can not find group's members")
    }
    const isFound = await members.find(res => res == tokenUid)
    if(!isFound){
        console.log('test1')
    }else{
        return postId
    }
    
}