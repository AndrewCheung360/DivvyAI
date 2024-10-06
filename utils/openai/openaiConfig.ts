import pkg from '@next/env';
const { loadEnvConfig } = pkg;
import OpenAI from "openai";


// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);


const apiKey = process.env.OPENAI_API_KEY;


if (!apiKey) {
   throw new Error('Missing OpenAI API key in environment variables');
}


export const createOpenaiClient = () =>new OpenAI({
 apiKey: apiKey,
});


