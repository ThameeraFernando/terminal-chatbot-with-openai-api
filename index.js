import { openAi } from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the terminal chatbot!"));
  console.log(colors.bold.green("You can start chatting with the bot."));
  const chatHistory = []; // store conversation history
  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      //   construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      messages.push({ role: "user", content: userInput });
      //   Call the open Ai
      const chatCompletion = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      //Get completion text/content
      const completionText = chatCompletion.data.choices[0].message.content;

      if (userInput.toLocaleLowerCase() === "exit") {
        console.log(colors.green("Bot: " + completionText));
        break;
      }

      console.log(colors.green("Bot: " + completionText));
      //   update history with user input and assistant response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
