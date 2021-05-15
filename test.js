const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "Movies"
};

docClient.scan(params, function (err, data) {
  if (err) {
    console.log(err)
  } else {
    const { Items } = data;
    console.log(Items)
  }
});