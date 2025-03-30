import { motion } from 'framer-motion'
import { useState } from 'react'
import Snackbar from './Snackbar'

const GreetingDisplay = ({ greeting }) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-gradient-to-r from-eid-green/10 to-eid-gold/10 rounded-lg border border-eid-gold/30"
    >
      <h3 className="text-xl font-semibold text-eid-dark mb-4 text-center">
        Your Personalized Greeting
      </h3>
      <div className="font-arabic text-2xl text-center leading-relaxed text-eid-dark">
        {greeting}
      </div>
      
      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-eid-gold text-eid-dark rounded-md font-medium hover:bg-opacity-90 transition flex items-center"
          onClick={() => {
            // Create a temporary textarea element
            const textarea = document.createElement('textarea');
            textarea.value = greeting;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show the snackbar
            setShowSnackbar(true);
            
            // Hide the snackbar after 3 seconds
            setTimeout(() => setShowSnackbar(false), 3000);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Greeting
        </motion.button>
      </div>
      
      <Snackbar
        message="Greeting copied to clipboard!"
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </motion.div>
  )
}

export default GreetingDisplay