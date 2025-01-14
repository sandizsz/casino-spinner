import { notFound } from 'next/navigation';
import Image from 'next/image';
import AnimatedSection from '../components/AnimatedSection';
import { PageData } from '../types/pageTypes';

// Import page data
import { blackjackData } from '../data/pages/blackjack';
import { rouletteData } from '../data/pages/roulette';
import { baccaratData } from '../data/pages/baccarat';
import { sicboData } from "../data/pages/sicbo";
import { slotsData } from '../data/pages/onlineslots';
import { kenoData } from '../data/pages/keno';
import { crapsData } from '../data/pages/craps';
import { privacyPolicyData, disclaimerData, termsConditionsData, cookiePolicyData } from '../data/pages/legal';
import { casinoGuidesData, gamblingAdviceData, depositMethodsData, casinoGameTypesData, casinoTipsTricksData } from '../data/pages/guides';


// Combine all page data
const pages: PageData[] = [
  blackjackData,
  kenoData,
  crapsData,
  sicboData,
  rouletteData,
  baccaratData,
  privacyPolicyData,
  disclaimerData,
  termsConditionsData,
  cookiePolicyData,
  casinoGuidesData,
  gamblingAdviceData,
  casinoGameTypesData,
  depositMethodsData,
  casinoTipsTricksData,
  slotsData
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="relative w-full bg-[#0A0A0A]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00E6FF] blur-[180px] -top-32 -right-24 animate-float"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00E6FF] blur-[150px] bottom-0 -left-24 animate-float-delayed"></div>
        </div>
      </div>

      <AnimatedSection className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#00E6FF]">
              <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
              <span className="text-sm font-mono uppercase tracking-[0.2em]">SpinnerTOP Casino</span>
              <div className="w-12 h-[2px] bg-[#00E6FF]"></div>
            </div>

            {page.image && (
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-[#00E6FF]/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={page.image}
                  alt={page.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">
              {page.title}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              {page.description}
            </p>

            <div className="prose prose-lg prose-invert max-w-none 
              [&>h2]:text-2xl [&>h2]:font-display [&>h2]:text-white [&>h2]:mb-4 
              [&>h3]:text-xl [&>h3]:font-display [&>h3]:text-white [&>h3]:mb-3
              [&>p]:text-gray-400 [&>p]:leading-relaxed [&>p]:mb-6
              [&>ul]:text-gray-400 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul>li]:relative [&>ul>li]:pl-6 
              [&>ul>li:before]:content-[''] [&>ul>li:before]:absolute [&>ul>li:before]:left-0 [&>ul>li:before]:top-3 
              [&>ul>li:before]:w-2 [&>ul>li:before]:h-2 [&>ul>li:before]:bg-[#00E6FF] [&>ul>li:before]:rounded-full
              [&>ol]:text-gray-400 [&>ol]:space-y-2 [&>ol]:mb-6
              [&>blockquote]:border-l-[#00E6FF] [&>blockquote]:text-gray-400 [&>blockquote]:italic [&>blockquote]:text-lg [&>blockquote]:pl-4 [&>blockquote]:py-1
              [&>a]:text-[#00E6FF] [&>a:hover]:text-[#00E6FF]/80
              [&_.grid]:grid [&_.grid-cols-1]:grid-cols-1 [&_.md\:grid-cols-2]:md:grid-cols-2 [&_.md\:grid-cols-3]:md:grid-cols-3 
              [&_.gap-4]:gap-4 
              [&_div>h3]:text-xl [&_div>h3]:font-display [&_div>h3]:text-white [&_div>h3]:mb-3
              [&_div>ul]:text-gray-400 [&_div>ul]:space-y-2 [&_div>ul]:mb-6 
              [&_div>ul>li]:relative [&_div>ul>li]:pl-6 
              [&_div>ul>li:before]:content-[''] [&_div>ul>li:before]:absolute [&_div>ul>li:before]:left-0 
              [&_div>ul>li:before]:top-3 [&_div>ul>li:before]:w-2 [&_div>ul>li:before]:h-2 
              [&_div>ul>li:before]:bg-[#00E6FF] [&_div>ul>li:before]:rounded-full"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
