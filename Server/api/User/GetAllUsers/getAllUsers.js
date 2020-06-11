import user from '../../../models/User'
import verifyToken from '../../../utils/verifyToken'

export default {
  Query: {
    getAllUsers: async (root,{Token}) => {
      verifyToken(Token);
      return await user.find();
    }
  }
};