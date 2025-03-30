import { motion } from 'framer-motion'

const GreetingForm = ({ 
  name, 
  setName, 
  greetingType, 
  setGreetingType,
  language,
  setLanguage, 
  generateGreeting, 
  isLoading 
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-eid-dark text-center">
        Create Your Personalized Greeting
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eid-green focus:border-transparent transition"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="greetingType" className="block text-sm font-medium text-gray-700 mb-1">
            Greeting Type
          </label>
          <select
            id="greetingType"
            value={greetingType}
            onChange={(e) => setGreetingType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eid-green focus:border-transparent transition"
            disabled={isLoading}
          >
            <option value="serious">Serious</option>
            <option value="funny">Funny</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eid-green focus:border-transparent transition"
            disabled={isLoading}
          >
            <option value="tunisian">Tunisian Arabic</option>
            <option value="standard">Standard Arabic</option>
          </select>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generateGreeting}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-eid-green hover:bg-opacity-90'}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Greeting...
          </div>
        ) : 'Generate Greeting'}
      </motion.button>
    </div>
  )
}

export default GreetingForm