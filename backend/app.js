import express from "express";
import routes from "./routes/routes.js";
import dotenv from 'dotenv';
import OpenAI from "openai";
import cors from "cors"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Authenticate OpenAI with API keys
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET_KEY,
});

// Function to make an OpenAI API call and log a completion
async function main() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Write a haiku about recursion in programming." },
            ],
        });
        console.log(completion.choices[0].message.content);
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.log("Quota exceeded. Please check your plan and try again later.");
        } else {
            console.error("An error occurred:", error);
        }
    }
}

main();

app.use('/ask', routes(openai));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
});
