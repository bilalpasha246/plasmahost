// Environment config
require('dotenv').config();

// Get the dependencies
const express = require('express'); // handles HTTP server
const AWS = require('aws-sdk');     // handles AWS interactions
const cors = require('cors');       // cross origin resource sharing

// Express app setup
const app = express();
app.use(cors());


// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2' // TODO: let it auto choose this shit
});

// Create S3 client object
const s3 = new AWS.S3();

// Generate upload presigned url
app.get('/upload-url', (req, res) => {
    try {
        const { fileName, fileType } = req.query;

        // parameters for the presigned url
        const params = {
            Bucket: 'dxfupload',    // sends always to the same bucket
            Key: fileName,          // TODO: key should be unique; two users sending same file will result in collision
            Expires: 300,           // TODO: decide how long the presigned url is valid
            ContentType: fileType,  // TODO: handle the file type to raise error
            ACL: 'private',
        };

        // Get presigned url for uploading the file
        s3.getSignedUrl('putObject', params, (err, url) => {

            // Respond with error message
            if (err){
                console.error('Error generating presigned URL:', err);
                return res.status(500).send('Error generating presigned URL');
            }
            // Respond with the presigned url
            res.json({ upload_url: url });
        });
    } catch (error) {
        // Respond with error message
        console.error('Server Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Using Express
app.get('/download-url', async (req, res) => {
    try {
      const { fileName } = req.query;

      if (!fileName) {
        return res.status(400).send('Missing "fileName" query parameter');
      }
  
      // Configuration for polling
      const maxRetries = 5;       // maximum number of polling attempts
      let pollInterval = 1000;  // wait time (ms) between attempts
      let attempts = 0;
  
      // Helper function to check if the file exists in S3 using headObject
      async function fileExists() {
        try {
          await s3.headObject({ Bucket: 'objdownload', Key: fileName }).promise();
          return true; // File found
        } catch (err) {
          if (err.code === 'NotFound') {
            // The file is not in the bucket yet
            return false;
          }
          // Some other error occurred (e.g., permission, network issues, etc.)
          throw err;
        }
      }
  
      // Polling logic to wait until the file appears in objdownload
      let fileFound = await fileExists();
      while (!fileFound && attempts < maxRetries) {
        attempts++;
        
        // Wait for pollInterval before checking again
        await new Promise((resolve) => setTimeout(resolve, pollInterval));

        pollInterval = pollInterval * 2;
        fileFound = await fileExists();
      }
  
      // If the file still isn't found after maxRetries, return 404
      if (!fileFound) {
        return res.status(404).send('File not found in objdownload bucket.');
      }
  
      // Once the file is found, generate the presigned URL
      const params = {
        Bucket: 'objdownload',
        Key: fileName,
        Expires: 300, // Adjust the expiration time as needed
        ResponseContentDisposition: 'attachment; filename=convert.obj',
        ResponseContentType: 'application/octet-stream',
      };
      const downloadUrl = await s3.getSignedUrlPromise('getObject', params);
  
      // Return the presigned URL
      res.json({ download_url: downloadUrl });
    } catch (error) {
      console.error('Error generating download URL:', error);
      res.status(500).send('Error generating presigned download URL');
    }
});  


// Setup the express server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});