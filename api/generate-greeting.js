import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-greeting', async (req, res) => {
  try {
    const { name, greetingType, language } = req.body;
    
    if (!name || !greetingType || !language) {
      return res.status(400).json({ error: 'Name, greeting type, and language are required' });
    }

    // Construct the prompt based on greeting type and language
    let prompt = '';
    const languageType = language === 'tunisian' ? 'Tunisian Arabic' : 'Standard Arabic';
    if (greetingType === 'serious') {
      prompt = `Generate a formal Eid greeting for ${name} in ${languageType}. The greeting should be respectful and traditional.`;
    } else {
      prompt = `Generate a humorous Eid greeting for ${name} in ${languageType}. The greeting should be light-hearted and include some fun elements.`;
    }

    // Make request to OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates Eid greetings in Tunisian Arabic.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    // Extract the generated greeting from the response
    const greeting = response.data.choices[0].message.content.trim();
    
    // Return the greeting
    return res.status(200).json({ greeting });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return res.status(500).json({ error: 'Error generating greeting' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});