'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Casino } from '../utils/interface';
import Image from 'next/image';
import { Sparkles, Shield, Flame, ThumbsUp, ExternalLink } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import ClaimButton from './ClaimButton';
import Link from 'next/link';
import { useDotButton } from './EmblaCarouselDotButton';

interface CasinoCarouselProps {
  casinos: Casino[];
  options?: EmblaOptionsType;
}

const CasinoCarousel: React.FC<CasinoCarouselProps> = ({ 
  casinos, 
  options = {
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  }
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false,
      playOnInit: true 
    })
  ]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const TAGS = {
    'Free Spins': '04cd2708-ea30-4cf2-be7b-6503a51c1d81',
    'Trusted': '3c74b95c-5e7e-4d74-9ca8-2fee19e21263',
    'Popular': '1d5ff23f-daa1-4fc9-89b3-dbde52f2839b',
    'Recommended': '3afc3c7e-3421-4b41-a3a2-0de00a605ef5',
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
     
      <div className="embla w-full overflow-hidden relative pb-12">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex">
            {casinos.map((casino, index) => (
              <div className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%]" key={casino._id}>
                <div className="h-[420px] bg-black/90 border border-cyan-500/20 rounded-lg hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden mx-1">
                  <div className="relative z-10 h-full flex flex-col p-4">
                    {/* Tags section */}
                    {casino.tags && casino.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {casino.tags.map((tag) => {
                          let Icon = Sparkles;
                          if (tag._id === TAGS['Trusted']) Icon = Shield;
                          if (tag._id === TAGS['Popular']) Icon = Flame;
                          if (tag._id === TAGS['Recommended']) Icon = ThumbsUp;

                          return (
                            <div
                              key={tag._id}
                              className="inline-flex items-center gap-1 bg-cyan-500/10 px-2 py-1 rounded text-xs text-cyan-400"
                            >
                              <Icon className="w-3 h-3" />
                              <span>{tag.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Casino Image */}
                    <div className="relative h-48 w-full mb-4">
                      {casino.imageUrl ? (
                        <Image
                          src={casino.imageUrl}
                          alt={casino.offerTitle}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 25vw"
                          priority={index < 4}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00E6FF]/20 to-purple-500/20 flex items-center justify-center">
                          <span className="text-xl font-display text-white">{casino.offerTitle}</span>
                        </div>
                      )}
                    </div>

                    {/* Casino Title */}
                    <h3 className="text-xl font-medium text-white mb-4 text-center">{casino.offerTitle}</h3>

                    {/* Footer with Button and Terms */}
                    <div className="mt-auto space-y-2">
                      <ClaimButton
                        offerUrl={casino.offerUrl}
                        offerTitle={casino.offerTitle}
                        categoryUrls={casino.categoryUrls}
                      />
                      
                      {casino.termsConditionsUrl && (
                        <Link 
                          href={casino.termsConditionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Terms & Conditions Apply</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`embla__dot${index === selectedIndex ? ' embla__dot--selected' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .embla__container {
          display: flex;
          gap: 0.25rem;
        }
        .embla__slide {
          flex: 0 0 300px;
          min-width: 300px;
          padding: 0 0.25rem;
        }
        @media (max-width: 640px) {
          .embla__slide {
            flex: 0 0 280px;
            min-width: 280px;
          }
        }
        }
        .embla__dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 0;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
        }
        .embla__dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background-color: rgba(6, 182, 212, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .embla__dot--selected {
          background-color: rgb(6, 182, 212);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default CasinoCarousel;