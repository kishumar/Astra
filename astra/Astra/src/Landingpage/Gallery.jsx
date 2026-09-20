import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart, Share2, Shield, Eye, AlertTriangle } from 'lucide-react';

// ---  UI Components ---
const Card = ({ children, className }) => (
  <div className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`px-6 pt-6 ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-bold text-gray-900 leading-tight ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-600 leading-relaxed ${className}`}>{children}</p>
);

const Button = ({ children, variant = "default", size = "md", className, ...props }) => {
  let base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]";
 let variants = {
  default: "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl",
  outline: "border-2 border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600",
  ghost: "bg-transparent hover:bg-white/20 text-gray-700 hover:text-gray-900",
};
  let sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2.5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className, icon: Icon }) => {
  let variants = {
    default: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md",
    secondary: "bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border border-gray-200",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md",
    warning: "bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md",
  };
  return (
    <span className={`${variants[variant]} ${className} flex items-center gap-1`}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
};

// ---  Astra Carousel Component ---
const AstraCarousel = ({
  items = [
    {
      id: 1,
      title: "Civic Infrastructure Issues",
      description: "Report potholes, broken streetlights, water leakage, garbage collection problems, and municipal service failures with complete anonymity and GPS location tracking.",
      image: "/images/civic.png",
      category: "Municipal",
      categoryIcon: AlertTriangle,
    
      price: "Free",
      
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Animal Welfare & Cruelty",
      description: "Securely report injured, abandoned, or mistreated animals. Help local authorities and NGOs respond quickly while protecting your identity with advanced encryption.",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=300&fit=crop",
      category: "Animal Rights",
      categoryIcon: Heart,
     
      price: "Free",
      
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Workplace Harassment",
      description: "Confidentially report sexual harassment, discrimination, or hostile work environments. Our secure platform ensures complete anonymity while enabling swift action.",
       image: "https://www.legalbites.in/wp-content/uploads/2018/03/Sexual-Harassment-at-Workplace-concentrate.jpg",
      category: "Workplace Safety",
      categoryIcon: Shield,
      
      price: "Free",
     
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Educational Institution Issues",
      description: "Combat ragging, bullying, academic misconduct, or unfair treatment in schools and colleges. Create safer learning environments for everyone through anonymous reporting.",
        image: "/images/ragging.png",
      category: "Educational Safety",
      categoryIcon: Eye,
     
      price: "Free",
     
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Community Safety & Miscellaneous",
      description: "Report any community concern, environmental hazard, public safety issue, or social problem. Every voice matters in building safer, more responsive communities.",
       image: "/images/otherissue.png",
      category: "Community",
      categoryIcon: Shield,
      
      price: "Free",
      
      color: "from-indigo-500 to-purple-500"
    }
  ],
  autoPlay = true,
  autoPlayInterval = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, isHovered]);

  const getItemPosition = (index) => {
    const total = items.length;
    const pos = (index - currentIndex + total) % total;
    const progress = pos / (total - 1);
    const arcWidth = Math.min(window.innerWidth * 0.85, 1200);
    const arcHeight = window.innerHeight * 0.3;
    const startX = -arcWidth / 2;
    const x = startX + progress * arcWidth;
    const y = -Math.sin(progress * Math.PI) * arcHeight;
    const centerDist = Math.abs(progress - 0.5) * 2;
    const scale = 1 - centerDist * 0.3;
    const opacity = 1 - centerDist * 0.4;
    const blur = centerDist * 2;
    return { x, y, scale, opacity, blur };
  };

  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12" id="gallery">
 {/* Background Image */}
<div className="absolute inset-0 z-0">
  <img 
    src="/images/bg1.jpeg" 
    alt="Background" 
    className="w-full h-full object-cover opacity-60"
  />
          {/* <div className="absolute inset-0 bg-gray-900/40" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80  to-black/60" />
</div>

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-45 h-45 bg-red-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-45 h-45 bg-pink-400 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
          
           <h1 className="relative text-6xl font-black text-white/98 bg-clip-text ">
  <span className="absolute -top-10 -left-6 text-red-400 text-8xl font-extrabold select-none">“</span>
  Report Anonymously <br /> from anywhere
  <span className="absolute -bottom-10 -right-6 text-pink-400 text-8xl font-extrabold select-none">”</span>
</h1>

         
          </div>

         
        </motion.div>

        {/* Enhanced Carousel */}
       <div 
          className="relative w-full flex items-center justify-center top-[180px]"
          style={{ height: '500px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-7xl flex items-center justify-center">
    {items.map((item, index) => {
      const pos = getItemPosition(index);
      const isCenter = index === currentIndex;

      return (
        <motion.div
          key={item.id}
          className="absolute cursor-pointer"
          animate={{
            x: pos.x,
            y: pos.y,
            scale: pos.scale,
            opacity: pos.opacity,
            filter: `blur(${pos.blur}px)`
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => goToSlide(index)}
          whileHover={{ 
            scale: pos.scale * 1.05, 
            y: pos.y - 10,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            transition: { duration: 0.3 }
          }}
        >
          <Card className={`w-96 h-[480px] transition-all duration-500 
            ${isCenter 
              ? 'shadow-2xl shadow-indigo-500/25 border-2 border-indigo-200 z-20' 
              : 'shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-indigo-200 z-10'}`}>
            
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="secondary" 
                  icon={item.categoryIcon}
                  className="bg-white/95 backdrop-blur-md shadow-lg"
                >
                  {item.category}
                </Badge>
              </div>

              {/* Price Badge */}
              <div className="absolute bottom-4 right-4">
                <Badge variant="success" className="shadow-lg">
                  {item.price}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <CardHeader className="pb-3">
                      <CardTitle className="mb-3 text-gray-900">{item.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="mb-4 text-base leading-relaxed text-gray-800">
                        {item.description}
                      </CardDescription>
                    </CardContent>
          </Card>
        </motion.div>
      )
    })}
  </div>

  {/* Navigation Buttons */}
  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
    <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide} 
              className="cursor-pointer rounded-full h-14 w-14 border-2 hover:bg-white/95 hover:border-gray-400 shadow-2xl"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide} 
              className="cursor-pointer rounded-full h-14 w-14 border-2 hover:bg-white/95 hover:border-gray-400 shadow-2xl"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
  </div>

  {/* Dots */}
 <div className="absolute bottom-0 flex gap-3 justify-center w-full pb-4">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 shadow-lg ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-white to-gray-200 w-12 h-4 shadow-xl' 
                    : 'bg-white/60 hover:bg-white/80 w-4 h-4'
                }`}
              />
            ))}
          </div>
</div>

      
       

        {/* Enhanced Footer Info */}
       <motion.div 
          className="mt-8 text-center"
        
        >
          <p className="text-white/90 font-semibold text-lg drop-shadow-md">
            Viewing {currentIndex + 1} of {items.length} reporting categories
          </p>
           <p className="text-sm text-white/70 mt-2 drop-shadow-sm font-medium">
            Join thousands making their communities safer and more responsive
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  )
};

export default AstraCarousel;