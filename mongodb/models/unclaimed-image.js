import mongoose from 'mongoose';

const UnclaimedImage = mongoose.model('UnclaimedImage', mongoose.Schema({
    prompt: { type: String, required: true},
    type: {type: String, required: true},
    alterations: {type: String, required: true},
    photo: { type: String, required: true},
    promptVersion: {type: String, required: true}
}))

export default UnclaimedImage;