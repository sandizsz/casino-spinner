'use client';

import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          recipientEmail: 'darkijs5@gmail.com' 
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <section className="relative w-full bg-[#0A0A0A] overflow-x-hidden flex items-start md:items-center py-8 md:py-12 lg:py-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-[#00E6FF] blur-[120px] sm:blur-[180px] -top-32 -right-12 sm:-right-24 animate-float"></div>
          <div className="absolute w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-[#00E6FF] blur-[100px] sm:blur-[150px] bottom-0 -left-12 sm:-left-24 animate-float-delayed"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 min-h-[60vh] md:min-h-[70vh]">
          {/* Left Content - Text and CTA */}
          <div className="flex-1 space-y-6 md:space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#00E6FF]">
                <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                <span className="text-sm font-display uppercase tracking-wider">Welcome to SpinnerTop</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-display-bold leading-tight">
                <span className="text-white">Play</span>
                <span className="text-[#00E6FF] ml-2 md:ml-4">Win</span>
                <span className="text-white ml-2 md:ml-4">Repeat</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
                Experience the thrill of next-generation casino gaming with instant payouts and VIP treatment.
              </p>

              {/* Newsletter Subscription */}
              <div className="max-w-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#00E6FF]" />
                    <span className="text-white font-display">Subscribe to Newsletter</span>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00E6FF]/50 focus:ring-1 focus:ring-[#00E6FF]/50 transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-[#00E6FF] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#00E6FF]/20 transition-all duration-300 whitespace-nowrap"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  {isSubmitted && (
                    <p className="text-sm text-[#00E6FF] font-medium">
                      Thank you for subscribing! We&apos;ll keep you updated with the latest news.
                    </p>
                  )}
                  <p className="text-sm text-gray-400">
                    Get exclusive bonus offers and latest casino news.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Casino Elements */}
          <div className="hidden md:block flex-1 relative">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0">
                {/* Casino Elements */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32">
                  <div className="w-full h-full bg-gradient-to-br from-[#00E6FF] to-[#0056FF] rounded-2xl shadow-[0_0_30px_rgba(0,230,255,0.5)] border border-[#00E6FF]/50 backdrop-blur-sm animate-float"></div>
                </div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40">
                  <div className="w-full h-full bg-gradient-to-br from-[#00E6FF] to-[#0056FF] rounded-full shadow-[0_0_30px_rgba(0,230,255,0.5)] border border-[#00E6FF]/50 backdrop-blur-sm animate-float-delayed"></div>
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-36 h-36">
                  <div className="w-full h-full bg-gradient-to-br from-[#00E6FF] to-[#0056FF] rounded-lg shadow-[0_0_30px_rgba(0,230,255,0.5)] border border-[#00E6FF]/50 backdrop-blur-sm animate-bounce"></div>
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-28 h-28">
                  <div className="w-full h-full bg-gradient-to-br from-[#00E6FF] to-[#0056FF] rounded-xl shadow-[0_0_30px_rgba(0,230,255,0.5)] border border-[#00E6FF]/50 backdrop-blur-sm animate-float"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
