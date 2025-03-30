import { useState } from 'react'
import { motion } from 'framer-motion'
import GreetingForm from './components/GreetingForm'
import GreetingDisplay from './components/GreetingDisplay'
import Header from './components/Header'
import Footer from './components/Footer'
import { useGreeting } from './hooks/useGreeting'

function App() {
  const [name, setName] = useState('')
  const [greetingType, setGreetingType] = useState('serious')
  const [language, setLanguage] = useState('tunisian')

  const {
    generateGreeting,
    isLoading,
    error,
    greeting
  } = useGreeting();

  const handleGenerateGreeting = () => {
    generateGreeting.mutate({ name, greetingType, language })
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
            generateGreeting={handleGenerateGreeting}
            isLoading={isLoading}
          />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
            >
              {error.message}
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