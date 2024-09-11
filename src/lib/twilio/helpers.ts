const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


export const sendApplicationId=async (applicationId:any,phone:any)=> {
    await client.messages
        .create({
            body: `Your application has been Registered, which Enrollment number is ${applicationId} you can check your Status and Download your Digital card from our website.`,
            from: '+12085371924',
            to:   `+91${phone}`,
        })
        .then((message:any) => console.log(message.sid))


}
// Your Request has been Registered with us, Enrollment no ${applicationId} \n' +
// 'You can check status Of Bhagya Laxmi Card on website , Expected  Delivery Time 45 Days

