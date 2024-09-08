import mongoose from 'mongoose';

const PromptData = mongoose.model('PromptData', mongoose.Schema({
    alterChance: { type: String, required: true},
    extraString: {type: String, required: true},
    promptWeights: {type: String, required: true},
    version: { type: String, required: true},
    current: {type: String, required: true}
}))

export default PromptData;