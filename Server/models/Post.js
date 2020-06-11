import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    GroupID: {
        type: Schema.Types.ObjectId,
        ref : 'groups',
        required: true
    },
    UserID: {
        type: Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Contents: {
        type: String
    },
    CreatedDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    ModifiedDate: {
        type: Date,
        default: Date.now()
    }
    
});

export default mongoose.model('post', PostSchema);