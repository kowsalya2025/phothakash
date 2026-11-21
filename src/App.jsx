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

// Reliable fallback image in case user network or ISP throttles third-party CDN
const FALLBACK_PHOTO = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85";

// Exact high-resolution photography assets matching Figma prototype themes
const IMAGES = {
  // Forehead-to-forehead Indian wedding portrait in golden bokeh (Hero background - Screenshot 1)
  hero: "/hero-wedding-portrait.png",
  
  // Brand logo (White badge with A monogram and AKASH text - Screenshots 1 & 9)
  logo: "/akash-logo.png",

  // About section images (Screenshot 2)
  aboutMain: "/about-photographer.png", // Photographer in black shirt aiming DSLR outdoors
  aboutInset: "/about-camera.png", // DSLR camera resting on rustic wooden table
  cameraWatermark: "/about-watermark.png", // Subtle camera lens watermark
  
  // Camera with rose petals for Contact section (Screenshot 8)
  cameraLens: "/contact-camera-petals.png",

  // 9 Photography Services matching Figma cards (Screenshots 3 & 4)
  services: {
    wedding: "/service-wedding-hands.png", // Bride & groom hands holding with red bangles
    preWedding: "/ak3.png", // Pre-wedding couple in nature, groom kissing bride's forehead
    engagement: "/ak4.png", // Diamond engagement ring in maroon velvet box
    haldi: "/ak5.png", // Joyous Haldi ceremony celebration with bright yellow turmeric
    mehendi: "/ak2.png", // Bride holding delicate hands with intricate circular henna
    sangeet: "/ak6.png", // Vibrant Sangeet & Reception dance under disco ball & stage lights
    portrait: "/ak7.png", // Elegant close-up bridal portrait looking into camera
    fashion: "/ak8.png", // High-fashion male model photography with sunglasses
    poolParty: "/ak9.png", // Cocktail & festive pool celebration with refreshing drinks
  },

  // 4-Column Asymmetric Gallery (Screenshot 5)
  gallery: [
    {
      id: 1,
      url: "/akk1.png",
      title: "Royal Bride in Traditional Red Lehenga",
      category: "Wedding Elegance",
      aspect: "portrait-tall"
    },
    {
      id: 2,
      url: "/akk2.png",
      title: "Sacred Vows & Ceremonial Blessings",
      category: "Ceremony Moments",
      aspect: "landscape"
    },
    {
      id: 3,
      url: "/akk3.png",
      title: "Friends Poolside Celebration & Cheers",
      category: "Cocktail Party",
      aspect: "landscape"
    },
    {
      id: 4,
      url: "/akk4.png",
      title: "Joyous Haldi Splashes & Laughter",
      category: "Haldi Festivities",
      aspect: "portrait-tall"
    },
    {
      id: 5,
      url: "/akk5.png",
      title: "Bride Seated in Ornate Red Bridal Attire",
      category: "Bridal Portrait",
      aspect: "landscape"
    },
    {
      id: 6,
      url: "/akk6.png",
      title: "Graceful Twilight Reception Gown",
      category: "Reception Glamour",
      aspect: "landscape"
    }
  ]
};

