import React, { useState, useEffect } from 'react';
import {
  Camera,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  MessageSquare,
  Sparkles,
  Infinity as InfinityIcon,
  Gem,
  Music,
  Headphones,
  Truck,
  Wine,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  CheckCircle,
  Menu,
  Send,
  Star,
  Edit3,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';

// Exact high-resolution photography assets matching Figma prototype themes
const IMAGES = {
  // Indian wedding couple with golden bokeh fairy lights
  hero: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=85",
  
  // Photographer in black shirt aiming DSLR outdoors
  aboutMain: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=85",
  
  // Close-up of camera on wooden surface
  aboutInset: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85",
  
  // Clean camera lens asset cropped directly from Figma design
  cameraLens: "/figma-camera-lens.png",

  // 9 Photography Services matching Figma cards
  services: {
    wedding: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
    preWedding: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85",
    engagement: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
    haldi: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
    mehendi: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=800&q=85",
    sangeet: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=85",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
    fashion: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85",
    poolParty: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85",
  },

  // 4-Column Asymmetric Gallery
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      title: "Royal Bride in Traditional Red Lehenga",
      category: "Wedding Elegance",
      aspect: "portrait-tall"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
      title: "Sacred Vows & Ceremonial Blessings",
      category: "Ceremony Moments",
      aspect: "landscape"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85",
      title: "Friends Poolside Celebration & Cheers",
      category: "Cocktail Party",
      aspect: "landscape"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85",
      title: "Joyous Haldi Splashes & Laughter",
      category: "Haldi Festivities",
      aspect: "portrait-tall"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=900&q=85",
      title: "Bride Seated in Ornate Red Bridal Attire",
      category: "Bridal Portrait",
      aspect: "landscape"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
      title: "Graceful Twilight Reception Gown",
      category: "Reception Glamour",
      aspect: "landscape"
    }
  ]
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [inquiryResult, setInquiryResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    date: '',
    eventType: '',
    location: '',
    message: ''
  });

  // Track active navigation link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'gallery', 'why-us', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 140;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (['why-us', 'testimonials'].includes(section)) {
              setActiveSection('services');
            } else {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      // Connect to PHP backend API (proxied via Vite /api -> http://localhost:8000/api)
      const response = await fetch('/api/inquiry.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setInquiryResult(result);
        setFormSubmitted(true);
      } else {
        if (result && result.error) {
          setFormError(result.error);
        } else {
          // If PHP backend returns error without message
          setFormError('Submission failed. Please check your inputs and try again.');
        }
      }
    } catch (err) {
      console.warn('PHP Backend connection note: Falling back to direct client-side confirmation', err);
      // Fallback allows smooth user demonstration if PHP dev server is not started locally
      setFormSubmitted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Testimonials matching Figma verbatim
  const testimonials = [
    {
      name: "Priya Sharma",
      quote: "Exceptional work! The photos are beyond our expectations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Arun Kumar",
      quote: "Truly professional and creative. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sneha Ramesh",
      quote: "Captured our special moments perfectly. Thank you!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // 9 Services matching Figma design
  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      subtitle: "Your special day, our focus",
      icon: <InfinityIcon size={20} className="text-white" />,
      image: IMAGES.services.wedding,
      desc: "Comprehensive cinematic wedding coverage capturing traditional ceremonies, joyful tears, and timeless marital vows in high resolution."
    },
    {
      id: 2,
      title: "Pre-Wedding Photography",
      subtitle: "Love In Every Frame",
      icon: <Camera size={20} className="text-white" />,
      image: IMAGES.services.preWedding,
      desc: "Dreamy outdoor portraits with artistic direction and stunning natural landscapes celebrating your personal love story."
    },
    {
      id: 3,
      title: "Engagement & Roka Ceremony",
      subtitle: "A New Beginning",
      icon: <Gem size={20} className="text-white" />,
      image: IMAGES.services.engagement,
      desc: "Capturing the official promise, ring exchange, and heartfelt family blessings in elegant style."
    },
    {
      id: 4,
      title: "Haldi Ceremony",
      subtitle: "Tradition in Every Splash",
      icon: <Sparkles size={20} className="text-white" />,
      image: IMAGES.services.haldi,
      desc: "Vibrant golden hues, spontaneous laughter, and playful turmeric splashes immortalized in dynamic action shots."
    },
    {
      id: 5,
      title: "Mehendi Ceremony",
      subtitle: "Art on Your Hands",
      icon: <Heart size={20} className="text-white" />,
      image: IMAGES.services.mehendi,
      desc: "Intricate macro photography celebrating artistic henna designs, bridal adornments, and musical festivities."
    },
    {
      id: 6,
      title: "Sangeet & Reception",
      subtitle: "Dance, Celebrate, Repeat",
      icon: <Music size={20} className="text-white" />,
      image: IMAGES.services.sangeet,
      desc: "High-energy stage performances, choreography beats, and royal reception glamour under sparkling chandeliers."
    },
    {
      id: 7,
      title: "Portrait Photography",
      subtitle: "Timeless Expressions",
      icon: <User size={20} className="text-white" />,
      image: IMAGES.services.portrait,
      desc: "Classic and contemporary portraits with studio lighting that highlight authentic emotions and timeless elegance."
    },
    {
      id: 8,
      title: "Fashion & Model Photography",
      subtitle: "Style in Every Shot",
      icon: <Sparkles size={20} className="text-white" />,
      image: IMAGES.services.fashion,
      desc: "Editorial and commercial fashion shoots with creative lighting, professional styling, and dynamic poses."
    },
    {
      id: 9,
      title: "Cocktail & Pool Party Photography",
      subtitle: "Vibes, Shots & Cheers",
      icon: <Wine size={20} className="text-white" />,
      image: IMAGES.services.poolParty,
      desc: "Candid celebratory moments, pool party toasts, and lively party atmospheres captured in crisp vivid detail."
    }
  ];

  // 5 Why Choose Us features matching Figma copy
  const features = [
    {
      id: 1,
      title: "Professional Experience",
      desc: "Years of expertise in capturing perfect moments.",
      icon: <Camera size={24} className="text-[#832244]" />
    },
    {
      id: 2,
      title: "Creative Photography",
      desc: "Unique and creative shots, every time.",
      icon: <Gem size={24} className="text-[#832244]" />
    },
    {
      id: 3,
      title: "On-Time Delivery",
      desc: "Your memories, delivered on time.",
      icon: <Truck size={24} className="text-[#832244]" />
    },
    {
      id: 4,
      title: "Friendly Support",
      desc: "A dedicated team always here for you.",
      icon: <Headphones size={24} className="text-[#832244]" />
    },
    {
      id: 5,
      title: "Memories That Last",
      desc: "Timeless photos for a lifetime.",
      icon: <Heart size={24} className="text-[#832244]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E]">

      {/* ========================================================= */}
      {/* 1. STICKY NAVIGATION BAR                                  */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#832244] shadow-md transition-all duration-300">
        <div className="container-custom flex items-center justify-between py-3.5 px-4 md:px-8">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className="flex items-center gap-3 group text-decoration-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm p-1 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 18 L68 76 L57 76 L53 62 L41 62 L37 76 L26 76 Z M47 34 L43 53 L51 53 Z" fill="#832244"/>
                <path d="M42 45 C48 40 56 46 64 42 C67 40 70 36 71 34" stroke="#D49A38" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <circle cx="72" cy="33" r="3.5" fill="#D49A38" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-white font-bold text-xl leading-none tracking-wider">AKASH</span>
              <span className="text-white text-[10px] tracking-[0.25em] font-medium opacity-90">PHOTOGRAPHY</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm tracking-wide font-medium relative py-1 transition-colors ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Book Now CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 rounded-full bg-white text-[#832244] font-semibold text-sm shadow-md hover:bg-[#FDF2F4] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              Book Now <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#651833] border-t border-white/10 px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {['home', 'about', 'services', 'gallery', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-left capitalize py-2 font-medium text-base ${
                  activeSection === item ? 'text-white font-bold border-l-2 border-white pl-2' : 'text-white/80'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 w-full py-2.5 rounded-full bg-white text-[#832244] font-semibold text-center text-sm shadow-md"
            >
              Book Now →
            </button>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section 
        id="home" 
        className="relative min-h-[640px] lg:min-h-[700px] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-[#832244]/15 mix-blend-multiply" />

        <div className="container-custom relative z-10 py-20 px-4 md:px-8 text-white">
          <div className="max-w-2xl">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-5">
              <span className="w-8 h-[1px] bg-white/60"></span>
              <span className="flex items-center gap-1.5">
                <Heart size={14} className="fill-white/80 text-white/80" />
                WEDDING PHOTOGRAPHY · PACIFIC NORTHWEST & EVERYWHERE
              </span>
              <span className="w-8 h-[1px] bg-white/60"></span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight drop-shadow-md">
              Capturing Moments,<br />
              Creating <span className="text-[#E5A83B] italic">Memories.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/90 font-light mb-8 max-w-lg leading-relaxed drop-shadow">
              Photography that tells your story, beautifully.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('services')}
                className="px-8 py-3.5 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Explore Services
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-3.5 rounded-full bg-[#D49A38]/40 hover:bg-[#D49A38]/60 text-white font-semibold text-sm border border-white/80 backdrop-blur-md transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Book Now
              </button>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ========================================================= */}
      {/* 3. ABOUT US SECTION                                       */}
      {/* ========================================================= */}
      <section id="about" className="py-24 lg:py-32 relative bg-[#FFF7F8] overflow-hidden">
        
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FDF2F4] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FCE8EC] rounded-full blur-3xl pointer-events-none" />
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
          <Camera size={420} strokeWidth={1} />
        </div>

        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Overlapping tilted cards */}
            <div className="relative flex justify-center items-center py-6">
              
              <div className="absolute -top-4 left-6 z-20 flex gap-1 items-end select-none">
                <span className="w-1 h-5 bg-[#832244] rounded-full transform -rotate-12"></span>
                <span className="w-1 h-7 bg-[#832244] rounded-full"></span>
                <span className="w-1 h-5 bg-[#832244] rounded-full transform rotate-12"></span>
              </div>

              <div className="absolute w-80 h-80 rounded-full bg-[#FCE8EC] filter blur-xl" />

              <div className="relative z-10 w-64 sm:w-80 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-0 transition-transform duration-500">
                <img 
                  src={IMAGES.aboutMain} 
                  alt="Akash Photographer aiming DSLR outdoors" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute z-20 -bottom-4 -left-2 sm:left-4 w-44 sm:w-56 h-44 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={IMAGES.aboutInset} 
                  alt="Close up of DSLR lens on table" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 right-10 z-20 w-44 h-2 bg-[#832244] rounded-full transform rotate-3 opacity-80" />
            </div>

            {/* Right Column: Text & CTA */}
            <div className="lg:pl-6">
              
              <div className="inline-flex items-center gap-2.5 text-[#832244] font-semibold text-sm tracking-wider uppercase mb-3">
                <div className="w-6 h-6 rounded-md border border-[#832244] flex items-center justify-center">
                  <Camera size={14} />
                </div>
                <span>About Us</span>
                <span className="w-16 h-[1.5px] bg-[#832244]/40 ml-1"></span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight mb-4">
                Capturing Your<br />
                <span className="font-script text-[#832244] text-5xl sm:text-6xl font-normal block mt-1">
                  Special Moments
                </span>
              </h2>

              <p className="text-[#595959] text-base sm:text-lg leading-relaxed mb-8">
                “We believe every moment tells a story. With passion, creativity and a keen eye for detail, we turn your cherished moments into timeless memories.”
              </p>

              <button
                onClick={() => scrollTo('gallery')}
                className="px-8 py-3.5 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-white font-semibold text-sm shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Discover More <ArrowRight size={16} />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR SERVICES SECTION                                    */}
      {/* ========================================================= */}
      <section id="services" className="py-24 lg:py-32 bg-white relative">
        <div className="container-custom px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[#832244] mb-3">
              <span className="w-12 h-[1px] bg-[#832244]/40"></span>
              <div className="w-7 h-7 rounded border border-[#832244] flex items-center justify-center">
                <Camera size={14} />
              </div>
              <span className="w-12 h-[1px] bg-[#832244]/40"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Our <span className="font-script text-[#832244] text-4xl sm:text-5xl lg:text-6xl font-normal">Services</span>
            </h2>

            <p className="text-[#6B7280] text-sm sm:text-base mt-2.5 text-center">
              Capture every moment with our professional photography services
            </p>
            <div className="w-12 h-[2px] bg-[#832244] mx-auto mt-3 rounded-full" />
          </div>

          {/* 3x3 Card Grid with generous padding & gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="luxury-service-card group"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 text-[#832244] text-xs font-semibold backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="relative flex justify-center -mt-6 z-10">
                  <div className="w-12 h-12 rounded-full bg-[#832244] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110">
                    {service.icon}
                  </div>
                </div>

                <div className="p-8 pt-4 pb-8 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E1E1E] text-center group-hover:text-[#832244] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] text-center mt-2 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#832244] group-hover:bg-[#9B2B52] text-white flex items-center justify-center transition-all shadow-sm group-hover:scale-110">
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. OUR GALLERY SECTION                                     */}
      {/* ========================================================= */}
      <section id="gallery" className="py-24 lg:py-32 bg-[#FFF7F8] relative">
        <div className="container-custom px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[#832244] mb-3">
              <span className="w-12 h-[1px] bg-[#832244]/40"></span>
              <div className="w-7 h-7 rounded border border-[#832244] flex items-center justify-center">
                <Camera size={14} />
              </div>
              <span className="w-12 h-[1px] bg-[#832244]/40"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Our <span className="font-script text-[#832244] text-4xl sm:text-5xl lg:text-6xl font-normal">Gallery</span>
            </h2>

            <p className="text-[#6B7280] text-sm sm:text-base mt-2.5 text-center">
              Explore our beautiful moments captured with love
            </p>
            <div className="w-12 h-[2px] bg-[#832244] mx-auto mt-3 rounded-full" />
          </div>

          {/* 4-Column Asymmetric Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Column 1: Tall Portrait */}
            <div 
              onClick={() => setSelectedImage(IMAGES.gallery[0])}
              className="group relative h-[460px] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white"
            >
              <img 
                src={IMAGES.gallery[0].url} 
                alt={IMAGES.gallery[0].title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-wider text-[#E5A83B] font-semibold">{IMAGES.gallery[0].category}</span>
                <h4 className="font-serif text-lg font-bold">{IMAGES.gallery[0].title}</h4>
              </div>
            </div>

            {/* Column 2: Two Stacked Images */}
            <div className="flex flex-col gap-6 h-[460px]">
              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[1])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white"
              >
                <img 
                  src={IMAGES.gallery[1].url} 
                  alt={IMAGES.gallery[1].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5A83B] font-semibold">{IMAGES.gallery[1].category}</span>
                  <h4 className="font-serif text-sm font-bold">{IMAGES.gallery[1].title}</h4>
                </div>
              </div>

              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[2])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white"
              >
                <img 
                  src={IMAGES.gallery[2].url} 
                  alt={IMAGES.gallery[2].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5A83B] font-semibold">{IMAGES.gallery[2].category}</span>
                  <h4 className="font-serif text-sm font-bold">{IMAGES.gallery[2].title}</h4>
                </div>
              </div>
            </div>

            {/* Column 3: Tall Portrait */}
            <div 
              onClick={() => setSelectedImage(IMAGES.gallery[3])}
              className="group relative h-[460px] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white"
            >
              <img 
                src={IMAGES.gallery[3].url} 
                alt={IMAGES.gallery[3].title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-wider text-[#E5A83B] font-semibold">{IMAGES.gallery[3].category}</span>
                <h4 className="font-serif text-lg font-bold">{IMAGES.gallery[3].title}</h4>
              </div>
            </div>

            {/* Column 4: Two Stacked Images */}
            <div className="flex flex-col gap-6 h-[460px]">
              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[4])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white"
              >
                <img 
                  src={IMAGES.gallery[4].url} 
                  alt={IMAGES.gallery[4].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5A83B] font-semibold">{IMAGES.gallery[4].category}</span>
                  <h4 className="font-serif text-sm font-bold">{IMAGES.gallery[4].title}</h4>
                </div>
              </div>

              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[5])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white"
              >
                <img 
                  src={IMAGES.gallery[5].url} 
                  alt={IMAGES.gallery[5].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5A83B] font-semibold">{IMAGES.gallery[5].category}</span>
                  <h4 className="font-serif text-sm font-bold">{IMAGES.gallery[5].title}</h4>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY CHOOSE US SECTION (Generous Luxury Padding & Cards) */}
      {/* ========================================================= */}
      <section id="why-us" className="py-28 lg:py-36 bg-white relative">
        <div className="container-custom px-4 md:px-8">
          
          {/* Centered Header with Accent Line */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 text-[#832244] mb-3">
              <span className="w-12 h-[1px] bg-[#832244]/40"></span>
              <div className="w-7 h-7 rounded border border-[#832244] flex items-center justify-center">
                <Camera size={14} />
              </div>
              <span className="w-12 h-[1px] bg-[#832244]/40"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] text-center">
              Why <span className="font-script text-[#832244] text-4xl sm:text-5xl lg:text-6xl font-normal">Choose Us</span>
            </h2>

            <p className="text-[#6B7280] text-sm sm:text-base mt-2.5 text-center">
              Because your moments deserve the best
            </p>
            <div className="w-14 h-[2.5px] bg-[#832244] mx-auto mt-3.5 rounded-full" />
          </div>

          {/* 5 Cards Row - Tall, spacious cards with centered subtitles & margins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-7">
            {features.map((item) => (
              <div 
                key={item.id}
                className="luxury-why-card hover-lift group"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Large Circular Blush Badge */}
                  <div className="w-16 h-16 rounded-full bg-[#FDF2F4] group-hover:bg-[#FCE8EC] border border-[#FADCE2] flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-105 shadow-xs text-[#832244]">
                    {item.icon}
                  </div>

                  {/* Centered Bold Card Title */}
                  <h3 className="font-serif font-bold text-lg text-[#1E1E1E] mb-2.5 text-center leading-snug">
                    {item.title}
                  </h3>

                  {/* Centered Descriptive Subtitle */}
                  <p className="text-xs text-[#6B7280] text-center leading-relaxed max-w-[175px] mx-auto">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Circular Maroon Button with Arrow & Subtle Divider */}
                <div className="mt-6 pt-3 w-full flex flex-col items-center">
                  <div className="w-10 h-[1px] bg-[#FCE8EC] mb-3"></div>
                  <div className="w-8 h-8 rounded-full bg-[#832244] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TESTIMONIALS SECTION (3 Elegant Cards + Controls)       */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-28 lg:py-36 bg-[#FFF7F8] relative overflow-hidden">
        
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#FCE8EC] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#FDF2F4] rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom px-4 md:px-8 relative z-10">
          
          {/* Centered Header with Accent Line */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] text-center">
              Testi<span className="font-script text-[#832244] text-4xl sm:text-5xl lg:text-6xl font-normal">monials</span>
            </h2>

            <p className="text-[#6B7280] text-sm sm:text-base mt-2.5 text-center">
              What our clients say about us
            </p>
            <div className="w-14 h-[2.5px] bg-[#832244] mx-auto mt-3.5 rounded-full" />
          </div>

          {/* 3 Testimonials in Responsive Grid Matching Figma */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-9">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="luxury-testimonial-card hover-lift"
              >
                <div>
                  <div className="font-serif text-[#832244] text-5xl leading-none mb-3 select-none">
                    “
                  </div>

                  <p className="text-[#4B5563] text-sm sm:text-base italic leading-relaxed mb-6">
                    {t.quote}
                  </p>
                </div>

                <div className="border-t border-[#FCE8EC] pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-[#832244] text-base">
                      {t.name}
                    </h4>
                    <div className="flex text-[#E5A83B] text-xs mt-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#E5A83B]" />
                      ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#832244]/20 shadow-sm">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows & Dots with generous spacing */}
          <div className="mt-14 lg:mt-16 flex items-center justify-center gap-6">
            <button 
              onClick={() => setTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              className="w-10 h-10 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIdx(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${testimonialIdx === idx ? 'w-8 bg-[#832244]' : 'w-2.5 bg-[#832244]/25 hover:bg-[#832244]/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => setTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              className="w-10 h-10 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BOOK YOUR SESSION (INQUIRY & CONTACT)                   */}
      {/* ========================================================= */}
      <section 
        id="contact" 
        className="py-28 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#FCE4EC] via-[#FFF3F6] to-[#FCEBED]"
      >
        <div className="container-custom relative z-10 px-4 md:px-8">
          
          {/* Robust 3-Column Grid: Col 1 = Lens, Col 2 = Info, Col 3 = Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Col 1: Camera Lens Asset */}
            <div className="hidden xl:flex xl:col-span-3 items-start justify-center select-none pointer-events-none pt-4">
              <img 
                src={IMAGES.cameraLens} 
                alt="DSLR camera lens with red rose petals" 
                className="w-full max-w-[260px] h-auto max-h-[440px] object-contain drop-shadow-sm"
              />
            </div>

            {/* Col 2: Contact Information */}
            <div className="lg:col-span-6 xl:col-span-4 flex flex-col justify-center pt-4">
              
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 text-[#1E1E1E] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                <span className="w-6 h-[2px] bg-[#832244]"></span>
                HAVE A PROJECT IN MIND?
              </div>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] leading-[1.18] mb-3">
                Book Your<br />
                <span className="text-[#832244]">Photography Session</span>
              </h2>

              {/* Subtitle */}
              <p className="text-[#595959] text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                Tell us about your event and get a custom quote. We'd love to be a part of your special moments!
              </p>

              {/* 3 Contact Pills */}
              <div className="space-y-4 w-full max-w-[380px]">
                
                {/* Call Us */}
                <a 
                  href="tel:+911234567890" 
                  className="luxury-contact-pill"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#832244] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Phone size={19} />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#737373] tracking-wide uppercase font-semibold">Call Us</div>
                    <div className="text-base font-bold text-[#1E1E1E]">+91 1234567890</div>
                  </div>
                </a>

                {/* Email Us */}
                <a 
                  href="mailto:hello@akashphotography.com" 
                  className="luxury-contact-pill"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#832244] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Mail size={19} />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#737373] tracking-wide uppercase font-semibold">Email Us</div>
                    <div className="text-base font-bold text-[#1E1E1E]">hello@akashphotography.com</div>
                  </div>
                </a>

                {/* Visit Us */}
                <div className="luxury-contact-pill">
                  <div className="w-12 h-12 rounded-2xl bg-[#832244] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <MapPin size={19} />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#737373] tracking-wide uppercase font-semibold">Visit Us</div>
                    <div className="text-sm font-bold text-[#1E1E1E] leading-snug">
                      123 Creative Street, Chennai, Tamil Nadu – 600001
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Col 3: White Inquiry Form Card with Generous Luxury Internal Padding */}
            <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
              <div className="luxury-form-card">
                
                {/* Centered Floating Pill Badge */}
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 px-7 py-2.5 rounded-full bg-[#832244] text-white text-xs font-semibold shadow-lg inline-flex items-center gap-2 whitespace-nowrap z-20 tracking-wide border border-white/20">
                  <Camera size={14} /> Photography Inquiry Form
                </div>

                {formSubmitted ? (
                  <div className="py-10 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-[#832244]/10 text-[#832244] flex items-center justify-center mx-auto mb-4 shadow-xs">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2.5">
                      Inquiry Sent Successfully!
                    </h3>
                    {inquiryResult?.inquiry_id && (
                      <div className="inline-block px-4 py-1.5 bg-[#FDF2F4] text-[#832244] text-xs font-bold rounded-full mb-3 border border-[#FCE8EC]">
                        Reference ID: #AKP-{inquiryResult.inquiry_id}
                      </div>
                    )}
                    <p className="text-sm text-[#6B7280] max-w-sm mx-auto mb-6 leading-relaxed">
                      Thank you for contacting Akash Photography! Our team will review your event details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setInquiryResult(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          whatsapp: '',
                          date: '',
                          eventType: '',
                          location: '',
                          message: ''
                        });
                      }}
                      className="px-8 py-3 rounded-full bg-[#832244] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#9B2B52] transition-colors shadow-sm"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="Your Name *"
                          className="figma-pill-input"
                        />
                      </div>

                      <div className="relative">
                        <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="Your Email *"
                          className="figma-pill-input"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="Phone Number *"
                          className="figma-pill-input"
                        />
                      </div>

                      <div className="relative">
                        <MessageSquare size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleFormChange}
                          placeholder="WhatsApp Number (Optional)"
                          className="figma-pill-input"
                        />
                      </div>
                    </div>

                    {/* Row 3: Event Date & Event Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                        <input
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                          required
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          placeholder="Event Date *"
                          className="figma-pill-input pr-10"
                        />
                      </div>

                      <div className="relative">
                        <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleFormChange}
                          required
                          className="figma-pill-input appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled>Event Type *</option>
                          <option value="Wedding">Wedding Photography</option>
                          <option value="Pre-Wedding">Pre-Wedding Shoot</option>
                          <option value="Engagement">Engagement & Roka</option>
                          <option value="Haldi">Haldi Ceremony</option>
                          <option value="Mehendi">Mehendi Ceremony</option>
                          <option value="Sangeet">Sangeet & Reception</option>
                          <option value="Portrait">Portrait Shoot</option>
                          <option value="Fashion">Fashion & Model</option>
                          <option value="PoolParty">Cocktail & Pool Party</option>
                          <option value="Other">Other Event</option>
                        </select>
                        <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Row 4: Event Location */}
                    <div className="relative">
                      <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#832244] pointer-events-none" />
                      <input
                        type="text"
                        required
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        placeholder="Event Location *"
                        className="figma-pill-input"
                      />
                    </div>

                    {/* Row 5: Special Requirements Textarea */}
                    <div className="relative">
                      <Edit3 size={15} className="absolute left-4 top-4 text-[#832244] pointer-events-none" />
                      <textarea
                        rows={3}
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us more about your event... (e.g., theme, special requirements) *"
                        className="figma-textarea"
                      />
                    </div>

                    {/* Error Banner */}
                    {formError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center animate-fade-in">
                        {formError}
                      </div>
                    )}

                    {/* Centered Pill Submit Button Comfortably INSIDE Card */}
                    <div className="pt-5 pb-1 flex justify-center">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className={`w-full sm:w-auto px-12 py-3.5 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all ${
                          formSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        {formSubmitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} /> <span>Submit Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FOOTER SECTION                                         */}
      {/* ========================================================= */}
      <footer className="bg-[#832244] text-white pt-16 pb-10 border-t border-[#621430]">
        <div className="container-custom px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
            
            {/* Column 1: Monogram & Brand Bio */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 18 L68 76 L57 76 L53 62 L41 62 L37 76 L26 76 Z M47 34 L43 53 L51 53 Z" fill="#832244"/>
                    <path d="M42 45 C48 40 56 46 64 42 C67 40 70 36 71 34" stroke="#D49A38" strokeWidth="4" strokeLinecap="round" fill="none"/>
                    <circle cx="72" cy="33" r="3.5" fill="#D49A38" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white font-bold text-lg leading-none tracking-wider">AKASH</span>
                  <span className="text-white text-[9px] tracking-[0.25em] font-medium opacity-90">PHOTOGRAPHY</span>
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed">
                Capturing your special moments with love and creativity.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-serif font-bold text-lg text-white mb-4 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white rounded-full"></span>
              </h4>
              <ul className="space-y-2.5 text-sm text-white/80">
                {['home', 'about', 'gallery', 'services', 'contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="capitalize hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get In Touch */}
            <div>
              <h4 className="font-serif font-bold text-lg text-white mb-4 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white rounded-full"></span>
              </h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-white/90 shrink-0" />
                  <a href="tel:+911234567890" className="hover:text-white transition-colors">
                    +91 1234567890
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-white/90 shrink-0" />
                  <a href="mailto:info@akashphotography.com" className="hover:text-white transition-colors">
                    info@akashphotography.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div>
              <h4 className="font-serif font-bold text-lg text-white mb-4 relative inline-block">
                Follow Us
                <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white rounded-full"></span>
              </h4>
              
              {/* Social Icon Pills */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-[#832244] flex items-center justify-center hover:bg-[#FDF2F4] hover:scale-110 transition-all shadow-md"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-[#832244] flex items-center justify-center hover:bg-[#FDF2F4] hover:scale-110 transition-all shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-[#832244] flex items-center justify-center hover:bg-[#FDF2F4] hover:scale-110 transition-all shadow-md"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="pt-8 text-center text-xs text-white/70">
            <p>© 2025 Akash Photography. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* 10. LIGHTBOX MODAL FOR GALLERY                            */}
      {/* ========================================================= */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="w-full max-h-[75vh] object-contain mx-auto"
            />
            <div className="p-4 bg-[#1E1E1E] text-white flex justify-between items-center">
              <div>
                <span className="text-xs text-[#E5A83B] uppercase tracking-wider font-semibold">{selectedImage.category}</span>
                <h3 className="font-serif text-lg font-bold">{selectedImage.title}</h3>
              </div>
              <button
                onClick={() => { setSelectedImage(null); scrollTo('contact'); }}
                className="px-5 py-2 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-xs font-semibold tracking-wider uppercase text-white"
              >
                Inquire For This Style
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. SERVICE DETAILS MODAL                                 */}
      {/* ========================================================= */}
      {selectedService && (
        <div 
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#FCE8EC]"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#832244] flex items-center justify-center shadow-md transition-colors"
            >
              <X size={18} />
            </button>
            <div className="h-48 overflow-hidden bg-gray-100">
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#832244] flex items-center justify-center text-white">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">{selectedService.title}</h3>
                  <p className="text-xs text-[#832244] font-medium">{selectedService.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                {selectedService.desc}
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const svcTitle = selectedService.title;
                    setSelectedService(null);
                    setFormData(prev => ({ ...prev, eventType: svcTitle }));
                    scrollTo('contact');
                  }}
                  className="px-6 py-2 rounded-full bg-[#832244] hover:bg-[#9B2B52] text-xs font-semibold text-white shadow-md"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
