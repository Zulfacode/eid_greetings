import { useMutation } from '@tanstack/react-query';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const useGreeting = () => {
  const generateGreeting = useMutation({
    mutationFn: async ({ name, greetingType, language }) => {
      if (!name.trim()) {
        throw new Error('Please enter your name');
      }

      const languageType = language === 'tunisian' ? 'Tunisian Arabic' : 'Standard Arabic';
      const prompt = greetingType === 'serious'
        ? `Generate a formal Eid greeting for ${name} in ${languageType}. The greeting should be respectful and traditional.`
        : `Generate a humorous Eid greeting for ${name} in ${languageType}. The greeting should be light-hearted and include some fun elements.`;

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
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

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    }
  });

  return {
    generateGreeting,
    isLoading: generateGreeting.isPending,
    error: generateGreeting.error,
    greeting: generateGreeting.data
  };
};