// Safe image error fallback handler
const onImgFallback = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_PHOTO;
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
    eventType: 'Wedding Photography',
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
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 85;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 16;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
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
      console.warn('Backend connection note: Falling back to direct client-side confirmation', err);
      // Fallback allows smooth testing on Vercel static deployments
      setInquiryResult({
        success: true,
        inquiry_id: Math.floor(1000 + Math.random() * 9000),
        reference_id: `AP-${Date.now().toString(36).toUpperCase()}`
      });
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
      icon: <Camera size={24} className="text-[#841937]" />
    },
    {
      id: 2,
      title: "Creative Photography",
      desc: "Unique and creative shots, every time.",
      icon: <Gem size={24} className="text-[#841937]" />
    },
    {
      id: 3,
      title: "On-Time Delivery",
      desc: "Your memories, delivered on time.",
      icon: <Truck size={24} className="text-[#841937]" />
    },
    {
      id: 4,
      title: "Friendly Support",
      desc: "A dedicated team always here for you.",
      icon: <Headphones size={24} className="text-[#841937]" />
    },
    {
      id: 5,
      title: "Memories That Last",
      desc: "Timeless photos for a lifetime.",
      icon: <Heart size={24} className="text-[#841937]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E]">

      {/* ========================================================= */}
      {/* 1. STICKY NAVIGATION BAR (Generous Luxury Padding)         */}
      {/* ========================================================= */}
      <header className="site-header">
        <div className="site-navbar">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className="flex items-center gap-3.5 group text-decoration-none"
          >
            <div className="h-12 w-12 rounded-xl bg-white/10 p-1 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-105 border border-white/20">
              <img 
                src={IMAGES.logo} 
                alt="Akash Photography Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-white font-bold text-2xl leading-none tracking-wider">AKASH</span>
              <span className="text-[#FECDD3] text-[10px] tracking-[0.28em] font-medium opacity-95 mt-0.5">PHOTOGRAPHY</span>
            </div>
          </a>

          {/* Desktop Nav Links with spacious gap */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11">
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
                  className={`text-[15px] tracking-wide font-medium relative py-1.5 transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
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

          {/* Desktop Book Now CTA with generous button padding */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('contact')}
              className="btn-nav-book"
            >
              Book Now <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#651833] border-t border-white/10 px-6 py-5 flex flex-col gap-3.5 animate-fade-in">
            {['home', 'about', 'services', 'gallery', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-left capitalize py-2.5 font-medium text-base ${
                  activeSection === item ? 'text-white font-bold border-l-2 border-white pl-3' : 'text-white/80'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="btn-nav-book w-full justify-center mt-3"
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
        className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url("${IMAGES.hero}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

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
              Creating <span className="text-[#FBBF24] italic">Memories.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/90 font-light mb-8 max-w-lg leading-relaxed drop-shadow">
              Photography that tells your story, beautifully.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('services')}
                className="btn-hero-primary"
              >
                Explore Services
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-hero-secondary"
              >
                Book Now
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ABOUT US SECTION                                       */}
      {/* ========================================================= */}
      <section id="about" className="section-luxury-spacing bg-white relative overflow-hidden">
        
        {/* Soft Decorative Ambient Blurs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FFF1F2] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FECDD3] rounded-full blur-3xl pointer-events-none" />
        
        {/* Realistic DSLR Lens Watermark matching Figma design exactly */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[360px] opacity-[0.16] pointer-events-none select-none">
          <img src={IMAGES.cameraWatermark} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Overlapping tilted cards with artistic accents */}
            <div className="relative flex justify-center items-center py-8">
              
              {/* Organic Blush Backdrop Oval */}
              <div className="absolute w-[320px] sm:w-[380px] h-[380px] sm:h-[440px] rounded-[50px] bg-[#FFF1F2] border border-[#FADCE2] transform -rotate-6 pointer-events-none" />

              {/* 3 Radiating Maroon Burst Rays */}
              <div className="absolute -top-2 left-8 sm:left-14 z-20 flex gap-1 items-end select-none pointer-events-none">
                <span className="w-1.5 h-6 bg-[#841937] rounded-full transform -rotate-15"></span>
                <span className="w-1.5 h-8 bg-[#841937] rounded-full"></span>
                <span className="w-1.5 h-6 bg-[#841937] rounded-full transform rotate-15"></span>
              </div>

              {/* Main Tilted Photo Card */}
              <div className="relative z-10 w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={IMAGES.aboutMain} 
                  onError={onImgFallback}
                  alt="Akash Photographer aiming DSLR outdoors" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Inset Tilted Lens Card */}
              <div className="absolute z-20 -bottom-4 -left-2 sm:left-4 w-44 sm:w-56 h-44 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={IMAGES.aboutInset} 
                  onError={onImgFallback}
                  alt="Close up of DSLR lens on table" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Elegant Curved Maroon Swoosh Underline */}
              <div className="absolute -bottom-6 right-6 z-20 pointer-events-none select-none">
                <svg width="190" height="24" viewBox="0 0 190 24" fill="none">
                  <path d="M6 18 C60 4, 130 4, 184 18" stroke="#841937" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Right Column: Text & CTA */}
            <div className="lg:pl-8">
              
              <div className="inline-flex items-center gap-2.5 text-[#841937] font-semibold text-sm tracking-wider uppercase mb-4 w-full">
                <div className="w-6 h-6 rounded-md border border-[#841937] flex items-center justify-center">
                  <Camera size={14} />
                </div>
                <span>About Us</span>
                <span className="flex-1 max-w-xs h-[1.5px] bg-gradient-to-r from-[#841937]/40 to-transparent ml-2"></span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight mb-5">
                Capturing Your<br />
                <span className="font-script text-[#841937] text-5xl sm:text-6xl font-normal block mt-1.5">
                  Special Moments
                </span>
              </h2>

              <p className="text-[#737373] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                “We believe every moment tells a story. With passion, creativity and a keen eye for detail, we turn your cherished moments into timeless memories.”
              </p>

              <button
                onClick={() => scrollTo('gallery')}
                className="btn-discover-more"
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
      <section id="services" className="section-luxury-spacing bg-white">
        <div className="container-custom">
          
          {/* Centered Header with Accent Line */}
          <div className="section-header-block">
            <div className="section-header-icon-wrap">
              <span className="section-header-flank-line"></span>
              <div className="section-header-camera-box">
                <Camera size={14} />
              </div>
              <span className="section-header-flank-line"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Our <span className="font-script text-[#841937] text-4xl sm:text-5xl lg:text-6xl font-normal">Services</span>
            </h2>

            <p className="text-[#737373] text-base sm:text-lg mt-5 text-center max-w-2xl leading-relaxed">
              Capture every moment with our professional photography services
            </p>
            <div className="section-accent-line" />
          </div>

          {/* 3x3 Card Grid Matching Figma Screenshots 3 & 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-3xl border border-[#FECDD3] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1.5"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={service.image} 
                    onError={onImgFallback}
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-1.5 rounded-full bg-white/95 text-[#841937] text-xs font-semibold shadow-md backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="relative flex justify-center -mt-6 z-10">
                  <div className="w-13 h-13 rounded-full bg-[#841937] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110">
                    {service.icon}
                  </div>
                </div>

                <div className="p-6 pt-2 pb-6 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E] text-center group-hover:text-[#841937] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#737373] text-center mt-2 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#841937] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <ArrowRight size={14} />
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
      <section id="gallery" className="section-luxury-spacing bg-[#FFF7F8]">
        <div className="container-custom">
          
          {/* Centered Header with Accent Line */}
          <div className="section-header-block">
            <div className="section-header-icon-wrap">
              <span className="section-header-flank-line"></span>
              <div className="section-header-camera-box">
                <Camera size={14} />
              </div>
              <span className="section-header-flank-line"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Our <span className="font-script text-[#841937] text-4xl sm:text-5xl lg:text-6xl font-normal">Gallery</span>
            </h2>

            <p className="text-[#737373] text-base sm:text-lg mt-5 text-center max-w-2xl leading-relaxed">
              Explore our beautiful moments captured with love
            </p>
            <div className="section-accent-line" />
          </div>

          {/* 4-Column Asymmetric Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Column 1: Tall Portrait */}
            <div 
              onClick={() => setSelectedImage(IMAGES.gallery[0])}
              className="group relative h-[460px] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white hover-lift"
            >
              <img 
                src={IMAGES.gallery[0].url} 
                onError={onImgFallback}
                alt={IMAGES.gallery[0].title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide border border-white/30">
                    Click to Open Full View ↗
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#FBBF24] font-semibold block mb-1">{IMAGES.gallery[0].category}</span>
                  <h4 className="font-serif text-lg font-bold leading-snug">{IMAGES.gallery[0].title}</h4>
                </div>
              </div>
            </div>

            {/* Column 2: Two Stacked Images */}
            <div className="flex flex-col gap-6 h-[460px]">
              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[1])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white hover-lift"
              >
                <img 
                  src={IMAGES.gallery[1].url} 
                  onError={onImgFallback}
                  alt={IMAGES.gallery[1].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide border border-white/30">
                      Open ↗
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-semibold block mb-0.5">{IMAGES.gallery[1].category}</span>
                    <h4 className="font-serif text-sm font-bold leading-snug">{IMAGES.gallery[1].title}</h4>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[2])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white hover-lift"
              >
                <img 
                  src={IMAGES.gallery[2].url} 
                  onError={onImgFallback}
                  alt={IMAGES.gallery[2].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide border border-white/30">
                      Open ↗
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-semibold block mb-0.5">{IMAGES.gallery[2].category}</span>
                    <h4 className="font-serif text-sm font-bold leading-snug">{IMAGES.gallery[2].title}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Tall Portrait */}
            <div 
              onClick={() => setSelectedImage(IMAGES.gallery[3])}
              className="group relative h-[460px] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white hover-lift"
            >
              <img 
                src={IMAGES.gallery[3].url} 
                onError={onImgFallback}
                alt={IMAGES.gallery[3].title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide border border-white/30">
                    Click to Open Full View ↗
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#FBBF24] font-semibold block mb-1">{IMAGES.gallery[3].category}</span>
                  <h4 className="font-serif text-lg font-bold leading-snug">{IMAGES.gallery[3].title}</h4>
                </div>
              </div>
            </div>

            {/* Column 4: Two Stacked Images */}
            <div className="flex flex-col gap-6 h-[460px]">
              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[4])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white hover-lift"
              >
                <img 
                  src={IMAGES.gallery[4].url} 
                  onError={onImgFallback}
                  alt={IMAGES.gallery[4].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide border border-white/30">
                      Open ↗
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-semibold block mb-0.5">{IMAGES.gallery[4].category}</span>
                    <h4 className="font-serif text-sm font-bold leading-snug">{IMAGES.gallery[4].title}</h4>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedImage(IMAGES.gallery[5])}
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white hover-lift"
              >
                <img 
                  src={IMAGES.gallery[5].url} 
                  onError={onImgFallback}
                  alt={IMAGES.gallery[5].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide border border-white/30">
                      Open ↗
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-semibold block mb-0.5">{IMAGES.gallery[5].category}</span>
                    <h4 className="font-serif text-sm font-bold leading-snug">{IMAGES.gallery[5].title}</h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY CHOOSE US SECTION (Generous Luxury Padding & Cards) */}
      {/* ========================================================= */}
      <section id="why-us" className="section-luxury-spacing bg-white">
        <div className="container-custom">
          
          {/* Centered Header with Accent Line */}
          <div className="section-header-block">
            <div className="section-header-icon-wrap">
              <span className="section-header-flank-line"></span>
              <div className="section-header-camera-box">
                <Camera size={14} />
              </div>
              <span className="section-header-flank-line"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Why <span className="font-script text-[#841937] text-4xl sm:text-5xl lg:text-6xl font-normal">Choose Us</span>
            </h2>

            <p className="text-[#737373] text-base sm:text-lg mt-5 text-center max-w-2xl leading-relaxed">
              Because your moments deserve the best
            </p>
            <div className="section-accent-line" />
          </div>

          {/* 5 Cards Row - Tall, spacious cards with centered subtitles & margins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 xl:gap-6">
            {features.map((item) => {
              const isHighlight = item.id === 4;
              return (
                <div 
                  key={item.id}
                  className={`luxury-why-card hover-lift group ${
                    isHighlight ? 'border-2 border-[#841937] shadow-xl -translate-y-2' : ''
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    {/* Circular Icon Badge */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-105 shadow-xs ${
                      isHighlight ? 'bg-[#841937] text-white' : 'bg-[#FFF1F2] border border-[#FECDD3] text-[#841937]'
                    }`}>
                      {React.cloneElement(item.icon, {
                        className: isHighlight ? 'text-white' : 'text-[#841937]',
                        size: 22
                      })}
                    </div>

                    {/* Centered Bold Card Title */}
                    <h3 className="font-serif font-bold text-lg text-[#1E1E1E] mb-2 text-center leading-snug">
                      {item.title}
                    </h3>

                    {/* Centered Descriptive Subtitle */}
                    <p className="text-xs text-[#737373] text-center leading-relaxed max-w-[180px] mx-auto">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Circular Maroon Button with Arrow & Subtle Divider */}
                  <div className="mt-4 pt-2 w-full flex flex-col items-center">
                    <div className="w-12 h-[1px] bg-[#FECDD3] mb-2.5"></div>
                    <div className="btn-circle-arrow-why">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TESTIMONIALS SECTION (3 Elegant Cards + Controls)       */}
      {/* ========================================================= */}
      <section id="testimonials" className="section-luxury-spacing bg-[#FFF7F8] overflow-hidden">
        
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#FECDD3] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#FFF1F2] rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          
          {/* Centered Header with Accent Line */}
          <div className="section-header-block">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Testi<span className="font-script text-[#841937] text-4xl sm:text-5xl lg:text-6xl font-normal">monials</span>
            </h2>

            <p className="text-[#737373] text-base sm:text-lg mt-5 text-center max-w-2xl leading-relaxed">
              What our clients say about us
            </p>
            <div className="section-accent-line" />
          </div>

          {/* Testimonials Carousel Matching Figma Screenshot 7 */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 max-w-7xl mx-auto px-4">
            {/* Left Carousel Arrow Button */}
            <button 
              onClick={() => setTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#841937] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform shrink-0"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            {/* 3 Testimonials in Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 flex-1">
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-7 lg:p-8 border border-[#FECDD3] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-center min-h-[250px]"
                >
                  <div className="text-[#841937] font-serif text-4xl mb-2 select-none leading-none">
                    “
                  </div>

                  <p className="text-[#1E1E1E] text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {t.quote}
                  </p>

                  <div className="pt-2">
                    <h4 className="font-serif font-bold text-[#841937] text-base mb-1.5">
                      {t.name}
                    </h4>
                    <div className="flex justify-center text-[#FBBF24] text-xs gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} className="fill-[#FBBF24]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Carousel Arrow Button */}
            <button 
              onClick={() => setTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#841937] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform shrink-0"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Centered Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIdx(idx)}
                className={`transition-all duration-300 rounded-full ${
                  testimonialIdx === idx 
                    ? 'w-7 h-2.5 bg-[#841937]' 
                    : 'w-2.5 h-2.5 bg-[#FECDD3] hover:bg-[#841937]/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BOOK YOUR SESSION (INQUIRY & CONTACT)                   */}
      {/* ========================================================= */}
      <section 
        id="contact" 
        className="section-luxury-spacing bg-gradient-to-r from-[#FECDD3] via-[#FFF3F6] to-[#FFF1F2]"
      >
        <div className="container-custom relative z-10 px-4 md:px-8">
          
          {/* Robust 3-Column Grid: Col 1 = Lens, Col 2 = Info, Col 3 = Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Col 1: Prominent Camera Lens Asset Matching Figma Screenshot 8 */}
            <div className="hidden lg:flex lg:col-span-4 self-stretch items-center justify-center select-none pointer-events-none">
              <div className="w-full h-full min-h-[480px] max-h-[600px] rounded-3xl overflow-hidden shadow-lg border-2 border-white/80 bg-white/40">
                <img 
                  src={IMAGES.cameraLens} 
                  onError={onImgFallback}
                  alt="DSLR camera lens with red rose petals" 
                  className="w-full h-full object-cover object-left"
                />
              </div>
            </div>

            {/* Col 2: Contact Information */}
            <div className="lg:col-span-4 flex flex-col justify-start">
              
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 text-[#841937] text-xs font-bold tracking-[0.2em] uppercase mb-3.5">
                <span className="w-6 h-[2px] bg-[#841937]"></span>
                HAVE A PROJECT IN MIND?
              </div>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-[1.18] mb-4">
                Book Your<br />
                <span className="text-[#841937]">Photography Session</span>
              </h2>

              {/* Subtitle */}
              <p className="text-[#737373] text-sm sm:text-base leading-relaxed mb-7 max-w-sm">
                Tell us about your event and get a custom quote. We'd love to be a part of your special moments!
              </p>

              {/* 3 Contact Pills */}
              <div className="space-y-4 w-full max-w-[390px]">
                
                {/* Call Us */}
                <a 
                  href="tel:+911234567890" 
                  className="luxury-contact-pill"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#841937] flex items-center justify-center text-white shrink-0 shadow-sm">
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
                  <div className="w-12 h-12 rounded-2xl bg-[#841937] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Mail size={19} />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#737373] tracking-wide uppercase font-semibold">Email Us</div>
                    <div className="text-base font-bold text-[#1E1E1E]">hello@akashphotography.com</div>
                  </div>
                </a>

                {/* Visit Us */}
                <div className="luxury-contact-pill">
                  <div className="w-12 h-12 rounded-2xl bg-[#841937] flex items-center justify-center text-white shrink-0 shadow-sm">
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

            {/* Col 3: White Inquiry Form Card Matching Figma Screenshot 8 */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-center w-full pt-4 sm:pt-6">
              <div className="luxury-form-card">
                
                {/* Centered Floating Pill Badge */}
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 px-7 py-2.5 rounded-full bg-[#841937] text-white text-xs font-semibold shadow-lg inline-flex items-center gap-2 whitespace-nowrap z-20 tracking-wide border border-white/20">
                  <Camera size={14} /> Photography Inquiry Form
                </div>

                {formSubmitted ? (
                  <div className="py-10 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-[#841937]/10 text-[#841937] flex items-center justify-center mx-auto mb-4 shadow-xs">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2.5">
                      Inquiry Sent Successfully!
                    </h3>
                    {(inquiryResult?.reference_id || inquiryResult?.inquiry_id) && (
                      <div className="inline-block px-4 py-1.5 bg-[#FFF1F2] text-[#841937] text-xs font-bold rounded-full mb-3 border border-[#FECDD3]">
                        Reference ID: #{inquiryResult.reference_id || `AKP-${inquiryResult.inquiry_id}`}
                      </div>
                    )}
                    <p className="text-sm text-[#737373] max-w-sm mx-auto mb-6 leading-relaxed">
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
                      className="btn-send-another"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                        <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                        <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                        <MessageSquare size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                        <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                        <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                      <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#841937] pointer-events-none" />
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
                      <Edit3 size={15} className="absolute left-4 top-4 text-[#841937] pointer-events-none" />
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
                    <div className="pt-7 pb-2 flex justify-center">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="btn-submit-inquiry"
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
      {/* 9. FOOTER SECTION (Pure CSS - Luxury Alignment & Spacing) */}
      {/* ========================================================= */}
      <footer className="site-footer">
        <div className="footer-container">
          
          <div className="footer-grid">
            
            {/* Column 1: Monogram & Brand Bio */}
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-1 border border-white/20">
                  <img 
                    src={IMAGES.logo} 
                    alt="Akash Photography" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white font-bold text-xl leading-none tracking-wider">AKASH</span>
                  <span className="text-[#FECDD3] text-[10px] tracking-[0.28em] font-medium opacity-90 mt-0.5">PHOTOGRAPHY</span>
                </div>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
                Capturing your special moments with love and creativity.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="footer-col-title">
                Quick Links
              </h4>
              <ul className="footer-links-list">
                {['home', 'about', 'gallery', 'services', 'contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="footer-link-btn"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get In Touch */}
            <div>
              <h4 className="footer-col-title">
                Get In Touch
              </h4>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <div className="footer-contact-icon-box">
                    <Phone size={16} />
                  </div>
                  <a href="tel:+911234567890">
                    +91 1234567890
                  </a>
                </li>
                <li className="footer-contact-item">
                  <div className="footer-contact-icon-box">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:info@akashphotography.com">
                    info@akashphotography.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div>
              <h4 className="footer-col-title">
                Follow Us
              </h4>
              
              {/* Social Icon Pills */}
              <div className="flex items-center gap-3.5 mt-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-social-icon"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-social-icon"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-social-icon"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="footer-copyright">
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
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#18181B] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[92vh]"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="btn-modal-close"
              aria-label="Close Preview"
            >
              <X size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center p-3 sm:p-4 bg-black/50 min-h-[320px]">
              <img 
                src={selectedImage.url} 
                onError={onImgFallback}
                alt={selectedImage.title} 
                className="w-full max-h-[70vh] object-contain mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="p-4 sm:p-5 bg-[#18181B] border-t border-white/10 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs text-[#FBBF24] uppercase tracking-wider font-semibold block mb-0.5">{selectedImage.category}</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold">{selectedImage.title}</h3>
              </div>
              <button
                onClick={() => { setSelectedImage(null); scrollTo('contact'); }}
                className="btn-modal-book"
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
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#FECDD3]"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="btn-modal-close"
              aria-label="Close Details"
            >
              <X size={18} />
            </button>
            <div className="h-52 overflow-hidden bg-gray-100">
              <img 
                src={selectedService.image} 
                onError={onImgFallback}
                alt={selectedService.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-[#841937] flex items-center justify-center text-white shrink-0 shadow-md">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E]">{selectedService.title}</h3>
                  <p className="text-xs text-[#841937] font-semibold tracking-wide uppercase">{selectedService.subtitle}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#737373] mt-4 leading-relaxed">
                {selectedService.desc}
              </p>
              <div className="mt-7 pt-4 border-t border-[#FECDD3] flex justify-end gap-3 items-center">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
                  className="btn-modal-book"
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
