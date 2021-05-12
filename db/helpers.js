const { dynamoClient } = require('./connection');

function getAllItems(tableName) {
  const params = {
    TableName: tableName
  };

  return new Promise((resolve, reject) => {
    dynamoClient.scan(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  })
}

function getAdmin(username) {
  var params = {
    TableName: 'Admins',
    // IndexName: 'Index',s
    KeyConditionExpression: 'username = :user',
    ExpressionAttributeValues: {
      ':user': username
    }
  };

  return new Promise((resolve, reject) => {
    dynamoClient.query(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        if(data.Items.length > 1) {
          reject("more than 1 admin. uh oh big problem");
        } else {
          resolve(data.Items[0]);
        }
      }
    });
  })
}

module.exports = {
  getAllItems,
  getAdmin
}