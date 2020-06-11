
import user from '../../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyToken from '../../../utils/verifyToken'

var serverSecretKey = "test"

export default {
  Mutation: {
    signInUser: async (root, { AccountName, Password}) => {
      // find user data
      const userData = await user.findOne({ AccountName })
      if (!userData){
        throw new Error("[MSG] User data is not exist!")
      }
      console.log("Connected!")
      const Password_hashed=bcrypt.hashSync(Password,1)
      console.log("[Input Password Hash] "+Password_hashed)
      console.log("[Origin Password Hash] "+userData.Password)
      let signToken="";
      // check password
      const result = bcrypt.compareSync(Password,userData.Password);
      if(!result){
        console.log("[Compare] Password Incorrect")
      } else{
        //use id document
        let _id = userData._id
        console.log("[Compare] Password correct")
        signToken=jwt.sign({_id},serverSecretKey,{expiresIn: '2h'})
      }
      console.log("[Sigened Token]"+AccountName+"'s token: "+signToken)
      const txt = verifyToken(signToken)
      console.log(txt)

      return {Token: signToken}
    }
  }
}