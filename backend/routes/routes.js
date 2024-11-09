import express from "express";
const router = express.Router();

// Define the route for handling OpenAI requests
const routes = (openai) => {

    // global variable to hold conversation history
    let conversationHistory = [
        {role: "system", content: "You are a helpful assistant."}
    ];
    router.post('/', async (req, res) => {
        const userMessage = req.body.message;
        // update conversation history with the user's message
        conversationHistory.push({role:"user", content:"userMessage"})
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required." });
        }

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: conversationHistory,
            });

            const botResponse = completion.choices[0].message.content;
            res.status(200).json({ botResponse });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Failed to get response from OpenAI." });
        }
    });

    return router;

};

export default routes;
