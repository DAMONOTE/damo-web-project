import jwt from 'jsonwebtoken'
import user from '../models/User'
import {serverSecretKey} from './serverConfig'

export default function verifyToken(token){
    const decodedToken = jwt.verify(token, serverSecretKey,{complete: true});
    const userData = user.findById(decodedToken.payload._id);
    if (!userData){
        throw new Error("[DEBUG] Token verify failed!");
    }
    return decodedToken.payload._id
}
