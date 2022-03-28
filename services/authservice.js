global.navigator = () => null;
require('dotenv').config();

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: process.env.USER_POOL_ID,
   ClientId: process.env.CLIENT_ID,
};
const pool_region = 'ca-central-1';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
exports.Register = function (body, callback) {
   var name = body.name;
   var email = body.email;
   var password = body.password;
   var attributeList = [];
   
   attributeList.push(new    AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
   userPool.signUp(name, password, attributeList, null, function (err, result) {
     if (err)
         callback(err);
     var cognitoUser = result.user;
     callback(null, cognitoUser);
   })
}

exports.Login = function (body, callback) {
    var userName = body.name;
    var password = body.password;
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
         Username: userName,
         Password: password
     });
     var userData = {
         Username: userName,
         Pool: userPool
     }
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
     cognitoUser.authenticateUser(authenticationDetails, {
         onSuccess: function (result) {
            var accesstoken = result.getAccessToken().getJwtToken();
            callback(null, accesstoken);
         },
         onFailure: (function (err) {
            callback(err);
        })
    })
 };

 