import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Calendar } from "@/components/ui/calendar";

const Home = () => {
  const navigate = useNavigate();
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInternClick = () => {
    navigate('/intern-log');
  };

  const handleCloseModal = () => {
    setIsGuestModalOpen(false);
  };

  return (
    <div className="max-w-screen mx-auto space-y-4 min-h-screen bg-cover bg-center bg-fixed" 
         style={{ backgroundImage: "url('/src/assets/background-image.png')" }}>
    
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center p-4 justify-center w-full text-center bg-[#17468F] shadow-lg">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-full md:w-1/4 md:pr-0"
        >
          <img
            src="/src/assets/DICT COMMERCIAL LOGO 2.png"
            alt="DICT Logo"
            className="w-40 sm:w-56 h-auto hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center w-full md:w-1/3 md:-ml-1"
        >
          <h1 className="text-lg sm:text-xl font-bold font-archivo-black text-white tracking-wider">
            REGION IV-A (CALABARZON)
          </h1>
          <h3 className="text-xl sm:text-3xl font-bold font-archivo-black text-white mt-1">
            Quezon Provincial Office
          </h3>
        </motion.div>
      </div>

      {/* Welcome Text */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center pt-1"
      >
        <h1 className="text-4xl font-bold font-archivo-black tracking-wider drop-shadow-lg space-x-2">
          <span className="text-[#17468F]">Welcome to</span>
          <span className="text-red-600">Tech</span>
          <span className="text-yellow-500">4ED</span>
          <span className="text-[#17468F]">Center</span>
        </h1>
      </motion.div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Calendar with Clock */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center items-center bg-white/90 p-3 rounded-lg shadow-xl"
            style={{ maxWidth: '300px' }}
          >
            <div className="text-xl font-bold text-[#17468F] mb-2 font-archivo-black">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </motion.div>

          {/* DICT Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex justify-center items-center"
          >
            <img
              src="/src/assets/DICT BG.png"
              alt="DICT BG"
              className="w-[750px] h-auto rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => window.open('https://www.dict.gov.ph/home', '_blank')}
              style={{ cursor: 'pointer' }}
            />
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 flex justify-center items-center"
            style={{ maxWidth: '300px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.01233943162552!2d121.61046217479938!3d13.946847099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd4de6ae2eb011%3A0xff4d7d34184349ab!2sDICT%20-%20Quezon%20Provincial%20Office!5e0!3m2!1sen!2sph!4v1739345185615!5m2!1sen!2sph"
              className="w-full h-[420px] rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ border: 'none' }}
              allowFullScreen
              loading="lazy"
              title="Location Map"
            />
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-row items-center justify-center gap-8 mt-4"
        >
          <Button
            variant="outline"
            size="lg"
            className="w-64 h-12 bg-[#17468F] hover:bg-white text-white hover:text-[#17468F] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-archivo-black"
            onClick={() => setIsGuestModalOpen(true)}
          >
            Guests
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-64 h-12 bg-[#17468F] hover:bg-white text-white hover:text-[#17468F] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-archivo-black"
            onClick={() => navigate('/intern-log')}
          >
            Interns
          </Button>
        </motion.div>
      </div>

      {/* Modal */}
      <Dialog open={isGuestModalOpen} onOpenChange={setIsGuestModalOpen}>
        <DialogContent className="sm:max-w-md p-8 rounded-xl bg-white/95 backdrop-blur-sm">
          <DialogTitle className="text-2xl font-bold text-center mb-6">Select Guest Type</DialogTitle>
          <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="h-14 shadow-lg hover:shadow-xl border-none bg-[#17468F] hover:bg-white text-white hover:text-[#17468F] text-lg font-semibold transition-all duration-300 rounded-lg font-archivo-black"
              onClick={() => navigate('/walkin')}
            >
              Walk-in
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 shadow-lg hover:shadow-xl border-none bg-[#17468F] hover:bg-white text-white hover:text-[#17468F] text-lg font-semibold transition-all duration-300 rounded-lg font-archivo-black"
              onClick={() => navigate('/appointment')}
            >
              Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;