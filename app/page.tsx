'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Trophy, ArrowRight, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { useQuizStore, DifficultyLevel } from '@/lib/store';

const careerOptions = [
  // Technology & Software
  'Software Development',
  'Software Engineering',
  'Web Development',
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'iOS Development',
  'Android Development',
  'Game Development',
  'DevOps Engineering',
  'Site Reliability Engineering',
  'Cloud Engineering',
  'Cloud Architecture',
  'Solutions Architecture',
  'System Administration',
  'Network Engineering',
  'Database Administration',
  'Quality Assurance',
  'QA Engineering',
  'Test Automation',
  'Performance Engineering',
  
  // Data & AI
  'Data Science',
  'Data Engineering',
  'Data Analytics',
  'Business Intelligence',
  'Machine Learning Engineering',
  'AI Engineering',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'MLOps Engineering',
  'Data Architecture',
  
  // Security
  'Cybersecurity',
  'Information Security',
  'Security Engineering',
  'Penetration Testing',
  'Ethical Hacking',
  'Security Analysis',
  'Cloud Security',
  'Application Security',
  
  // Design & UX
  'UI/UX Design',
  'User Experience Design',
  'User Interface Design',
  'Product Design',
  'Graphic Design',
  'Visual Design',
  'Interaction Design',
  'Motion Design',
  'Brand Design',
  '3D Design',
  
  // Product & Management
  'Product Management',
  'Product Owner',
  'Project Management',
  'Program Management',
  'Technical Program Management',
  'Agile Coach',
  'Scrum Master',
  'Business Analysis',
  'Business Analyst',
  
  // Marketing & Sales
  'Digital Marketing',
  'Content Marketing',
  'Social Media Marketing',
  'SEO Specialist',
  'SEM Specialist',
  'Email Marketing',
  'Growth Marketing',
  'Marketing Analytics',
  'Brand Marketing',
  'Product Marketing',
  'Sales Engineering',
  'Account Management',
  
  // Specialized Tech
  'Blockchain Development',
  'Smart Contract Development',
  'IoT Engineering',
  'Embedded Systems',
  'Robotics Engineering',
  'AR/VR Development',
  'Quantum Computing',
  
  // Creative & Content
  'Technical Writing',
  'Content Strategy',
  'UX Writing',
  'Documentation',
  'Video Production',
  'Animation',
  'Photography',
  
  // Business & Finance
  'Financial Analysis',
  'Investment Banking',
  'Accounting',
  'Risk Management',
  'Compliance',
  'Operations Management',
  'Supply Chain Management',
  'Human Resources',
  'Recruitment',
  'Training & Development',
  
  // Research & Academia
  'Research Scientist',
  'Data Scientist',
  'Academic Research',
  'Clinical Research',
  'Market Research',
  
  // Healthcare Tech
  'Health Informatics',
  'Medical Software Development',
  'Telemedicine',
  'Healthcare Data Analysis',
  
  // E-commerce & Retail
  'E-commerce Management',
  'Retail Analytics',
  'Customer Success',
  'Customer Support',
  
  // Media & Entertainment
  'Audio Engineering',
  'Sound Design',
  'Music Production',
  'Broadcasting',
  'Journalism',
  
  // Education
  'Instructional Design',
  'Educational Technology',
  'Online Course Development',
  'Training Specialist',
  'Teacher',
  
  // Legal & Compliance
  'Legal Technology',
  'Legal Research',
  'Regulatory Affairs',
  'Patent Law',
  
  // Other Professional
  'Consulting',
  'Strategy Consulting',
  'IT Consulting',
  'Management Consulting',
  'Environmental Science',
  'Architecture',
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
];
const difficultyOptions = [
  {
    level: 'beginner' as DifficultyLevel,
    icon: BarChart3,
    title: 'Beginner',
    description: 'Fundamental concepts and basic knowledge',
    gradientColor: 'from-emerald-500 to-teal-600',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-500',
    shadowColor: 'shadow-emerald-200',
  },
  {
    level: 'intermediate' as DifficultyLevel,
    icon: TrendingUp,
    title: 'Intermediate',
    description: 'Practical applications and real-world scenarios',
    gradientColor: 'from-blue-500 to-indigo-600',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    shadowColor: 'shadow-blue-200',
  },
  {
    level: 'advanced' as DifficultyLevel,
    icon: Award,
    title: 'Advanced',
    description: 'Complex problem-solving and expertise',
    gradientColor: 'from-violet-500 to-purple-600',
    iconColor: 'text-violet-600',
    borderColor: 'border-violet-500',
    shadowColor: 'shadow-violet-200',
  },
];

