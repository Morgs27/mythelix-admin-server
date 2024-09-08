import PromptData from "../mongodb/models/prompt-data.js";
import { promptMetaData, promptWeights } from "./prompt-weights.js";

export async function getPromptData() {
    const versions = await PromptData.find({})
    return versions;
   
}

export async function createTestData() {

    await PromptData.create({
        alterChance: '0.1',
        extraString: "some test extra string",
        promptWeights: JSON.stringify(promptWeights),
        version: '1.1',
        current: 'false',
    })
   
}

