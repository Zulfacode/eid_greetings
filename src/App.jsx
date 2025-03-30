import { useState } from 'react'
import { motion } from 'framer-motion'
import GreetingForm from './components/GreetingForm'
import GreetingDisplay from './components/GreetingDisplay'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [name, setName] = useState('')
  const [greetingType, setGreetingType] = useState('serious')
  const [language, setLanguage] = useState('tunisian')
  const [greeting, setGreeting] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateGreeting = async () => {
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      // Call our serverless function to securely handle the OpenAI API request
      const response = await fetch('/api/generate-greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, greetingType, language })
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      setGreeting(data.greeting)
    } catch (err) {
      setError('Error generating greeting. Please try again.')
      console.error('Error generating greeting:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <GreetingForm 
            name={name}
            setName={setName}
            greetingType={greetingType}
            setGreetingType={setGreetingType}
            language={language}
            setLanguage={setLanguage}
            generateGreeting={generateGreeting}
            isLoading={isLoading}
          />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
            >
              {error}
            </motion.div>
          )}
          
          {greeting && !isLoading && (
            <GreetingDisplay greeting={greeting} />
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App