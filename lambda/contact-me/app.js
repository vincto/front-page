const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const SNS_TOPIC = process.env.SNS_TOPIC;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Callback
 * @param {Object} callback
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = (event, context, callback) => {

    console.log(event.body);
    const messageInfo = JSON.parse(event.body);
    
    // publish message
    const params = {
        Subject: `New message from ${messageInfo.name} (${messageInfo.email})`,
        Message: `${messageInfo.message} - ${messageInfo.phone} - ${messageInfo.name} - ${messageInfo.email}`,
        TopicArn: SNS_TOPIC,
    };

    SNS.publish(params, function (err, data) {
        //callback(null, {err: err, data: data});
        callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.message : '{"result":"ok"}',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            
            console.log(data);
            context.succeed(event);
        }
    });
};
