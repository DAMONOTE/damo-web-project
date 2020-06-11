import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    GroupMasterID: {
        type: Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    GroupName: {
        type: String,
        required: true
    },
    Members: [{
        type: Schema.Types.ObjectId,
        ref : 'users'
    }],
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    ModifiedDate: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('group', GroupSchema);