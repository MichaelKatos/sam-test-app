// // const axios = require('axios')
// // const url = 'http://checkip.amazonaws.com/';
// let response;

// /**
//  *
//  * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
//  * @param {Object} event - API Gateway Lambda Proxy Input Format
//  *
//  * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
//  * @param {Object} context
//  *
//  * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
//  * @returns {Object} object - API Gateway Lambda Proxy Output Format
//  * 
//  */
// exports.lambdaHandler = async (event, context) => {
//     try {
//         // const ret = await axios(url);
//         response = {
//             'statusCode': 200,
//             'body': JSON.stringify({
//                 message: 'hello world',
//                 // location: ret.data.trim()
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         return err;
//     }

//     return response
// };

var aws = require("aws-sdk");
var nodemailer = require("nodemailer");

var ses = new aws.SES();


// function getS3File(bucket, key) {
//     return new Promise(function(resolve, reject) {
//         s3.getObject(
//             {
//                 Bucket: bucket,
//                 Key: key
//             },
//             function (err, data) {
//                 if (err) return reject(err);
//                 else return resolve(data);
//             }
//         );
//     })
// }

exports.emailHandler = (event, callback) => {
    // let bucket = 'wildrydestut/images';
    // let key = 'loading.gif';

    // getS3File(bucket, key)
    //      .then(

    // function (fileData) => {
    var mailOptions = {
        from: 'no-reply@playingthefield.io',
        subject: 'This is an email sent from a Lambda function!',
        html: `<p>You got a contact message from: <b>${event.emailAddress}</b></p>`,
        to: event.emailAddress
        // bcc: Any BCC address you want here in an array,
        // attachments: [
        //     {
        //         // filename: `Attachment.${fileData.ContentType.slice(fileData.ContentType.indexOf('/') + 1)}`,
        //         filename: key,
        //         content: fileData.Body
        //     }
        // ]
    };
    // console.log('------------------------');
    // console.log(fileData);
    // console.log('------------------------');
    // console.log('Creating SES transporter');
    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: ses
    });

    // send email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            console.log('Error sending email');
            callback(err);
        } else {
            console.log('Email sent successfully');
            callback(info);
        }
    });
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     console.log('Error getting attachment from S3');
    //     callback(error);
    // });
}