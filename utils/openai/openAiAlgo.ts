'use server'
import { loadEnvConfig } from '@next/env'
import OpenAI from "openai";
import fs from 'fs'
import pdf from 'pdf-parse'
import * as path from 'path'
import { pinata } from '@/utils/config';

// * Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('Missing OpenAI API key in environment variables');
}
const openai = new OpenAI({
 apiKey: apiKey,
});

export async function extractPdfText(buffer: any, directory: string) {
  try {
    const filePath = path.join(directory, 'output.pdf');
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Error writing PDF file:', err);
      } else {
        console.log('PDF file successfully created at:', filePath);
      }
    });
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return "";
  }
}

export async function main(buffer: any, estimatedTime: number){
//  const extractedText = await extractPdfText(buffer, "../../pdfs");
//  console.log("This is the extracted text", extractedText)s;

 const prompt = `Break down the following assignment and divide it into manageable questions or tasks. For each task, provide an estimated time to complete based on the total time of ${estimatedTime} minutes. Then provide the output in the following format:
 [["Task 1", 15], ([Task 2", 20], ...] and only give this output
 `;

 const extractedText = `
 1. Find the following limits involving absolute values:
   (a) lim(x → 1) (x^2 − 1) / |x − 1|
   (b) lim(x → −2) (1 / |x + 2|) + x^2
   (c) lim(x → 3−) (x^2 / |x − 3|) / (x − 3)
   
 2. Find the value of the parameter k to make the following limit exist and be finite. 
 What is then the value of the limit?
   lim(x → 5) (x^2 + kx − 20) / (x − 5)
 
 3. Answer the following questions for the piecewise defined function f(x) described on the right-hand side:
   (a) f(1) = ?
   (b) lim(x → 0) f(x) = ?
   (c) lim(x → 1) f(x) = ?
 `;
 
 const completion = await openai.chat.completions.create({
   model: "gpt-4o-mini",
   messages: [
       { role: "system", content: `You are a Task Manager System that only ouputs in the form [["Task 1", 15], ["Task 2", 20], ...] with no filler text ${prompt}` },
       {
           role: "user",
           content: `Uing this assignment: ${extractedText} give me only an output like [["Task 1", 15], ["Task 2", 20], ...]`,
       },
   ],
 });
 const str = completion.choices[0].message.content
 const list = JSON.parse(str!);
 return list
}

// export const test = async (pdfCid: string) => {
//   const file = await pinata.gateways.get(pdfCid);
//   const blob = file.data as Blob;
//   const arrayBuffer = await blob?.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const extractedText = await extractPdfText(buffer);
//   console.log(extractedText);
// }

// test("bafkreibdea7zezawc4km3ogs6r2ltnsb42ttl6gouqeyyqfdzk4hio6xje")

