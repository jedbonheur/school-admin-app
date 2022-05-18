require('dotenv').config()
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const AWS = require('aws-sdk')
const fs = require('fs')

// pulling  infos
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


const myCredentials = new AWS.Config({
  accessKeyId: accessKeyId, 
  secretAccessKey: secretAccessKey, 
  region: region
});
// client
const client = new S3Client(myCredentials)

// upload file function

const uploadFile = async  (file) => {
 const body = fs.createReadStream(file.path)
 const params = {
  Bucket: bucketName,
  Key: file.originalname,
  Body: body,
 }
  try {
    const data = await client.send(new PutObjectCommand(params));
  } catch (err) {
    console.log("Error", err);
  }
 // // upload file using upload method
 // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
};

module.exports = {
  uploadFile,
}