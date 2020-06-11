import mongoose from 'mongoose';

// DB에 실질적으로 기록되는 얘
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    AccountName: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Gid: [{
        type: Schema.Types.ObjectId,
        ref : 'groups'
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

export default mongoose.model('user', UserSchema);