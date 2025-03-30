export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { name, greetingType, language } = await req.json();

    if (!name.trim()) {
      return new Response(JSON.stringify({ error: 'Please enter your name' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const languageType = language === 'tunisian' ? 'Tunisian Arabic' : 'Standard Arabic';
    const prompt = greetingType === 'serious'
      ? `Generate a formal Eid greeting for ${name} in ${languageType}. The greeting should be respectful and traditional.`
      : `Generate a humorous Eid greeting for ${name} in ${languageType}. The greeting should be light-hearted and include some fun elements.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates Eid greetings in Tunisian Arabic.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({ greeting: data.choices[0].message.content.trim() }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}