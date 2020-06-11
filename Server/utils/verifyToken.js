import jwt from 'jsonwebtoken'
import user from '../models/User'

var serverSecretKey = "test"

export default function verifyToken(token){
    const decodedToken = jwt.verify(token, serverSecretKey,{complete: true});
    //const decodedToken = jwt.verify(token, serverSecretKey);
    const userData = user.findById(decodedToken.payload._id);
    if (!userData){
        throw new Error("[MSG] User data is not exist!");
    }

    console.log(">>>" + decodedToken.payload._id)
    return decodedToken.payload._id
}
