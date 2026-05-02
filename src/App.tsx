import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, Instagram, Facebook, Mail, Phone, Send, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { ARTWORKS, NAV_LINKS } from './constants';
import { SafeImage } from './components/SafeImage';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const instagramUrl = "https://www.instagram.com/mural_dhara/";
  const whatsappNumber = "917907792467"
  const logoUrl = "//i.ibb.co/hFKpty9W/3213.png"
  const artistProfileUrl = "//i.ibb.co/Wpk6wbZ0/ammu.png";
  const heroArtUrl = "//i.ibb.co/qqJbrLD/Whats-App-Image-2026-05-01-at-1-16-56-PM-1.jpg";
  const [selectedArt, setSelectedArt] = useState<typeof ARTWORKS[0] | null>(null);
  const [isConsultFormOpen, setIsConsultFormOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("https://soundcloud.com/sreenath-narayan/meditation-flute.mp3"));

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play blocked", err));
    }
    setIsPlaying(!isPlaying);
  };

  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mugY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedArt || isConsultFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedArt, isConsultFormOpen]);

  return (
    <div className="min-h-screen bg-canvas-texture selection:bg-brand-pink/30 selection:text-brand-dark relative overflow-x-hidden">
      {/* Noise Overlay for texture */}
      <div className="canvas-overlay" />
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-brand-cream/80 backdrop-blur-lg py-2 md:py-4 shadow-sm' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-brand-dark">
          <a href="#home" className="flex items-center gap-3 group">
            <SafeImage 
              src={logoUrl} 
              alt="Logo" 
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-12 md:h-24' : 'h-16 md:h-42'}`} 
            />
            <span className="font-roboto text-[10px] font-bold tracking-[0.4em] uppercase hidden sm:block opacity-60">MURAL DHARA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="px-4 py-2 border-2 border-brand-dark/10 rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-brand-pink hover:text-white hover:border-brand-pink"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-brand-dark" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full mt-4 left-6 right-6 bg-brand-dark text-brand-cream rounded-3xl p-10 flex flex-col items-center gap-8 shadow-2xl md:hidden z-50"
            >
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-4 border-2 border-white/10 rounded-2xl text-xl font-serif text-white/80 transition-all duration-300 hover:bg-brand-pink hover:text-white hover:border-brand-pink"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                className="w-full text-center bg-brand-pink py-4 rounded-2xl text-sm font-bold tracking-widest uppercase"
              >
                WhatsApp Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative">
        {/* Subtle texture overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        {/* Hero Section */}
        <section 
          id="home" 
          ref={heroRef}
          className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-20"
        >
          <div className="absolute inset-0 z-0 bg-brand-cream" />
          
          {/* Animated Background Elements - Refined with Parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[blobY1, blobY2, blobY3].map((yOffset, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05],
                  x: [0, 50, 0],
                }}
                transition={{ duration: 20 + i * 5, repeat: Infinity }}
                className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
                style={{
                  y: yOffset,
                  backgroundColor: ['#e91e63', '#c5a059', '#f27d26'][i],
                  left: `${-10 + i * 40}%`,
                  top: `${-10 + i * 20}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <motion.div
                style={{ y: textY }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-brand-pink/30" />
                  <span className="text-brand-pink font-bold uppercase tracking-[0.6em] text-[10px]">
                    Kerala Mural & Acrylic Art
                  </span>
                </div>
                
                <h1 className="text-[10vw] lg:text-[6.5vw] font-black leading-[1.2] tracking-tighter text-brand-dark mb-12">
                   <div className="overflow-hidden py-1">
                     <motion.span 
                       initial={{ y: "100%" }}
                       animate={{ y: 0 }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       className="block uppercase"
                     >
                       Every Wall
                     </motion.span>
                   </div>
                   <div className="overflow-hidden flex items-center gap-6 py-1">
                     <motion.span 
                       initial={{ y: "100%" }}
                       animate={{ y: 0 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="block italic font-normal serif text-brand-pink"
                     >
                       Has a Story
                     </motion.span>
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 flex-grow bg-brand-dark/5 rounded-full overflow-hidden hidden md:block"
                     />
                   </div>
                   <div className="overflow-hidden py-1">
                     <motion.span 
                       initial={{ y: "100%" }}
                       animate={{ y: 0 }}
                       transition={{ duration: 0.8, delay: 0.4 }}
                       className="block uppercase"
                     >
                       Let's Paint Yours
                     </motion.span>
                   </div>
                </h1>
                
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                   <p className="max-w-xs text-sm text-brand-dark/60 font-medium leading-relaxed tracking-tight">
                     I design and paint bespoke murals tailored to your space. My work adds character, depth, and personality to any environment. Transform your walls into art that feels uniquely yours.
                   </p>
                   <div className="flex gap-4">
                     <button 
                       onClick={() => setIsConsultFormOpen(true)}
                       className="group relative px-10 py-5 bg-brand-pink text-white rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                     >
                       <motion.span 
                         animate={{ 
                           textShadow: [
                             "0 0 4px #fff, 0 0 8px #fff",
                             "0 0 2px #fff, 0 0 4px #fff",
                             "0 0 4px #fff, 0 0 8px #fff",
                             "0 0 1px #fff, 0 0 2px #fff",
                             "0 0 4px #fff, 0 0 8px #fff"
                           ],
                           opacity: [1, 0.9, 1, 0.8, 1]
                         }}
                         transition={{ 
                           duration: 3, 
                           repeat: Infinity, 
                           times: [0, 0.1, 0.2, 0.3, 1],
                           ease: "easeInOut" 
                         }}
                         className="text-[11px] font-black uppercase tracking-[0.4em]"
                       >
                         Consult now
                       </motion.span>
                     </button>
                   </div>
                </div>
              </motion.div>

            {/* Interactive Hero Animation with Levitating Brushes */}
            <motion.div 
              style={{ y: mugY }}
              className="relative flex items-center justify-center pt-10 perspective-1000"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full max-w-md h-[600px] flex items-center justify-center"
              >
                {/* The Mug & Brushes (Main Focus) */}
                <div className="relative z-20 mt-20 group scale-110">
                  {/* Floating brushes */}
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, x: 0, rotate: i * 15 - 45 }}
                      animate={{ 
                        y: [-20 - i*5, -50 - i*10, -20 - i*5],
                        rotate: [i * 15 - 45, i * 15 - 40, i * 15 - 45],
                        x: [0, (i - 3) * 8, 0]
                      }}
                      transition={{ 
                        duration: 5 + i * 0.7, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                      className="absolute bottom-32 left-1/2 -translate-x-1/2 w-3 z-10 origin-bottom"
                      style={{ 
                        height: `${160 + i * 12}px`,
                      }}
                    >
                      {/* Brush Handle */}
                      <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-full shadow-[2px_0_5px_rgba(0,0,0,0.3)]" 
                           style={{ backgroundColor: ['#2c1810', '#1a1a1a', '#4a3728'][i % 3] }} />
                      
                      {/* Ferrule (Metal part) */}
                      <div className="absolute -top-1 w-[120%] -left-[10%] h-12 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-sm shadow-sm z-20 flex flex-col justify-around py-1">
                         <div className="w-full h-[1px] bg-gray-400/50" />
                         <div className="w-full h-[1px] bg-gray-400/50" />
                      </div>

                      {/* Brush Head (The bristles) */}
                      <motion.div 
                        animate={{ scaleY: [1, 1.05, 1], rotate: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-6 h-10 z-30"
                      >
                         <div className="w-full h-full bg-[#8b4513] rounded-t-full relative overflow-hidden"
                              style={{ 
                                background: `linear-gradient(to top, #5d2906 0%, #8b4513 40%, #c19a6b 100%)`,
                                clipPath: 'polygon(20% 100%, 0% 20%, 30% 0%, 70% 0%, 100% 20%, 80% 100%)'
                              }}>
                            {/* Bristle lines */}
                            <div className="absolute inset-0 opacity-30 flex justify-between px-[1px]">
                               {[...Array(5)].map((_, j) => <div key={j} className="w-[1px] h-full bg-black/40" />)}
                            </div>
                            {/* Paint tip */}
                            <div className="absolute top-0 left-0 right-0 h-1/2 opacity-80" 
                                 style={{ backgroundColor: ['#e91e63', '#c5a059', '#2196f3', '#4caf50'][i % 4], filter: 'blur(2px)' }} />
                         </div>
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* The Mug Handle */}
                  <div className="absolute top-10 -right-8 w-16 h-24 border-[12px] border-white/90 rounded-[3rem] z-0 shadow-[-5px_5px_15px_rgba(0,0,0,0.05)]" />

                  {/* The Mug Body */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-44 h-52 bg-gradient-to-br from-white via-[#fcfcfc] to-[#e0e0e0] rounded-t-3xl rounded-b-[4.5rem] border-x-[1px] border-t-[1px] border-gray-200 shadow-[-20px_40px_60px_-10px_rgba(0,0,0,0.15)] flex flex-col justify-end p-6 overflow-hidden z-20"
                  >
                    {/* Painted Texture/Patina on Mug */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                    {/* Paint stains/drips on mug exterior (visual decor) */}
                    <div className="absolute top-10 left-4 w-2 h-8 bg-brand-pink/20 rounded-full blur-[1px]" />
                    <div className="absolute top-20 right-10 w-3 h-3 bg-brand-gold/30 rounded-full blur-[1px]" />

                    {/* Glossy Reflection Line */}
                    <div className="absolute top-0 left-8 w-2 h-full bg-white opacity-40 blur-sm transform -skew-x-12 z-10" />
                    <div className="absolute top-0 left-12 w-1 h-full bg-white opacity-20 blur-[1px] transform -skew-x-12 z-10" />
                    
                    {/* Liquid/Paint inside the mug */}
                    <motion.div 
                      animate={{ height: ['40%', '42%', '40%'], scaleX: [1, 1.02, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-dark/5 to-transparent z-0" 
                    />
                    
                    <div className="relative z-10 flex flex-col items-center pb-4">
                       <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 0.15 }}
                         className="w-28 opacity-20 filter grayscale contrast-125"
                       >
                         <SafeImage src={logoUrl} alt="Mug Brand" className="w-full h-auto object-contain" />
                       </motion.div>
                       <div className="w-16 h-[1px] bg-brand-dark/5 rounded-full mt-6 mb-6" />
                    </div>
                  </motion.div>

                  {/* Ground Shadow - Multi-layered for realism */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-6 bg-brand-dark/[0.04] blur-2xl rounded-full scale-110" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-3 bg-brand-dark/[0.07] blur-lg rounded-full" />
                </div>

                {/* Levitating Paint Droplets */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [-20, -60, -20],
                      x: [(i - 2) * 50, (i - 2) * 60, (i - 2) * 50],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute w-3 h-3 rounded-full blur-[2px]"
                    style={{ 
                      backgroundColor: ['#e91e63', '#c5a059', '#f27d26', '#e91e63'][i],
                      top: '40%',
                      left: '50%'
                    }}
                  />
                ))}

              </motion.div>
            </motion.div>
          </div>
        </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-brand-dark/20 uppercase text-[8px] font-bold tracking-[0.5em]">
            <span>Scroll to Discover</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-12 bg-gradient-to-b from-brand-dark/20 to-transparent" 
            />
          </div>
        </section>

        {/* Art Gallery - Staggered Bento Grid */}
        <section id="portfolio" className="py-40 bg-brand-cream relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_0.5fr] items-end gap-20 mb-32">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-px bg-brand-pink" />
                    <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px]">Collection</span>
                 </div>
                 <h2 className="text-6xl md:text-[6vw] font-black leading-[0.9] tracking-tighter">Visions of the Ancient Soul</h2>
              </div>
              <p className="text-lg text-brand-dark/50 font-light italic border-l border-brand-dark/10 pl-10">Discover works that breathe life into space through the language of colors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
              {ARTWORKS.map((art, index) => {
                // Custom perfectly balanced pattern for 7 items
                const layoutConfig = [
                  { span: 'md:col-span-8', aspect: 'aspect-[16/9]' },
                  { span: 'md:col-span-4', aspect: 'aspect-[3/4]' },
                  { span: 'md:col-span-4', aspect: 'aspect-[3/4]' },
                  { span: 'md:col-span-4', aspect: 'aspect-[3/4]' },
                  { span: 'md:col-span-4', aspect: 'aspect-[3/4]' },
                  { span: 'md:col-span-8', aspect: 'aspect-[21/9] md:aspect-[16/9]' },
                  { span: 'md:col-span-12 lg:col-span-4', aspect: 'aspect-[16/9] lg:aspect-[3/4]' }
                ];
                
                const { span, aspect } = layoutConfig[index] || { span: 'md:col-span-4', aspect: 'aspect-[3/4]' };

                return (
                  <motion.div
                    key={art.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`${span} group cursor-pointer`}
                    onClick={() => setSelectedArt(art)}
                  >
                    <div className="relative mb-8 overflow-hidden rounded-[2.5rem] shadow-xl transform transition-all duration-1000 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.35)]">
                      <div className={`relative ${aspect} overflow-hidden`}>
                        <SafeImage 
                          src={art.src} 
                          alt={art.title} 
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/60 transition-all duration-700 backdrop-blur-0 group-hover:backdrop-blur-sm flex flex-col justify-end p-12 text-white opacity-0 group-hover:opacity-100">
                           <p className="text-[10px] uppercase tracking-[0.5em] mb-4 text-brand-gold font-bold">{art.type}</p>
                           <h3 className="text-5xl serif italic mb-6 leading-tight">{art.title}</h3>
                           <p className="text-sm font-light opacity-80 leading-relaxed max-w-md translate-y-8 group-hover:translate-y-0 transition-transform duration-700">{art.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start px-4">
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight">{art.title}</h4>
                        <div className="flex items-center gap-3 mt-2">
                           <div className="w-6 h-px bg-brand-dark/10" />
                           <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-brand-dark/40">{art.type}</p>
                        </div>
                      </div>
                      <a href={`https://wa.me/${whatsappNumber}`} className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all duration-500 transform hover:rotate-45">
                         <Send size={18} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-brand-cream relative">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px]" />
                <motion.div 
                  initial={{ opacity: 0, rotate: -5 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10 aspect-[4/5]"
                >
                  <SafeImage src={artistProfileUrl} alt="Artist Profile" className="w-full h-full object-cover" />
                </motion.div>
                <div className="absolute -bottom-8 -right-8 bg-brand-dark text-brand-cream p-10 rounded-[2.5rem] shadow-2xl max-w-[240px] z-20">
                   <p className="text-4xl font-serif italic text-brand-gold mb-2 leading-tight">Aswathi Narayanan</p>
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Crafting identity since 2014</p>
                </div>
             </div>

             <div>
                <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">My Story</span>
                <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-[1.1] italic">From Biotechnologist <br />to Artist.</h2>
                <div className="space-y-8 text-lg font-light text-brand-dark/70 leading-relaxed">
                  <p>
                    A Biotech postgraduate had a dream from childhood to make life in strokes and was creating paths to be an artist. The Journey began in the world of science, where I studied biotechnology and learned to see life through structure, detail, and precision. While I appreciated the discipline it gave me, my heart was always drawn toward colors, creativity, and self-expression.
                  </p>
                  <p>
                    Today, through Mural Dhara, I transform walls into meaningful pieces of art that reflect stories, emotions, and individuality. I create murals that bring life, emotion, and meaning to every space!
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-12 mt-16 pt-12 border-t border-brand-dark/10">
                   <div className="space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-widest">Handmade</h4>
                      <p className="text-xs text-brand-dark/40 italic">Authentic techniques and hand-stretched canvases</p>
                   </div>
                   <div className="space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-widest">Custom-fit</h4>
                      <p className="text-xs text-brand-dark/40 italic">Commissioned scales from miniatures to wall murals</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Instagram Feed Simulation Section */}
        <section className="py-32 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Follow the Journey</span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-6">Latest from Instagram</h2>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-pink transition-colors group"
              >
                <Instagram size={20} />
                <span className="font-bold uppercase tracking-widest text-xs">@mural_dhara</span>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {ARTWORKS.slice(0, 4).map((art, idx) => (
                <motion.a
                  key={art.id}
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-square overflow-hidden rounded-2xl group shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <SafeImage 
                    src={art.src} 
                    alt="Instagram Post" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-4">
                     <div className="flex items-center gap-1">
                        <Instagram size={16} />
                        <span className="text-xs font-bold font-sans">View</span>
                     </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <p className="text-brand-dark/40 text-xs italic font-light mb-8 max-w-lg mx-auto">
                 "Direct API integration for dynamic feeds requires a Meta Developer Token. For now, enjoy these highlights of my latest work."
               </p>
               <a 
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block border border-brand-dark/10 text-brand-dark px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-all"
               >
                 View All Posts
               </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-brand-dark text-white relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-24">
             <div>
                <h2 className="text-6xl md:text-9xl font-bold mb-10 leading-[0.9] italic">Let's Paint <br />New Stories.</h2>
                <p className="text-xl text-white/50 mb-16 font-light max-w-md">
                   Interested in a custom piece or a large-scale mural project? Let's discuss your vision.
                </p>
                
                <div className="grid gap-12">
                   <div className="flex items-center gap-8 group">
                      <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-pink group-hover:text-white transition-all duration-500">
                         <Mail size={28} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-2">Direct Inquiry</p>
                         <p className="text-xl font-medium tracking-tight">aswathikk1968@gmail.com</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-8 group">
                      <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-pink group-hover:text-white transition-all duration-500">
                         <Phone size={28} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-2">Studio Line</p>
                         <p className="text-xl font-medium tracking-tight">+91 7907792467</p>
                      </div>
                   </div>
                </div>

                <div className="mt-24 flex gap-6">
                   <a href={instagramUrl} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all duration-500">
                      <Instagram size={24} />
                   </a>
                </div>
             </div>

             <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-brand-pink/30 shadow-2xl">
                <form action="https://formspree.io/f/mpqbwgeo" method="POST" className="grid gap-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Your Name</label>
                         <input name="name" required type="text" className="w-full bg-transparent border-b border-brand-pink/30 py-4 outline-none focus:border-brand-pink transition-colors font-light text-lg" placeholder="Adithya V." />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Email Address</label>
                         <input name="email" required type="email" className="w-full bg-transparent border-b border-brand-pink/30 py-4 outline-none focus:border-brand-pink transition-colors font-light text-lg" placeholder="hello@example.com" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Interest</label>
                      <select name="interest" className="w-full bg-transparent border-b border-brand-pink/30 py-4 outline-none focus:border-brand-pink transition-colors font-light text-lg appearance-none">
                         <option className="bg-brand-dark">Mural Painting</option>
                         <option className="bg-brand-dark">Acrylic Painting</option>
                         <option className="bg-brand-dark">Customised Caparison (Nettipattom)</option>
                         <option className="bg-brand-dark">Fabric Painting</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Project Vision</label>
                      <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-brand-pink/30 py-4 outline-none focus:border-brand-pink transition-colors font-light text-lg resize-none" placeholder="Share your thoughts..."></textarea>
                   </div>
                   <button type="submit" className="bg-brand-pink py-6 rounded-3xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-brand-pink/80 transition-all flex items-center justify-center gap-3 mt-4 group">
                      Initialize Project
                      <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>

                   {/* Upcoming / In Progress Preview */}
                   <div className="mt-12 pt-8 border-t border-brand-pink/10">
                      <div className="flex items-center gap-6 group/wip">
                         <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-brand-pink/20">
                            <SafeImage 
                               src="//i.ibb.co/fz5zQMTL/Screenshot-2026-04-30-at-8-00-44-PM-2.png" 
                               alt="In Progress"
                               className="w-full h-full object-cover grayscale-[0.8] group-hover/wip:grayscale-0 group-hover/wip:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center opacity-0 group-hover/wip:opacity-100 transition-opacity">
                               <span className="text-[8px] font-black text-white uppercase tracking-widest bg-brand-pink/80 px-2 py-1 rounded-sm">WIP</span>
                            </div>
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                               <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse shadow-[0_0_8px_rgba(233,30,99,0.8)]"></span>
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-pink">In the Workshop</span>
                            </div>
                            <h4 className="text-white text-lg font-serif italic mb-1">Mural Series : V</h4>
                            <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-[0.1em] font-medium">Refining the intricate lattice work for a private estate commission. Launching Late 2026.</p>
                         </div>
                      </div>
                   </div>
                </form>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-brand-dark/5 pt-12">
           <div className="flex items-center gap-3">
              <SafeImage src={logoUrl} alt="Logo" className="h-8 w-auto" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 italic">Mural Dhara Artistry</p>
           </div>
           <div className="flex gap-10">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30 hover:text-brand-pink transition-colors">Instagram</a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30 hover:text-brand-pink transition-colors">WhatsApp</a>
           </div>
           <p className="text-[10px] font-bold tracking-widest text-brand-dark/20 uppercase">© 2026 Crafted with Soul</p>
        </div>
      </footer>

      {/* Audio Toggle Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleAudio}
        className="fixed bottom-8 left-8 z-[100] w-14 h-14 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-2xl hover:bg-brand-pink transition-all group"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Volume2 size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <VolumeX size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle pulse animation when playing */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-brand-pink -z-10"
          />
        )}
      </motion.button>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isConsultFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConsultFormOpen(false)}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-brand-dark/40"
          >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-brand-pink/30 shadow-2xl p-8 md:p-12 overflow-hidden"
              >
                {/* Decorative light elements */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none" />
                
                <button 
                  onClick={() => setIsConsultFormOpen(false)}
                  className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-brand-pink text-white flex items-center justify-center transition-all duration-300 border border-white/10"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10 text-center mb-10">
                  <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Personal Consultation</span>
                  <h3 className="text-4xl serif italic text-white leading-tight">Begin Your Art Journey</h3>
                  <p className="text-white/60 text-sm mt-4 font-light italic">Fill in the details below, and let's discuss your vision.</p>
                </div>

                <form action="https://formspree.io/f/mpqbwgeo" method="POST" className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 block ml-2">Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="E.g. Adithya V."
                      className="w-full bg-white/5 border border-brand-pink/20 rounded-2xl px-6 py-4 outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-white font-light text-base placeholder:text-white/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 block ml-2">Contact Number</label>
                      <input 
                        name="phone"
                        type="tel" 
                        required
                        placeholder="+91..."
                        className="w-full bg-white/5 border border-brand-pink/20 rounded-2xl px-6 py-4 outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-white font-light text-base placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 block ml-2">Place</label>
                      <input 
                        name="place"
                        type="text" 
                        required
                        placeholder="City/Region"
                        className="w-full bg-white/5 border border-brand-pink/20 rounded-2xl px-6 py-4 outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-white font-light text-base placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 block ml-2">Message</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project vision..."
                      className="w-full bg-white/5 border border-brand-pink/20 rounded-2xl px-6 py-4 outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-white font-light text-base placeholder:text-white/20 resize-none"
                    ></textarea>
                  </div>
                
                <button 
                  type="submit"
                  className="w-full bg-brand-pink text-white py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-brand-pink/80 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(233,30,99,0.3)] mt-4 group"
                >
                  Send Enquiry
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArt(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl bg-brand-dark/20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-auto max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedArt(null)}
                className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-brand-dark hover:bg-brand-pink text-white flex items-center justify-center transition-all duration-500 shadow-xl"
              >
                <X size={24} />
              </button>

              <div className="md:w-2/3 h-[50vh] md:h-auto overflow-hidden bg-brand-cream relative group">
                <SafeImage src={selectedArt.src} alt={selectedArt.title} className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="md:w-1/3 p-10 md:p-16 flex flex-col justify-center bg-white">
                <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Artwork Spotlight</span>
                <h3 className="text-4xl md:text-5xl serif italic text-brand-dark leading-tight mb-6">{selectedArt.title}</h3>
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-8 h-px bg-brand-dark/20" />
                   <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-dark/40">{selectedArt.type}</p>
                </div>
                <p className="text-lg text-brand-dark/60 font-light leading-relaxed mb-12 italic">
                  {selectedArt.description}
                </p>
                
                <div className="mt-auto space-y-4">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=I am interested in "${selectedArt.title}"`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-brand-dark text-brand-cream py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-brand-pink transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    Inquire via WhatsApp
                    <MessageCircle size={16} />
                  </a>
                  <button 
                    onClick={() => setSelectedArt(null)}
                    className="w-full border border-brand-dark/10 py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] text-brand-dark/40 hover:bg-brand-dark hover:text-white transition-all"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp CTA */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        whileHover={{ scale: 1.1, translateY: -5 }}
        className="fixed bottom-10 right-10 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl flex items-center justify-center"
      >
        <MessageCircle size={32} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-3 -left-3 bg-brand-pink text-white text-[8px] font-bold px-3 py-1 rounded-full shadow-lg"
        >
          WHATSAPP
        </motion.div>
      </motion.a>
    </div>
  );
}
