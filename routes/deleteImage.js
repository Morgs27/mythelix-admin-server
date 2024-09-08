import express from 'express';
import * as dotenv from 'dotenv';
import UnclaimedImage from '../mongodb/models/unclaimed-image.js';

dotenv.config();

const router = express.Router();

router.route('/').get(async(req, res) => {

    const {id} = req.query;

    try {
        
        const images = await UnclaimedImage.deleteOne({'_id' : id})

        res.status(200).json({success: true, data: images})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }

})

export default router