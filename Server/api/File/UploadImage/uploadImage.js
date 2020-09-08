import fs from 'fs'

export default{
    Mutation:{
        uploadImage: async (obj, {file}) =>{
<<<<<<< HEAD
            var {filename, mimetype,encoding} = await file;
            //const stream = await createReadStream();
            //await stream.createWriteStream(`/Users/greendot/works/DAMONote/Server${filename}`)
            console.log("uploaded!")
            filename = "Dennis"
            const returnFile = {filename, mimetype,encoding};
=======
            var {filename, mimetype,encoding,createReadStream} = await file;
            const stream = createReadStream();
            stream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))
            console.log("uploaded!")
            const returnFile = {filename, mimetype, encoding};
>>>>>>> c4a9d1f5d03f33802490f66dd417a4948f8d16c9
            return returnFile;
        }
    }
};
