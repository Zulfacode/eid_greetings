import { motion } from 'framer-motion'

const Header = () => {
  return (
    <header className="bg-eid-green text-white py-6 shadow-md">
      <motion.div 
        className="container mx-auto px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Eid Mubarak Greetings
        </h1>
        <div className="text-xl font-arabic mb-2 text-eid-gold">
          عيد مبارك
        </div>
        <p className="text-center text-gray-100 max-w-2xl">
          Generate personalized Eid greetings in Arabic with just a few clicks
        </p>
      </motion.div>
    </header>
  )
}

export default Header