import { client } from "../sanity/lib/client";
import { Casino } from "./utils/interface";
import CasinoComponent from "./components/CasinoComponent";
import AnimatedSection from "./components/AnimatedSection";
import { blackjackData } from "./data/pages/blackjack";
import { sicboData } from "./data/pages/sicbo";
import { kenoData } from "./data/pages/keno";
import { crapsData } from "./data/pages/craps";
import { slotsData } from "./data/pages/onlineslots";
import { rouletteData } from "./data/pages/roulette";
import { baccaratData } from "./data/pages/baccarat";
import Hero from './components/Hero';
import { ArrowRight, Dices, Gamepad2, Coins, Joystick, Trophy, Target, Dice1 } from 'lucide-react';
import Link from "next/link";
import ContentPromo from './components/ContentPromo';

async function getPosts() {
  const query = `*[_type == "casino"] | order(orderRank)[0...50] {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    offerText,
    rating,
    "imageUrl": casinoImage.asset->url,
    termsConditionsUrl,
    "categoryUrls": categoryUrls[] {
      "categoryId": category->_id,
      "categorySlug": category->slug.current,
      "categoryTitle": category->title,
      url,
      urlNumber
    },
    tags[]-> {
      _id,
      title,
      slug {
        current
      }
    },
    categories[]-> {
      _id,
      slug,
      title
    },
    paymentMethods[]-> {
      _id,
      name,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Home() {
  const casinos: Casino[] = (await getPosts()).slice(0, 16);

  const guides = [
    blackjackData,
    rouletteData,
    baccaratData,
    crapsData,
    kenoData,
    sicboData,
    slotsData
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <main className="relative">


        <Hero />

        

        {/* Casino List Section */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mb-16 text-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 opacity-30" />
              
              {/* Section title with cyberpunk accents */}
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-cyan-400 mb-4">
                  <div className="w-12 h-[2px] bg-cyan-400"></div>
                  <span className="text-sm font-mono uppercase tracking-[0.2em]">Elite Selection</span>
                  <div className="w-12 h-[2px] bg-cyan-400"></div>
                </div>
                
                <h2 className="text-4xl font-display mb-4 text-white">
                  Top-Rated Casinos on <span className="text-cyan-400">SPINNERTOP</span>
                </h2>
                
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Access the most trusted online casinos, featuring secure payment methods and exclusive bonuses. Your gateway to premium gaming experiences.
                </p>
                
                {/* Corner accents */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />
              </div>
            </div>

            <div className="space-y-4">
              {casinos?.length > 0 && casinos.slice(0, 15).map((casino, index) => {
                if (index === 4) {
                  return (
                    <div key={`${casino._id}-section-1`}>
                      <CasinoComponent casino={casino} index={index} />
                      <ContentPromo 
                        title="Master Online Gambling"
                        description="Learn essential strategies and tips for successful online casino gaming."
                        link="/gambling-advice"
                      />
                    </div>
                  );
                }
                if (index === 8) {
                  return (
                    <div key={`${casino._id}-section-2`}>
                      <CasinoComponent casino={casino} index={index} />
                      <ContentPromo 
                        title="Payment Methods Guide"
                        description="Discover secure payment options and transaction guides for online casinos."
                        link="/payment-methods"
                      />
                    </div>
                  );
                }
                if (index === 11) {
                  return (
                    <div key={`${casino._id}-section-3`}>
                      <CasinoComponent casino={casino} index={index} />
                      <ContentPromo 
                        title="Responsible Gaming Tips"
                        description="Stay in control with our comprehensive responsible gaming guidelines."
                        link="/responsible-gaming"
                      />
                    </div>
                  );
                }
                return <CasinoComponent key={casino._id} casino={casino} index={index} />;
              })}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/category/all-bonuses" className="group relative bg-black/60 border-2 border-cyan-500/40 text-cyan-400 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border-cyan-400 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -translate-y-6 group-hover:translate-y-6 transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2 font-mono tracking-wider">
                  EXPLORE ALL CASINOS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
       

         {/* Informational Sections Container */}
         <div className="relative w-full bg-black">
          {/* Single Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-black">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, rgba(0, 230, 255, 0.02) 1px, transparent 1px), linear-gradient(-45deg, rgba(0, 230, 255, 0.02) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
            <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#00E6FF] opacity-[0.15] blur-[150px]"></div>
            <div className="absolute bottom-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#00E6FF] opacity-[0.1] blur-[150px]"></div>
            <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] rounded-full bg-[#00E6FF] opacity-[0.12] blur-[150px]"></div>
          </div>

          {/* Casino Guides Section */}
          <AnimatedSection className="w-full py-20 relative">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="relative mb-16 text-center">
                <div className="inline-flex items-center gap-2 text-[#00E6FF] mb-4">
                  <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                  <span className="text-sm font-mono uppercase tracking-[0.2em]">Casino Guides</span>
                  <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                </div>
                
                <h2 className="text-4xl font-display mb-4 text-white">
                  Master Your Casino Games
                </h2>
                
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Learn strategies and tips for popular casino games. From beginner guides to advanced techniques.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide, index) => {
                  const icons = [Dices, Gamepad2, Coins, Joystick, Trophy, Target, Dice1];
                  const Icon = icons[index % icons.length];
                  
                  return (
                    <Link 
                      key={index}
                      href={`/${guide.slug}`}
                      className="group relative bg-black/60 border border-[#00E6FF]/20 rounded-lg p-6 transition-all duration-300 hover:border-[#00E6FF]/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00E6FF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-[#00E6FF]/5 border border-[#00E6FF]/20">
                          <Icon className="w-6 h-6 text-[#00E6FF]" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-display text-white mb-2 group-hover:text-[#00E6FF] transition-colors">
                            {guide.title}
                          </h3>
                          
                          <p className="text-gray-400 text-sm mb-4">
                            {guide.description}
                          </p>
                          
                          <div className="flex items-center text-[#00E6FF] text-sm">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Responsible Gaming Section */}
          <AnimatedSection className="w-full pt-20 pb-40 relative">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-2 text-[#00E6FF]">
                  <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                  <span className="text-sm font-mono uppercase tracking-[0.2em]">Play Responsibly</span>
                </div>
                <h2 className="text-4xl font-display text-white">Stay in Control of Your Gaming</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Remember that gambling should always be for entertainment. Set limits, know when to stop, and never chase losses.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Set deposit limits</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Take regular breaks</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Track your time</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Know your limits</span>
                  </div>
                </div>
         
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-[#00E6FF] opacity-20 blur-[100px]"></div>
                <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                  <h3 className="text-2xl font-display text-white mb-6">Gaming Health Check</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">Ask yourself these questions:</p>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00E6FF]">•</span>
                        <span>Am I spending within my means?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00E6FF]">•</span>
                        <span>Is gambling affecting my relationships?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00E6FF]">•</span>
                        <span>Do I gamble with money I need for essentials?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00E6FF]">•</span>
                        <span>Am I gambling for fun or to make money?</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Casino Terms & Conditions Guide */}
        <AnimatedSection className="w-full py-20 -mt-20 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 text-[#00E6FF] mb-4">
                <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                <span className="text-sm font-mono uppercase tracking-[0.2em]">TERM GUIDE</span>
                <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
              </div>
              <h2 className="text-4xl font-display text-white mb-6">Understanding Casino Terms</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key terms and conditions you should know before playing at online casinos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-display text-[#00E6FF] mb-4">Wagering Requirements</h3>
                <p className="text-gray-300 mb-4">
                  The number of times you must play through a bonus before withdrawing. Example: 30x means a $100 bonus requires $3,000 in total bets.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Typically ranges from 20x to 50x</li>
                  <li>• Varies by game type</li>
                  <li>• Time limits may apply</li>
                </ul>
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-display text-[#00E6FF] mb-4">Maximum Bet Rules</h3>
                <p className="text-gray-300 mb-4">
                  The highest amount you can bet while playing with bonus money. Exceeding this can void your bonus and winnings.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Usually $5-$10 per spin/hand</li>
                  <li>• Applies until wagering is complete</li>
                  <li>• Check terms for exact limits</li>
                </ul>
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-display text-[#00E6FF] mb-4">Game Restrictions</h3>
                <p className="text-gray-300 mb-4">
                  Not all games contribute equally to wagering requirements. Some may be excluded entirely.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Slots usually count 100%</li>
                  <li>• Table games often 10-20%</li>
                  <li>• Some games may be restricted</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Grid Section */}
        <AnimatedSection className="w-full py-20 -mt-20 relative">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          {/* Glow Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00E6FF] blur-[150px] top-1/2 -translate-y-1/2 right-0"></div>
              <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00E6FF] blur-[120px] -bottom-32 -left-24"></div>
            </div>
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 text-[#00E6FF] mb-4">
                <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                <span className="text-sm font-mono uppercase tracking-[0.2em] justify-center">Key Features</span>
                <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
              </div>
              <h2 className="text-4xl font-display text-white mb-6">Why Choose Our Casino Guide</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Cards */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#00E6FF] transition-colors group">
                <div className="w-12 h-12 bg-[#00E6FF]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00E6FF]/20 transition-colors">
                  <svg className="w-6 h-6 text-[#00E6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-white mb-2">Secure Gaming</h3>
                <p className="text-gray-400">We only recommend licensed and regulated online casinos that prioritize player security and fair gaming practices.</p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#00E6FF] transition-colors group">
                <div className="w-12 h-12 bg-[#00E6FF]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00E6FF]/20 transition-colors">
                  <svg className="w-6 h-6 text-[#00E6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-white mb-2">Exclusive Bonuses</h3>
                <p className="text-gray-400">Access special bonus offers and promotions available only through our carefully curated partnerships.</p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#00E6FF] transition-colors group">
                <div className="w-12 h-12 bg-[#00E6FF]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00E6FF]/20 transition-colors">
                  <svg className="w-6 h-6 text-[#00E6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-white mb-2">Fast Payouts</h3>
                <p className="text-gray-400">Find casinos offering lightning-fast withdrawals and multiple payment methods for your convenience.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

    

        {/* Casino Tips Section */}
        <AnimatedSection className="w-full py-20 -mt-20 relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00E6FF] blur-[150px] -top-32 -left-24"></div>
            </div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, rgba(0, 230, 255, 0.03) 1px, transparent 1px), linear-gradient(-45deg, rgba(0, 230, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-2 text-[#00E6FF]">
                  <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
                  <span className="text-sm font-mono uppercase tracking-[0.2em]">Casino Strategy</span>
                </div>
                <h2 className="text-4xl font-display text-white">Master Your Game</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Enhance your casino experience with our expert tips and strategies. Learn the rules, understand the odds, and play smarter.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Learn Basic Strategy</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Understand House Edge</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Practice Free Games</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#00E6FF] rounded-full"></div>
                    <span>Manage Your Bankroll</span>
                  </div>
                </div>
         
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-[#00E6FF] opacity-20 blur-[100px]"></div>
                <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                  <h3 className="text-2xl font-display text-white mb-6">Quick Tips</h3>
                  <div className="space-y-4">
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                      <h4 className="text-[#00E6FF] font-display mb-2">Blackjack</h4>
                      <p className="text-gray-300">Always split Aces and 8s, never split 5s or 10s</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                      <h4 className="text-[#00E6FF] font-display mb-2">Roulette</h4>
                      <p className="text-gray-300">European roulette has better odds than American roulette</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                      <h4 className="text-[#00E6FF] font-display mb-2">Slots</h4>
                      <p className="text-gray-300">Check the RTP percentage before playing any slot game</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

       
      



        </div>
      </main>
    </div>
  );
}
