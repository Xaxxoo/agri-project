// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
// import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('who-we-are');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hero slider data
  const heroSlides = [
    {
      image: "/api/placeholder/1200/600",
      title: "Transforming Agriculture Through Innovation",
      subtitle: "Enhancing food safety standards and improving animal health practices"
    },
    {
      image: "/api/placeholder/1200/600",
      title: "Bridging Traditional Practices with Modern Technology",
      subtitle: "Creating sustainable solutions for agricultural challenges"
    },
    {
      image: "/api/placeholder/1200/600",
      title: "Global Partnerships for Local Impact",
      subtitle: "Collaborating with organizations worldwide to achieve food security"
    }
  ];
  
  // Team members data
  const teamMembers = [
    { name: 'Prof M.K. Lawan', role: 'Chairman and CEO', image: "/api/placeholder/300/300" },
    { name: 'Dr Mansur Salihu', role: 'Consultancy on Agro-veterinary Services and Food Safety', image: "/api/placeholder/300/300" },
    { name: 'Dr Suleiman Haruna', role: 'Training, Research and Collaboration on Agriculture and Related Sector', image: "/api/placeholder/300/300" },
    { name: 'Dr Abubakar Anas', role: 'Technology and ICT Solutions in Revolutionizing Agro-veterinary Practices', image: "/api/placeholder/300/300" },
    { name: 'Fatima Zahra Zubair', role: 'Animal Welfare', image: "/api/placeholder/300/300" },
    { name: 'Rasheeda Muhammad Lawal', role: 'Stakeholders and Community Engagement on Projects and Communication Office', image: "/api/placeholder/300/300" },
    { name: 'Prof. Yusuf Yakubu', role: 'Consultant Epidemiologist and Projector Coordinator', image: "/api/placeholder/300/300" }
  ];
  
  // Upcoming events
  const events = [
    {
      title: "Sustainable Farming Workshop",
      date: "April 15, 2025",
      location: "AgriTech Training Center, Lagos",
      description: "A hands-on workshop for farmers on implementing sustainable farming practices that increase yield while protecting the environment.",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Food Safety Symposium",
      date: "May 10, 2025",
      location: "National Agriculture University",
      description: "Join leading experts to discuss the latest advancements in food safety standards and practices across the agricultural value chain.",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Tech in Agriculture Conference",
      date: "June 22-24, 2025",
      location: "International Convention Center",
      description: "A three-day conference exploring how technology is revolutionizing agriculture with demos of the latest AgriTech innovations.",
      image: "/api/placeholder/600/400"
    }
  ];

  // Services data
  const services = [
    { 
      title: 'Consultancy on Agro-veterinary Services and Food Safety', 
      description: 'Expert guidance on implementing food safety standards and improving agro-veterinary practices.',
      icon: '🔬',
      image: "/api/placeholder/600/400"
    },
    { 
      title: 'Training, Research and Collaboration on Agriculture', 
      description: 'Comprehensive training programs and collaborative research initiatives to advance sustainable agricultural practices.',
      icon: '🧪',
      image: "/api/placeholder/600/400"
    },
    { 
      title: 'Technology and ICT Solutions', 
      description: 'Cutting-edge technological solutions designed to modernize and enhance efficiency in agro-veterinary operations.',
      icon: '💻',
      image: "/api/placeholder/600/400"
    },
    { 
      title: 'Animal Welfare', 
      description: 'Promoting and implementing best practices in animal health, wellbeing, and ethical treatment.',
      icon: '🐄',
      image: "/api/placeholder/600/400"
    },
    { 
      title: 'Stakeholders and Community Engagement', 
      description: 'Facilitating collaboration between community members, organizations, and government entities on agricultural initiatives.',
      icon: '🤝',
      image: "/api/placeholder/600/400"
    },
    { 
      title: 'Climate-Smart Agriculture', 
      description: 'Developing and implementing sustainable farming methods that adapt to and mitigate climate change effects.',
      icon: '🌱',
      image: "/api/placeholder/600/400"
    }
  ];
  
  // Company achievements
  const achievements = [
    { metric: '26+', label: 'Projects Completed' },
    { metric: '15+', label: 'Partner Organizations' },
    { metric: '1000+', label: 'Farmers Trained' },
    { metric: '5+', label: 'Research Publications' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AgriTech Project - Revolutionizing Agro-veterinary Practices</title>
        <meta name="description" content="AgriTech Project is focused on enhancing food safety standards and improving animal health practices through innovative solutions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Navigation */}
      <header className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-yellow-400 rounded-full mr-3 flex items-center justify-center text-green-800 font-bold">AP</div>
              <div className="text-2xl font-bold">AGRICTECH PROJECT</div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('who-we-are')} 
                className={`${activeTab === 'who-we-are' ? 'font-bold border-b-2 border-yellow-400' : ''} hover:text-yellow-200 transition-colors`}
              >
                Who We Are
              </button>
              <button 
                onClick={() => setActiveTab('what-we-do')} 
                className={`${activeTab === 'what-we-do' ? 'font-bold border-b-2 border-yellow-400' : ''} hover:text-yellow-200 transition-colors`}
              >
                What We Do
              </button>
              <button 
                onClick={() => setActiveTab('events')} 
                className={`${activeTab === 'events' ? 'font-bold border-b-2 border-yellow-400' : ''} hover:text-yellow-200 transition-colors`}
              >
                Events
              </button>
            </nav>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="mt-4 pb-4 space-y-3 md:hidden">
              <button 
                onClick={() => {
                  setActiveTab('who-we-are');
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left py-2 hover:bg-green-700 px-2 rounded"
              >
                Who We Are
              </button>
              <button 
                onClick={() => {
                  setActiveTab('what-we-do');
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left py-2 hover:bg-green-700 px-2 rounded"
              >
                What We Do
              </button>
              <button 
                onClick={() => {
                  setActiveTab('events');
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left py-2 hover:bg-green-700 px-2 rounded"
              >
                Events
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section with Slider */}
      <section className="relative h-96 md:h-screen/2 lg:h-screen/2 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
            <div className="relative h-full w-full">
              <img 
                src={slide.image} 
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">{slide.title}</h1>
                <p className="text-lg md:text-2xl max-w-3xl mx-auto text-white">
                  {slide.subtitle}
                </p>
                <p className="mt-8 text-white text-lg">Established on May 26, 2024</p>
                <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider navigation dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 mx-1 rounded-full transition-colors ${
                index === currentSlide ? 'bg-yellow-400' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* Company Stats Section */}
      <section className="bg-green-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {achievements.map((item, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{item.metric}</div>
                <div className="text-sm md:text-base uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Who We Are Section */}
        {activeTab === 'who-we-are' && (
          <div className="space-y-12">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Our Company</h2>
              
              <div className="md:flex gap-8 mb-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <img 
                    src="/api/placeholder/800/600" 
                    alt="AgriTech Project team at work" 
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    At AgriTech Project, we are dedicated to transforming agriculture and veterinary practices through innovative solutions and expertise. Our team comprises seasoned professionals, including a professor of Food Safety and Microbiology, alongside a group of passionate veterinarians, communication specialists, accounting experts and ICT experts.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our focus extends to animal welfare, climate-smart agriculture, and empowering stakeholders through community engagement on impactful projects. With a commitment to improving food security, health, and sustainable agriculture, we work hand-in-hand with local and international partners.
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-semibold mb-3 text-green-800">Our Success Stories</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Training over 500 butchers on meat hygiene and safety standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Developing antimicrobial resistance monitoring programs for livestock</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Conducting groundbreaking research on farmer-herder conflict resolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Implementing technology-driven solutions for small-scale farmers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Establishing sustainable animal welfare programs in rural communities</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to revolutionize the agricultural and veterinary sectors by providing innovative consultancy services, cutting-edge technology solutions, and comprehensive training programs. We are committed to ensuring food safety, enhancing animal health and production, promoting sustainable farming practices and animal welfare. Through collaboration with national and international partners, we aim to eradicate poverty, improve public health, and drive socioeconomic development by integrating modern technology, research, Smart Agriculture to mitigate effect of climate change and stakeholder engagement into the veterinary-agriculture value chain.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be a global leader in agricultural technology and consultancy, transforming the veterinary-agriculture sector into a sustainable, efficient, and welfare-driven industry. We envision a future where advanced technology, data-driven solutions, and integrated farming practices empower communities, ensure food security, and promote animal welfare, while contributing to the eradication of poverty and the prevention of foodborne diseases worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-80"></div>
                    </div>
                    <div className="p-6 relative -mt-16 bg-white bg-opacity-90 rounded-t-lg">
                      <h3 className="text-xl font-semibold mb-2 text-green-800">{member.name}</h3>
                      <p className="text-gray-700 text-sm mb-3">{member.role}</p>
                      <div className="flex space-x-3 text-green-700">
                        <a href="#" className="hover:text-green-500"><span>📧</span></a>
                        <a href="#" className="hover:text-green-500"><span>🔗</span></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* What We Do Section */}
        {activeTab === 'what-we-do' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-green-800 border-b-2 border-green-200 pb-2">Our Services</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-green-800">{service.title}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <a href="#" className="inline-block text-green-600 font-medium hover:text-green-800 transition-colors">
                      Learn more →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-16 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Our Approach</h2>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src="/api/placeholder/600/400" 
                      alt="Our approach to agriculture" 
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-800">Integrating Technology with Traditional Practices</h3>
                    <p className="text-gray-700 mb-4">
                      At AgriTech Project, we believe in bridging the gap between traditional farming wisdom and cutting-edge technology. Our approach combines centuries of agricultural knowledge with modern innovations to create sustainable, efficient solutions.
                    </p>
                    <h4 className="font-semibold text-green-700 mt-6 mb-2">Our Process:</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
                        <span>Assess local needs and existing practices</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
                        <span>Research and develop tailored solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
                        <span>Implement with community involvement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">4</span>
                        <span>Monitor outcomes and continuously improve</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Our Units</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start p-4 border-l-4 border-green-600 bg-green-50 rounded-r-lg">
                      <div className="mr-4 text-3xl text-green-600">{service.icon}</div>
                      <div>
                        <h3 className="font-semibold text-green-800">{service.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Events Section */}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-green-800 border-b-2 border-green-200 pb-2">Upcoming Events</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {events.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 bg-yellow-400 text-green-900 font-bold py-1 px-3 rounded-full text-sm">
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-green-800">{event.title}</h3>
                    <p className="text-gray-500 mb-4 text-sm">📍 {event.location}</p>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <button className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg shadow-md border-l-4 border-green-600 text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-800">Stay Updated on Our Events</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Join our mailing list to receive notifications about upcoming workshops, conferences, and training opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Call to Action Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Agricultural Practices?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Partner with AgriTech Project to implement innovative solutions that enhance productivity, sustainability, and welfare in your agricultural operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
              Contact Us
            </button>
            <button className="bg-transparent hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors border-2 border-white">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-yellow-400 rounded-full mr-3 flex items-center justify-center text-green-800 font-bold">AP</div>
                <h2 className="text-2xl font-bold">AGRICTECH</h2>
              </div>
              <p className="text-gray-300 mb-4">Established May 26, 2024</p>
              <p className="text-gray-300">Transforming agricultural practices through innovation and collaboration.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Consultancy</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Training & Research</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Technology Solutions</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Animal Welfare</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Climate-Smart Agriculture</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Contact Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span>123 Agriculture Way, Lagos, Nigeria</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📱</span>
                  <span>+234 123 456 7890</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📧</span>
                  <span>info@agrictech.org</span>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-yellow-400 transition-colors">FB</a>
                <a href="#" className="text-white hover:text-yellow-400 transition-colors">TW</a>
                <a href="#" className="text-white hover:text-yellow-400 transition-colors">IG</a>
                <a href="#" className="text-white hover:text-yellow-400 transition-colors">LI</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} AgriTech Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}