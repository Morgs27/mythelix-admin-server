import express from 'express';
import * as dotenv from 'dotenv';
import UnclaimedImage from '../mongodb/models/unclaimed-image.js';
import { getPromptData } from '../prompts/getPromptData.js';
import { version } from 'mongoose';

dotenv.config();

const router = express.Router();

router.route('/').get(async(req, res) => {
    try {

        const {version} = req.query;
        
        const images = await UnclaimedImage.find({promptVersion: version})

        res.status(200).json({success: true, data: images})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }
})

export default router