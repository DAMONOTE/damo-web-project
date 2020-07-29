//
// 회원가입
//

import user from '../../../models/User'
import bcrypt from 'bcrypt'

export default {
  Mutation: {
    signUpUser: async (root, { AccountName, Password, Name ="", Email = ""}) => {
        let date = new Date()
        let createdDate = date
        let modifiedDate = date
        let gid = []
        Password=bcrypt.hashSync(Password,1)
        // ID 중복 확인
        const checkId = await user.findOne({AccountName})
        if(!checkId){
          return await user.create({AccountName, Password, Name, Email, gid,createdDate, modifiedDate});
        } else{
          throw new Error("This ID already exists.")
        }
        
    }
  }
};