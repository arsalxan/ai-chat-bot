const express = require('express');
const router = express.Router();
const Message = require('../models/Message');


const { GoogleGenerativeAI } = require("@google/generative-ai");

// OpenAI API setup (commented out)
/*
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
*/

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  geminiConfig,
});

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // Save user message to the database
    const userMessage = new Message({ text: message, sender: 'user' });
    await userMessage.save();

    const prompt = message;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const botResponseText = response.text();

    // OpenAI API call (commented out)
    /*
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });
    const botResponseText = completion.choices[0].message.content;
    */
    
    // Save bot message to the database
    const botMessage = new Message({ text: botResponseText, sender: 'bot' });
    await botMessage.save();

    res.json({ reply: botResponseText });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;