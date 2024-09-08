import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import { Storage } from "@google-cloud/storage";
import UnclaimedImage from '../mongodb/models/unclaimed-image.js';

import getPrompt from '../prompts/getPrompt.js';
import { getPromptData } from '../prompts/getPromptData.js';

import fs from 'fs'

dotenv.config();

const router = express.Router();

// Google Cloud Storage Project ID
const projectId = process.env.PROJECT_ID;
    
// Initialize Google Cloud Storage client
const storage = new Storage({ projectId , keyFilename: 'google-key.json'});

// Google Cloud Storage Bucket Name
const bucketName = process.env.BUCKET_NAME;

// Python Server URL
const pythonServer = process.env.PYTHON_SERVER_URL;

router.route('/').get(async(req, res) => {
    try {

        const promptData = await getPromptData()

        const activeVersions = promptData.filter((version) => {
            return version.current == 'true';
        })

        const version = activeVersions[activeVersions.length - 1]

        const [prompt, type, alterations] = getPrompt(version)

        // Get Image from python server
        let result;
        try {
            result = await axios.get(`${pythonServer}/?prompt=${prompt}`);
        } catch (error) {
            console.error('Error accessing Python server:', error.message);
            return res.status(500).json({ success: false, message: 'Unable to access Python server' });
        }

        const photo_base64 = result.data;

        const imageBuffer = Buffer.from(photo_base64, 'base64')

        const outputFilePath = 'images/testFile.jpg'

        // Save image to local folder
        fs.writeFileSync(outputFilePath, imageBuffer, (error) => {
            if (error) {
                console.error('Error saving image:', error);
            } else {
                console.log('Image saved successfully.');
            }
        })

        // Set the destination path for the uploaded image in the bucket
        const destinationPath = Date.now() + '.jpg';

        fs.stat('images/testFile.jpg', (err,stats) => {
            if (err) {
                console.error('Error reading the image file:', err);
              } else {
                const fileSizeInBytes = stats.size;
                const fileSizeInKB = fileSizeInBytes / 1024;
                const fileSizeInMB = fileSizeInKB / 1024;
            
                console.log('File size in bytes:', fileSizeInBytes);
                console.log('File size in kilobytes:', fileSizeInKB);
                console.log('File size in megabytes:', fileSizeInMB);
              }
        })
        
        // Upload the image to the specified bucket and path
        const info = await storage.bucket(bucketName).upload('images/testFile.jpg', {
            destination: destinationPath,
        });

        console.log("Image Uploaded to Google Cloud Storage: ", info)

        // Upload photo adress + info to database
        const newImage = await UnclaimedImage.create({
            prompt: prompt,
            type: type,
            alterations: alterations,
            photo: `https://storage.cloud.google.com/${bucketName}/${destinationPath}`,
            promptVersion: version.version
        })

        console.log("Image Added to Database: ", newImage)

        res.status(200).json({success: true, data: `https://storage.cloud.google.com/${bucketName}/${destinationPath}`})

    } catch (error) {
        
        res.status(200).json({success: false, message: error})

    }
})

export default router
