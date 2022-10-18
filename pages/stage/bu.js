const AWS = require('aws-sdk');
AWS.config.update( {
    region: 'eu-central-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'bettingTable';
const util = require('./utils/util');
const stripe = require("stripe")("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")

const paymentsPath = "/payment";
const retrievePath = "/retrieve";

exports.handler = async (event) => {
    console.log("Request event: ", event);
    let response;
    switch(true) {
        case event.httpMethod === "POST" && event.path === paymentsPath:
            const paymentBody = JSON.parse(event.body);
            response = await setPayment(paymentBody);
            break;
            
        case event.httpMethod === "GET" && event.path === paymentsPath:
            const paymentBody2 = JSON.parse(event.body);
            response = await setPayment(paymentBody2);
            break;
            
        case event.httpMethod === "POST" && event.path === retrievePath:
            const retrieveBody = JSON.parse(event.body);
            response = await getRetrieve(retrieveBody);
            break;
            
        default:
        response = util.buildResponse(404, "404 Not Found");
    }
    return response;
};

async function getRetrieve(body) {
    const session = await stripe.checkout.sessions.retrieve(body.session_key);
    if (session.payment_status === "paid" && (parseInt(session.expires_at) * 1000) > new Date().getTime()) {
        var rolle_exp = new Date();
        var rolle = "none";
        if (session.amount_total === 5900) {
            rolle_exp = new Date((new Date().getMonth() + 2) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
            rolle = "premium";
        } else if (session.amount_total === 3900) {
            rolle_exp = new Date((new Date().getMonth() + 2) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
            rolle = "plus";
        } else if (session.amount_total === 11700) {
            rolle_exp = new Date((new Date().getMonth() + 4) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
            rolle = "premium";
        } else if (session.amount_total === 8700) {
            rolle_exp = new Date((new Date().getMonth() + 4) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
            rolle = "plus";
        } else if (session.amount_total === 34800) {
            rolle_exp = new Date((new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + (new Date().getFullYear() + 1));
            rolle = "premium";
        } else if (session.amount_total === 22800) {
            rolle_exp = new Date((new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + (new Date().getFullYear() + 1));
            rolle = "plus";
        }
        const params234 = {
            TableName: userTable,
            Key: {
                'email': body.email
            },
            UpdateExpression: "set rolle = :rolle, rolle_exp = :rolle_exp",
            ExpressionAttributeValues: {
                ':rolle': rolle,
                ':rolle_exp': new Date(rolle_exp).getTime()
            },
            ReturnValues: 'UPDATED_NEW'
        }
        return await dynamodb.update(params234).promise().then((response) => {
            const body = {
                Operation: "UPDATE",
                Message: "SUCCESS",
                Item: response
            }
            return util.buildResponse(200, {body, session});
        }, (error) => {
            return util.buildResponse(200, {error, session});
        });
    } else return util.buildResponse(503, session);
}

async function setPayment(body) {
    const storeItems = new Map([
      [1, { priceInCents: 5900, name: "Premium 1 month" }],
      [2, { priceInCents: 11700, name: "Premium 3 month" }],
      [3, { priceInCents: 34800, name: "Premium 12 month" }],
      [4, { priceInCents: 3900, name: "Plus 1 month" }],
      [5, { priceInCents: 8700, name: "Plus 3 month" }],
      [6, { priceInCents: 22800, name: "Plus 12 month" }],
    ])

    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: body.items.map(item => {
            const storeItem = storeItems.get(item.id)
            return {
              price_data: {
                currency: "dkk",
                product_data: {
                  name: storeItem.name,
                },
                unit_amount: storeItem.priceInCents,
              },
              quantity: item.quantity,
            }
          }),
          success_url: `https://www.tipsspillet.dk/payment/success?true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `https://www.tipsspillet.dk/payment/cancel`,
        })
        return util.buildResponse(200, {"url": session.url});
      } catch (e) {
        return util.buildResponse(500, e.message);
      }
}

async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    } catch(error) {
        console.error("Kunne ikke finde gruppespil: ", error);
    }
}