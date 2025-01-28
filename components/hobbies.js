import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const HobbyCard = ({ hobby, icon, description, details, extraContent, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative">
      {/* Main Card */}
      <motion.div 
        className="relative group cursor-pointer h-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Preserved stacked paper effect */}
        <motion.div 
          className="absolute -bottom-2 left-1 right-1 h-full bg-[#C2C2C2] rounded-2xl"
          style={{ transform: 'rotate(1deg)' }}
        />
        <motion.div 
          className="absolute -bottom-1 left-0.5 right-0.5 h-full bg-[#A3A3A3] rounded-2xl"
          style={{ transform: 'rotate(-0.5deg)' }}
        />

        <motion.div 
          className="
            p-4 sm:p-6 rounded-2xl relative
            bg-[#F5F5F5]
            shadow-lg hover:shadow-2xl
            border border-secondary/30
            transition-all duration-300
            min-h-[180px]
            w-full
            overflow-visible
            flex flex-col
            justify-between
          "
          onClick={() => setIsExpanded(true)}
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
            borderColor: 'rgba(212,175,55,0.6)'
          }}
        >
          {/* Preserved decorative elements */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div
            className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              background: 'radial-gradient(circle at 75% 25%, rgba(212,175,55,0.1) 0%, transparent 60%)',
              clipPath: 'circle(50% at 75% 25%)'
            }}
            initial={false}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 h-full flex flex-col">
            <motion.h3 
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{
                background: 'linear-gradient(to right, #D4AF37, #966F33)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {hobby}
            </motion.h3>
            <p className="text-[#333333]/80">{description}</p>
          </div>

          {/* Expand Indicator */}
          <motion.div 
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2
                       bg-secondary/90 text-white px-4 py-1 rounded-full text-sm
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       z-20"
          >
            Click to view details
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Content Modal - Improved responsive layout */}
            <motion.div
              className={`
                fixed z-[55] 
                ${isMobile 
                  ? 'inset-2' 
                  : type === 'travel' || type === 'games' 
                    ? 'inset-16 sm:inset-24 lg:inset-32' 
                    : 'inset-1/4'
                }
                bg-[#F5F5F5] 
                rounded-xl 
                flex 
                flex-col
                overflow-hidden
              `}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
        {/* Enhanced Background Pattern */}
        <div 
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, rgba(212,175,55,0.03) 25%, transparent 25%),
                    linear-gradient(225deg, rgba(212,175,55,0.03) 25%, transparent 25%),
                    linear-gradient(45deg, rgba(212,175,55,0.03) 25%, transparent 25%),
                    linear-gradient(315deg, rgba(212,175,55,0.03) 25%, transparent 25%),
                    radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 50%),
                    repeating-linear-gradient(45deg, rgba(212,175,55,0.02) 0, rgba(212,175,55,0.02) 1px, transparent 0, transparent 50%)
                  `,
                  backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
                  backgroundSize: '20px 20px, 20px 20px, 20px 20px, 20px 20px, 100% 100%, 10px 10px'
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-4 sm:p-8 overflow-y-auto h-full">
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, #D4AF37, #966F33)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {hobby}
                </motion.h2>

                <div className="space-y-6">
                  {/* Main Description */}
                  <div className="text-[#333333] leading-relaxed text-sm sm:text-base">
                    {details}
                  </div>

                  {/* Conditional Extra Content with improved responsive layout */}
                  {type === 'travel' && (
                    <div className="mt-4 sm:mt-8 space-y-6 sm:space-y-10">
                      {/* Countries Visited */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">
                          Countries Visited So Far
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          {extraContent.places.map((place, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-secondary font-medium mr-4">{index + 1}.</span>
                              <span className="text-[#333333] text-sm sm:text-base">{place}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Airport Visits */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">
                          Transit Experiences
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          {[
                            "Japan (Narita) - ANA",
                            "Turkiye (Istanbul) - Turkish",
                            "Germany (Frankfurt) - Lufthansa"
                          ].map((place, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-secondary font-medium mr-4">{index + 1}.</span>
                              <span className="text-[#333333] text-sm sm:text-base">{place}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Travel Wishlist */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">
                          Travel Wishlist
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          {[
                            "Japan - (Tokyo, Kyoto, Osaka)",
                            "South Korea  - (Seoul, Daegu, Busan)",
                            "China - (Shanghai, Chengdu, Chongqing, Shanxi)",
                            "United Kingdom - (To watch Liverpool play)"
                          ].map((place, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-secondary font-medium mr-4">{index + 1}.</span>
                              <span className="text-[#333333] text-sm sm:text-base">{place}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {type === 'games' && (
                    <div className="mt-4 sm:mt-8">
                      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-8 lg:gap-56">
                        {/* Games Played */}
                        <div className="lg:col-span-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">
                            Games Played So Far:
                          </h3>
                          <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                            {extraContent.games.map((game, index) => (
                              <div 
                                key={index} 
                                className="flex justify-between items-center p-2 hover:bg-black/5 rounded-lg"
                              >
                                <div className="flex items-center flex-1 min-w-0">
                                  <span className="text-secondary font-medium mr-4">{index + 1}.</span>
                                  <span className="text-[#333333] truncate">{game.name}</span>
                                </div>
                                <span className="text-accent font-medium ml-2">{game.rating} / 10</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Wishlist */}
                        <div className="lg:col-span-3">
                          <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">
                            Wishlist:
                          </h3>
                          <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                            {extraContent.wishlist.map((game, index) => (
                              <div 
                                key={index} 
                                className="flex items-center p-2 hover:bg-black/5 rounded-lg"
                              >
                                <span className="text-secondary font-medium mr-4">{index + 1}.</span>
                                <span className="text-[#333333] truncate">{game}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {type === 'projects' && (
                    <div className="mt-4 sm:mt-8 text-center">
                      <Link 
                        href="/experiences" 
                        className="text-secondary hover:text-accent transition-colors duration-300"
                      >
                        Have a look at my projects in detail in the experiences page →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
              >
                <motion.svg 
                  className="w-6 h-6 text-[#333333] hover:text-secondary transition-colors duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};


const Hobbies = () => {
  const hobbies = [
    { 
      hobby: "Soccer", 
      icon: "⚽", 
      description: "I play and watch soccer regularly",
      details: "I used to play soccer 'professionally' in High School having represented my school 3 times and captained the school's U-17 National Squad that won the event held in Jubail, Saudi Arabia. My favourite team is Liverpool, who I have been supporting and watching every week since 2011.",
      type: "soccer"
    },
    { 
      hobby: "Software Projects", 
      icon: "📚",
      description: "I love building unique software experiences",
      details: "My passion for software development extends beyond textbooks. I regularly dive into tech blogs to stay updated with the latest industry trends. I also enjoy exploring scientific literature, particularly in the fields of AI and quantum computing. This habit has broadened my perspective and often inspires new ideas for my projects.",
      type: "projects"
    },
    { 
      hobby: "Traveling", 
      icon: "📷", 
      description: "My dream is to travel the world",
      details: "I love learning new languages and cultures through events, experiences and world travel. \n Each destination offers unique perspectives and enriching experiences that shape my worldview.",
      type: "travel",
      extraContent: {
        places: [
          "United States   -  (Georgia, Tennessee, North Carolina)",
          "India",
          "Saudi Arabia",
          "Kuwait",
          "Canada  -   (Victoria, Vancouver)",
          "United Arab Emirates",
          "Italy   -  (Rome, Florence, Venice, Pisa)",
          "Switzerland   -  (Lucerne, Lausanne, Interlaken, Wengen, Engelberg)",
          "France   -  (Paris, Marseille)",
          "Singapore",
          "Malaysia"
        ]
      }
    },
    { 
      hobby: "Video Games", 
      icon: "🎮", 
      description: "I paid for a full GPU, I will use the full GPU",
      details: "People buy gaming laptops to play high-end games, but I am playing high-end games because I bought a gaming laptop. We&apos;re not the same. But, we do share our love for video games. My childhood was centered around very basic games like FIFA, WWE and Uncharted given limited gaming time, but now that I'm an adult with no one to stop me from playing games, I've decided to explore the world of gaming much deeper from competitive E-sports like Valorant and compelling story-based games like the Metal Gear Series to 'why am I playing this' type RPG games like Elden Ring.",
      type: "games",
      extraContent: {
        games: [
          { name: "Black Myth: Wukong (2024)", rating: 9 },
          { name: "Elden Ring (2022)", rating: 10 },
          { name: "Final Fantasy XVI Remake Integrade (2022)", rating: 6.5},
          { name: "Ghost of Tsushima: Director's Cut (2024)", rating: 9.5 },
          { name: "Resident Evil 4 Remake (2022)", rating: 8 },
          { name: "FIFA 23 (2022)", rating: 8 },
          { name: "Nier: Automata - Game of the YorHa Edition (2017)", rating: 7.5 },
          { name: "Rise of the Tomb Raider (2015)", rating: 8.5 },
          { name: "Hitman 3 (2022)", rating: 8 },
          { name: "Like a Dragon Gaiden: The Man Who Erased His Name (2022)", rating: 7},
          { name: "Metal Gear Solid V: Phantom Pain (2015)", rating: 9 },
          { name: "Metal Gear Solid 4: Guns of the Patriots (2008)", rating: 9.5 },
          { name: "Metal Gear Solid 3: Snake Eater (2004)", rating: 10 },
          { name: "Call of Duty: Black Ops 2 (2012)", rating: 8 },
          { name: "Call of Duty: Black Ops 3 (2015)", rating: 8 },
          { name: "Batman: Arkham City (2011)", rating: 8 },
          { name: "Uncharted: Drake's Fortune (2007)", rating: 8.5 },
          { name: "Uncharted 2: Among Thieves (2009)", rating: 8 },
          { name: "Uncharted 3: Drake's Deception (2011)", rating: 8.5 },
          { name: "Grand Theft Auto V (2013)", rating: 8},
          { name: "Grand Theft Auto 4 (2008)", rating: 8 },
          { name: "Tom Clancy's H.A.W.X (2009)", rating: 7 },
          { name: "WWE: Smackdown vs RAW (2010)", rating: 9.5 },
          { name: "Killzone 3 (2011)", rating: 7.5 },
          { name: "Resistance 3 (2011)", rating: 8.5 },
          { name: "Resistance Fall of Man (2006)", rating: 8.5},
          { name: "MotorStorm (2017)", rating: 8 },
          { name: "Gran Turismo 5 (2010)", rating: 8 },

        ],

        wishlist: [
        "Sekiro: Shadows Die Twice",
        "Dark Souls 3",
        "Cyberpunk 2077",
        "Last of Us Series",
        "God of War: Ragnarok",
        "Detroit: Become Human",
        "Elder Scrolls V: Skyrim",
        "Lies of P",
        "Dying Light Series",
        "Red Dead Redemption 2",
        "Death Stranding"


        ]
      }
    },
  ];

  return (
    <div className="py-16 sm:py-32 bg-background relative overflow-hidden">
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary/15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 70, 0],
              x: [0, 50, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Responsive Section Title */}
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold text-center mb-16 sm:mb-32"
        style={{ fontFamily: 'Kalam, cursive' }}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-primary">Hobbies & Interests</span>
      </motion.h2>

      {/* Responsive Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {hobbies.map((hobby, index) => (
          <HobbyCard
            key={index}
            {...hobby}
          />
        ))}
      </div>

      {/* Enhanced Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(150deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(30deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(150deg, #D4AF37 12%, transparent 12.5%, transparent 87%, #D4AF37 87.5%, #D4AF37),
            linear-gradient(60deg, #D4AF37 25%, transparent 25.5%, transparent 75%, #D4AF37 75%, #D4AF37),
            linear-gradient(60deg, #D4AF37 25%, transparent 25.5%, transparent 75%, #D4AF37 75%, #D4AF37)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}
      />

      {/* Decorative Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};

export default Hobbies;
