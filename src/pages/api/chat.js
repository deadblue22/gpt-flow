const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const modelName = "gpt-35-turbo-0301";
const apiVersion = "2023-03-15-preview";
const basePath = process.env.OPENAI_BASE_PATH + modelName;
const configuration = new Configuration({
  apiKey,
  basePath,
  baseOptions: {
    headers: { "api-key": apiKey },
    params: {
      "api-version": apiVersion,
    },
  },
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createChatCompletion({
    messages: req.message,
  });
  res.status(200).json({ text: completion.data.choices[0].message });
}
