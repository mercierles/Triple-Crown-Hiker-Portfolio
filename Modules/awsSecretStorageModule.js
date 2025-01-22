// const SecretsManagerClient = require("@aws-sdk/client-secrets-manager");
// const GetSecretValueCommand = {};
// // import {
// //     SecretsManagerClient,
// //     GetSecretValueCommand,
// // } from "@aws-sdk/client-secrets-manager";
// const secret_name = "ProdInstagramAccessToken";
// const client = new SecretsManagerClient.SecretsManagerClient({
//     region: "us-east-1",
//     // credentials: {
//     //   accessKeyId: configuration.aws.accessKeyId,
//     //   secretAccessKey: configuration.aws.secretAccessKey,
//     // },
// });

// async function secret() {
//     if(process.env.INSTAGRAM_ACCESS_TOKEN2 === 'test'){
//         // Use this code snippet in your app.
//     // If you need more information about configurations or implementing the sample code, visit the AWS docs:
//     // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
//         let response;  
//         try {
//             response = await client.send(
//             new SecretsManagerClient.GetSecretValueCommand({
//                 SecretId: secret_name,
//                 VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
                
//             })
//             );
//         } catch (error) {
//             // For a list of exceptions thrown, see
//             // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//             throw error;
//         }
        
//         const secret = response.SecretString;
//         return secret;
        
//     }
//   }

//   module.exports = {secret};