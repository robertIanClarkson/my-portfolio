const { dynamoClient, s3 } = require('./connection');
const { v1 } = require('uuid');

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
  });
};

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
  });
};

function createProject(name, description) {
  let id = v1();

  var params = {
    TableName: 'Projects',
    Item:{
      "project_id": id,
      "name": name,
      "description": description
    }
  };

  return new Promise((resolve, reject) => {
    dynamoClient.put(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

function getProjects() {
  var params = {
    TableName: "Projects"
  };

  return new Promise((resolve, reject) => {
    dynamoClient.scan(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getImage(filename) {
  var params = {
    Bucket: 'my-portfolio-clarkson',
    Key: 'images/' + filename
  };
  return new Promise((resolve, reject) => {
    s3.getObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

module.exports = {
  getAllItems,
  getAdmin,
  createProject,
  getProjects,
  getImage
}