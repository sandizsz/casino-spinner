import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-[#001618] border-t border-[#00E6FF]/50">
      {/* Legal Links */}
      <div className="border-b border-[#00E6FF]/50 bg-[#00E6FF]/[0.08]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-[#00E6FF]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors duration-300">
              Terms & Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors duration-300">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>

      {/* Gambling Awareness Logos */}
      <div className="bg-gradient-to-r from-[#00E6FF]/[0.05] via-[#00E6FF]/[0.1] to-[#00E6FF]/[0.05]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <Link href="https://www.gamblingtherapy.org" className="hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/GAMBLING_THERAPY-logo.png" 
                alt="Gambling Therapy Logo"
                width={100}
                height={50}
                className="h-8 w-auto object-contain brightness-125"
              />
            </Link>
            <Link href="https://www.gamblingcommission.gov.uk" className="hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/Image1.png" 
                alt="Gambling Awareness Logo 1"
                width={100}
                height={50}
                className="h-8 w-auto object-contain brightness-125"
              />
            </Link>
            <Link href="https://www.gambleaware.org/" className="hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/Image2.png"
                alt="Gambling Awareness Logo 2"
                width={100}
                height={50}
                className="h-8 w-auto object-contain brightness-125"
              />
            </Link>
            <Link href="https://www.gamcare.org.uk/" className="hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/Image3.png"
                alt="Gambling Awareness Logo 3"
                width={100}
                height={50}
                className="h-8 w-auto object-contain brightness-125"
              />
            </Link>
            <Link href="https://www.gamstop.co.uk" className="hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/Image4.png"
                alt="Gambling Awareness Logo 4"
                width={100}
                height={50}
                className="h-8 w-auto object-contain brightness-125"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#00E6FF]/50 bg-[#00E6FF]/[0.08]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-[#00E6FF]">
            Copyright {new Date().getFullYear()} SpinnerTOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
