//
// 회원가입
//

import user from '../../../models/User'
import bcrypt from 'bcrypt'
import group from '../../../models/Group'

export default {
  Mutation: {
    signUpUser: async (root, { AccountName, Password, Name = "", Email = "" }) => {
      let date = new Date()
      let createdDate = date
      let modifiedDate = date
      let gid = Array()
      Password = bcrypt.hashSync(Password, 1)
      const checkId = await user.findOne({ AccountName })
      if (!checkId) {
        try {
          let res_user = await user.create({ AccountName, Password, Name, Email, gid, createdDate, modifiedDate })
          let res_group = await group.create({ GroupMasterID: res_user._id, Members: [res_user._id], GroupName: AccountName })
          gid.push(res_group._id)
          res_user.Gid = gid
          await user.updateOne({ _id: res_user._id }, { $push: { Gid: gid } })

          console.log(res_user)
          return res_user
        } catch (e) {
          throw new Error("[DEBUG] Unkown Error")
        }
      } else {
        throw new Error("[DEBUG] This ID already exists.")
      }
    }
  }
};