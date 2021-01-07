import fs from 'fs'

export default{
    Mutation:{
        uploadImage: async (obj, {file}) =>{
            var {filename, mimetype,encoding,createReadStream} = await file;
            const stream = createReadStream();
            stream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))
            console.log("uploaded!")
            const returnFile = {filename, mimetype, encoding};
            return returnFile;
        }
    }
};
