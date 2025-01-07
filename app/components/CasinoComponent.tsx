"use client"

import Image from "next/image";
import { TypedObject } from '@portabletext/types'
import { PortableText } from '@portabletext/react';
import ClaimButton from './ClaimButton';

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface PaymentMethod {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
}

interface CategoryUrl {
  categoryId: string;
  categorySlug: string;
  url: string;
  urlNumber?: string;
}

interface Casino {
  _id: string;
  offerTitle: string;
  offerUrl: string;
  offerDescription: string;
  offerText: TypedObject[];
  rating: number;
  imageUrl: string;
  termsConditionsUrl: string;
  categories: Category[];
  paymentMethods: PaymentMethod[];
  orderRank?: number;
  categoryUrls?: CategoryUrl[];
}

interface CasinoProps {
  casino: Casino;
  index: number;
  categorySlug?: string;
}

const CasinoComponent: React.FC<CasinoProps> = ({ casino, index, categorySlug }) => {


  return (
    <div className="relative w-full min-h-[600px] sm:min-h-[650px] lg:min-h-[300px] bg-black/90 border border-cyan-500/20 rounded-lg p-4 sm:p-6 mb-4 hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden">
    {/* Animated scan lines */}
    <div className="absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent h-px w-[200%] opacity-30"
          style={{
            top: `${30 * i}%`,
            left: '-50%',
            animation: `scan ${3 + i}s linear infinite`
          }}
        />
      ))}
    </div>

    {/* Main content */}
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8 relative z-10 w-full h-full">
      {/* Logo with glow effect */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-48 lg:h-48 flex-shrink-0 mx-auto lg:mx-0">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-xl animate-pulse"></div>
        <div className="relative h-full w-full bg-black/40 rounded-lg border border-cyan-500/20 p-4">
          <Image
            src={casino.imageUrl}
            alt={casino.offerTitle}
            fill
            className="object-contain p-3"
          />
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-6 h-6 border-t border-l border-cyan-500/40" />
          <div className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-cyan-500/40" />
        </div>
        
        {/* Rank indicator */}
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-black border border-cyan-500/40 rounded-lg flex items-center justify-center">
          <span className="text-cyan-500 text-lg font-bold">#{casino.orderRank || index + 1}</span>
        </div>
      </div>

      {/* Casino info with vertical accent */}
      <div className="flex-grow flex flex-col border-t lg:border-t-0 lg:border-l-2 border-cyan-500/20 pt-8 lg:pt-0 lg:pl-8 w-full text-center lg:text-left">
        <div className="space-y-6 flex-grow">
          <h3 className="text-2xl sm:text-3xl text-white group-hover:text-cyan-400 transition-colors font-bold px-4">
            {casino.offerTitle}
          </h3>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 px-4">
            {casino.offerDescription}
          </p>
          
          {/* Offer Text */}
          <div className="text-gray-300 text-lg px-4">
            <div className="inline-block text-left max-w-2xl mx-auto">
              <div className="[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2">
                <PortableText value={casino.offerText} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment methods grid */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 px-4">
          {casino.paymentMethods
            .filter(method => method.image?.asset?.url)
            .slice(0, 5)
            .map((method) => (
            <div
              key={method._id}
              className="relative w-16 h-16 sm:w-16 sm:h-16 bg-black/60 rounded-xl p-2 border border-cyan-500/20 group/method"
            >
              <Image
                src={method.image.asset.url}
                alt={method.name}
                fill
                className="object-contain p-1.5"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 opacity-0 group-hover/method:opacity-100 transition-opacity rounded-xl">
                <span className="text-sm text-cyan-400 text-center px-1 font-medium">{method.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="flex-shrink-0 w-full lg:w-48 flex flex-col items-stretch justify-end gap-4 mt-8 lg:mt-0 px-4 lg:px-0">
        <div className="w-full">
          <ClaimButton 
            offerUrl={casino.offerUrl}
            offerTitle={casino.offerTitle}
            categorySlug={categorySlug}
            categoryUrls={casino.categoryUrls}
          />
        </div>
        <a
          href={casino.termsConditionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors text-center"
        >
          T&Cs Apply
        </a>
      </div>
    </div>
  </div>
  );
}

export default CasinoComponent;