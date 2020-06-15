
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
        throw new Error("[DEBUG] User data is not exist!")
      }
      console.log("[DEBUG] Connected!")
      const Password_hashed=bcrypt.hashSync(Password,1)
      console.log("[DEBUG] Input Password Hash"+Password_hashed)

      let accessToken="";
      let refreshToken="";

      // check password
      const result = bcrypt.compareSync(Password,userData.Password);
      if(!result){
        console.log("[DEBUG] Password Incorrect")
      } else{
        let _id = userData._id
        console.log("[DEBUG] Password correct")
        accessToken=jwt.sign({_id},serverSecretKey,{expiresIn: '2h'})
        refreshToken=jwt.sign({_id},serverSecretKey,{expiresIn: '2w'})
      }
      console.log("[DEBUG]"+AccountName+"'s Access Token: " + accessToken)
      console.log("[DEBUG]"+AccountName+"'s Refresh Token: " + refreshToken)
      //const accessTokenVerify = verifyToken(accessToken)
      //const refreshTokenVerify = verifyToken(refreshToken)
      return await {AccessToken: accessToken, RefreshToken: refreshToken, AccountName: userData.AccountName}
    }
  }
}