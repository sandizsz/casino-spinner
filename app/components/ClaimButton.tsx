'use client'
import { Button } from "./ui/button"
import Link from "next/link"

interface ClaimButtonProps {
  offerUrl: string;
  offerTitle: string;
  categorySlug?: string;
  categoryUrls?: Array<{
    categoryId: string;
    categorySlug: string;
    url: string;
    urlNumber?: string;
  }>;
}

export default function ClaimButton({ offerUrl, offerTitle, categorySlug, categoryUrls }: ClaimButtonProps) {
  const getFriendlyUrl = () => {
    const baseUrl = `/${offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`;
    if (categorySlug && categoryUrls?.length) {
      const categoryUrl = categoryUrls.find(cu => cu.categorySlug === categorySlug);
      if (categoryUrl?.urlNumber) {
        return `${baseUrl}${categoryUrl.urlNumber}`;
      }
    }
    return baseUrl;
  };

  const getUrl = () => {
    if (categorySlug && categoryUrls?.length) {
      const categoryUrl = categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url;
      if (categoryUrl) return categoryUrl;
    }
    return offerUrl;
  };

  

  return (
    <Link
      href={getFriendlyUrl()}
      onClick={(e) => {
        e.preventDefault();
        window.open(getUrl(), '_blank');
      }}
    >
      <Button
        className="w-full bg-cyan-500/10 border-2 border-cyan-400 text-cyan-300 font-bold text-2xl px-12 py-5 rounded-lg transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20 relative overflow-hidden group shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
      >
        {/* Animated corner accents */}
        <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-cyan-400 group-hover:border-cyan-300 transition-colors" />
        <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-cyan-400 group-hover:border-cyan-300 transition-colors" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Scan line effect */}
        <div className="absolute h-[3px] w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent -translate-y-12 group-hover:translate-y-12 transition-transform duration-700" />
        
        <span className="relative z-10 tracking-[0.2em]">PLAY</span>
      </Button>
    </Link>
  );
}