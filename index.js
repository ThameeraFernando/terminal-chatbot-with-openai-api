import { openAi } from "./config/open-ai";

async function main() {
  const chatCompletion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "what is the capital of SriLanka?" }],
  });
  console.log(chatCompletion.data.choices[0].message.content);
}

main();
