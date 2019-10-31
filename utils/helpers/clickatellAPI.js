const axios = require("axios");

module.exports.sendSMS = async (phoneWithCountryCode, otp) => {
  const baseURL = "https://platform.clickatell.com/messages/http/send";
  const apiKey = process.env.CLICKATELL_API_KEY;
  const message = `${otp} is your verification code for Find A Donor app.\nValid upto 10 minutes.`;
  return await axios.get(baseURL, {
    params: {
      apiKey,
      to: phoneWithCountryCode,
      content: message
    }
  });
};
