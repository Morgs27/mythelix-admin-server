# Mythelix Admin Server

Backend server for Mythelix admin system. Interacts with MongoDB, Python image generation server, and Google Cloud Storage.

To be paired with [Mythelix-Image-Generation-Server](https://github.com/Morgs27/mythelix-image-generator)

The admin client to interact with this server can be found at [Mythelix-Admin-Client](https://github.com/Morgs27/mythelix-admin-client)

## Features

- MongoDB integration
- Python image generation server interaction
- Google Cloud Storage for image storage
- RESTful API for image management

## Setup

1. `npm install`
2. Set up `.env` file as below
3. Add `google-key.json` to root directory

## Configuration

Create `.env` with:

```
MONGODB_URL = "YOUR_MONGODB_URL"

# Google Cloud Storage
PROJECT_ID = "YOUR_PROJECT_ID"
BUCKET_NAME = "YOUR_BUCKET_NAME"

# Image Generation Server
PYTHON_SERVER_URL = "YOUR_PYTHON_SERVER_URL"
```

## Running

### Node.js

```
npm start
```

### Docker

```
docker build -t mythelix-admin-server .
docker run -p 8080:8080 mythelix-admin-server
```

Server runs on `http://localhost:8080`

## API Endpoints

- POST /createImage
- GET /getImages
- GET /deleteImage
- GET /promptData
- POST /promptData/update

## Image Generation Process

1. Generate prompt based on promptData
2. Send request to Python image generation server
3. Save image to Google Cloud Storage
4. Create MongoDB record

