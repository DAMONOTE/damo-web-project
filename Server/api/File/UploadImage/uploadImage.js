export default{
    Mutation:{
        uploadImage: async (obj, {file}) =>{
            var {filename, mimetype,encoding} = await file;
            //const stream = await createReadStream();
            //await stream.createWriteStream(`/Users/greendot/works/DAMONote/Server${filename}`)
            console.log("uploaded!")
            filename = "Dennis"
            const returnFile = {filename, mimetype,encoding};
            return returnFile;
        }
    }
};