import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({ apiKey: process.env.API_KEY });

export const openAi = new OpenAIApi(configuration);
