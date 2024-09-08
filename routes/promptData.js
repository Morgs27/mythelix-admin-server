import express from 'express';
import * as dotenv from 'dotenv';

import {getPromptData, createTestData} from '../prompts/getPromptData.js';

import { promptWeights } from '../prompts/prompt-weights.js';
import PromptData from '../mongodb/models/prompt-data.js';
import { version } from 'mongoose';
import getPrompt from '../prompts/getPrompt.js';

dotenv.config();

const router = express.Router();

router.route('/').get(async(req, res) => {
    try {
        
        const promptData = await getPromptData()

        res.status(200).json({success: true, data: promptData})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }

})

router.route('/testPrompts').get(async(req, res) => {

    try {

        const promptData = await getPromptData()

        const activeVersions = promptData.filter((version) => {
            return version.current == 'true';
        })

        const version = activeVersions[activeVersions.length - 1]

        var allTypes = {}
        var allAlterations = {}

        const testNumber = 10000

        for (let index = 0; index < testNumber; index++) {
           
            var [prompt, type, alterations] = getPrompt(version)

            allTypes[type] = (allTypes[type] || 0) + 1
            allAlterations[alterations] = (allAlterations[alterations] || 0) + 1
            
        }

        const data = {
            testNumber: testNumber,
            types: allTypes,
            alterations: allAlterations,
        }

        res.status(200).json({success: true, result: data})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }

})

router.route('/createVersion').get(async(req, res) => {

    try {

        const {versionName} = req.query;

        const newVersion = await PromptData.create({
            alterChance: '0',
            extraString: ', digital art',
            promptWeights: '[]',
            version: versionName,
            current: 'false'
        })
    

        res.status(200).json({success: true, result: newVersion})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }

})


router.route('/deleteVersion').get(async(req, res) => {

    const {version} = req.query;

    try {
        
        const result = await PromptData.deleteOne({'version' : version})

        res.status(200).json({success: true, data: result})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }

})

router.route('/update').post(async(req, res) => {

    try {

        const data = (req.body);

        const result = await PromptData.updateOne({_id: data._id},{ $set : {
        alterChance: data.alterChance,
        current: data.current,
        extraString: data.extraString,
        promptWeights: data.promptWeights,
        }
        })

        res.status(201).json({success: true, data: result})
        
    } catch (error) {
        
        res.status(500).json({success: false, message: error})

    }
   

})

router.route('/newVersion').post(async(req, res) => {

    try {

        const {versionName} = req.query;

        const data = (req.body);

        const result = await PromptData.create({
            alterChance: data.alterChance,
            current: data.current,
            extraString: data.extraString,
            promptWeights: data.promptWeights,
            version: versionName
        })

        res.status(201).json({success: true, data: result})
        
    } catch (error) {
        
        res.status(500).json({success: false, message: error})

    }
   

})

export default router