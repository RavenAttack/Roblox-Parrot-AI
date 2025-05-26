import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.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,
});

const birdSystemPrompt = `
You are Cheesy Boi, a bird with sass and chaos. You love snacks and shade. 
Respond in short, hilarious, unhinged bird vibes. Pecks encouraged.
`;

app.post('/birbchat', async (req, res) => {
  const message = req.body.message || "chirp";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: birdSystemPrompt },
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;
    res.json({ response: reply });
  } catch (err) {
    console.error("AI meltdown:", err);
    res.status(500).send("Bird brain error.");
  }
});

app.listen(PORT, () => {
  console.log(`Cheesy Boi is squawking on http://localhost:${PORT}`);
});
