export default{
    Mutation:{
        uploadImage: async (obj, {file}) =>{
            const {filename, mimetype,encoding}= await file;
            /*
            const stream = createReadStream();
            */
           const returnFile = {filename, mimetype,encoding};
           return returnFile;
        }
    }
};