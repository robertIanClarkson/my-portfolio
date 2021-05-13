const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
module.exports = {
  dynamoClient,
  s3
}