export default function DifficultySelectionPage() {
  const router = useRouter();
  const { setDifficulty, setCareerPath } = useQuizStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [careerPathInput, setCareerPathInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCareers, setFilteredCareers] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleContinue = async () => {
    setError('');

    // Check career path first
    if (!careerPathInput.trim()) {
      setError('Please enter a career path');
      return;
    }

    // Then check difficulty level
    if (!selectedDifficulty) {
      setError(' Please select a difficulty level');
      return;
    }
    
    // Trigger animation
    setIsButtonClicked(true);
    
    // Wait for animation to complete before navigation
    setTimeout(() => {
      setDifficulty(selectedDifficulty);
      setCareerPath(careerPathInput.trim());
      router.push('/quiz');
    }, 1800);
  };

  const handleCareerChange = (value: string) => {
    setCareerPathInput(value);
    setError('');
    
    if (value.trim().length > 0) {
      const filtered = careerOptions.filter(career =>
        career.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCareers(filtered);
      setShowSuggestions(true);
    } else {
      // Show all options when input is empty
      setFilteredCareers(careerOptions);
      setShowSuggestions(true);
    }
  };

  const handleSelectCareer = (career: string) => {
    setCareerPathInput(career);
    setShowSuggestions(false);
    setError('');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl h-full flex flex-col"
      >
        {/* Header - 15% height */}
        <div className="text-center flex-shrink-0" style={{ height: '15%', minHeight: '80px', maxHeight: '120px' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative inline-block h-full flex flex-col justify-center"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 mb-1 sm:mb-1.5 md:mb-2 animate-gradient bg-[length:200%_auto]">
              Start Your Mock Test
            </h1>
            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="h-0.5 sm:h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-full mx-auto"
              style={{ width: '60%', transformOrigin: 'center' }}
            />
            <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 md:mt-2 font-medium">
              Choose your career path and expertise level to begin
            </p>
          </motion.div>
        </div>

        {/* Content Area - 70% height split between two sections */}
        <div className="flex-1 flex flex-col" style={{ height: '70%' }}>
          {/* Career Path Selection - 40% of content area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg md:rounded-xl shadow-lg p-2 sm:p-2.5 md:p-3 mb-2 sm:mb-2.5 md:mb-3"
            style={{ height: '40%', minHeight: '140px' }}
          >
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2">
              1. Career Path <span className="text-red-500">*</span>
            </h2>
            <div className="relative h-[calc(100%-2rem)]">
              <input
                type="text"
                value={careerPathInput}
                onChange={(e) => handleCareerChange(e.target.value)}
                onFocus={() => {
                  if (careerPathInput.trim().length > 0) {
                    const filtered = careerOptions.filter(career =>
                      career.toLowerCase().includes(careerPathInput.toLowerCase())
                    );
                    setFilteredCareers(filtered);
                  } else {
                    setFilteredCareers(careerOptions);
                  }
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder="Type your career path (e.g., Software Development, Data Science)"
                className="w-full px-2.5 sm:px-3 md:px-3.5 py-1.5 sm:py-2 md:py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700 bg-white text-xs sm:text-sm md:text-base"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && filteredCareers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-y-auto"
                  style={{ maxHeight: '150px' }}
                >
                  {filteredCareers.map((career, index) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectCareer(career);
                      }}
                      className="w-full text-left px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 hover:bg-blue-50 transition-colors text-gray-700 text-xs sm:text-sm md:text-base border-b border-gray-100 last:border-b-0 cursor-pointer"
                    >
                      {career}
                    </button>
                  ))}
                </motion.div>
              )}
              
              {/* Helper text */}
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-1.5">
                Start typing to see suggestions, or enter your own career path
              </p>
            </div>
          </motion.div>

          {/* Difficulty Selection - 60% of content area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg md:rounded-xl shadow-lg p-2 sm:p-2.5 md:p-3 flex flex-col"
            style={{ height: '60%', minHeight: '200px' }}
          >
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2 md:mb-2.5 flex-shrink-0">
              2. Select Your Expertise <span className="text-red-500">*</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 flex-1">
            {difficultyOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selectedDifficulty === option.level;

              return (
                <motion.button
                  key={option.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => setSelectedDifficulty(option.level)}
                  className={`relative p-2.5 sm:p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 group ${
                    isSelected
                      ? `${option.borderColor} bg-white shadow-lg scale-[1.02]`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Unique Icon Design - Hexagon with Gradient Border */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-1.5 sm:mb-2 md:mb-2.5">
                    {/* Outer Hexagon Border */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isSelected ? 'scale-110 rotate-12' : 'group-hover:scale-105 group-hover:rotate-6'
                    }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                      }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${option.gradientColor} opacity-20`} />
                    </div>
                    
                    {/* Middle Hexagon */}
                    <div className={`absolute inset-[3px] bg-white transition-all duration-300 ${
                      isSelected ? 'scale-110 rotate-12' : 'group-hover:scale-105 group-hover:rotate-6'
                    }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                      }}
                    />
                    
                    {/* Inner Hexagon Border */}
                    <div className={`absolute inset-[6px] transition-all duration-300 ${
                      isSelected ? 'scale-110 rotate-12' : 'group-hover:scale-105 group-hover:rotate-6'
                    }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                      }}
                    >
                      <div className={`w-full h-full border-2 ${option.borderColor} bg-gradient-to-br ${option.gradientColor} opacity-10`}
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                      />
                    </div>
                    
                    {/* Icon */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      isSelected ? 'scale-110 rotate-12' : 'group-hover:scale-105 group-hover:rotate-6'
                    }`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 ${option.iconColor} transition-all duration-300`} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-1 sm:mb-1.5 md:mb-2">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                    {option.description}
                  </p>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className={`absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gradient-to-br ${option.gradientColor} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
            </div>
          </motion.div>
        </div>

        {/* Continue Button - 15% height */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-2 flex-shrink-0"
          style={{ height: '15%', minHeight: '80px', maxHeight: '120px' }}
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 font-medium text-xs sm:text-sm md:text-base"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            onClick={handleContinue}
            disabled={isButtonClicked}
            className="relative px-8 py-2 sm:px-10 sm:py-2.5 md:px-12 md:py-3 lg:py-3.5 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl hover:scale-105 overflow-hidden disabled:opacity-90 disabled:cursor-wait"
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="relative z-10 inline-flex items-center gap-2"
              animate={isButtonClicked ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Continue
            </motion.span>
            
            {/* Animated Arrow with Glow Effect */}
            <AnimatePresence>
              {isButtonClicked && (
                <>
                  {/* Glow effect */}
                  <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ 
                      x: '120%', 
                      opacity: [0, 0.2, 0.4, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{ filter: 'blur(12px)' }}
                  />
                  
                  {/* Arrow Icon */}
                  <motion.div
                    initial={{ x: '-150%', opacity: 0, scale: 0.3 }}
                    animate={{ 
                      x: '150%', 
                      opacity: [0, 1, 1, 1, 0.8, 0],
                      scale: [0.3, 0.8, 1, 1.1, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <ArrowRight className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-lg" strokeWidth={3} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
