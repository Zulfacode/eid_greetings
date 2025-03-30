import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-eid-green text-white py-4 mt-8">
      <motion.div 
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-sm">
          Created with ❤️ by ZulfaCode
        </p>
        <p className="text-xs mt-1 text-gray-200">
          Powered by OpenAI GPT-4
        </p>
      </motion.div>
    </footer>
  )
}

export default Footer