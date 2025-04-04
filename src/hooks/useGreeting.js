import { useMutation } from '@tanstack/react-query';

export const useGreeting = () => {
  const generateGreeting = useMutation({
    mutationFn: async ({ name, greetingType, language }) => {
      if (!name.trim()) {
        throw new Error('Please enter your name');
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          greetingType,
          language
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.greeting) {
        throw new Error('Invalid response format from server');
      }
      return data.greeting;
    }
  });

  return {
    generateGreeting,
    isLoading: generateGreeting.isPending,
    error: generateGreeting.error,
    greeting: generateGreeting.data
  };
};