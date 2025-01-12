'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);  // Initialize as false to prevent flash

  useEffect(() => {
    // Check if the cookie exists
    const hasConsent = document.cookie.split(';').some(item => item.trim().startsWith('casino_cookie_consent='));
    setShowBanner(!hasConsent);
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
  };

  const handleDecline = () => {
    setShowBanner(false);
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="casino_cookie_consent"
      style={{
        background: "#0A0A0A",
        padding: "16px",
        alignItems: "center",
        fontSize: "16px",
        position: "fixed",
        boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.3)",
        zIndex: 999999,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        width: "100%",
        display: showBanner ? "flex" : "none",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        transform: "translateZ(0)",
        color: "#ffffff",
      }}
      containerClasses="fixed-cookie-banner"
      buttonWrapperClasses="cookie-buttons"
      buttonStyle={{
        background: "#00E6FF",
        color: "black",
        fontSize: "15px",
        borderRadius: "6px",
        padding: "12px 24px",
        fontWeight: "500",
        margin: "0 10px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        whiteSpace: "nowrap",
        border: "none"
      }}
      declineButtonStyle={{
        background: "transparent",
        border: "2px solid #00E6FF",
        color: "white",
        fontSize: "15px",
        borderRadius: "6px",
        padding: "12px 24px",
        fontWeight: "500",
        margin: "0 10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap"
      }}
      expires={365}
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#00E6FF]/20 p-4 md:p-6 z-50">
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
            <div className="absolute w-[150px] h-[150px] rounded-full bg-[#00E6FF] blur-[80px] -bottom-20 -right-12 animate-float"></div>
            <div className="absolute w-[120px] h-[120px] rounded-full bg-[#00E6FF] blur-[60px] -bottom-10 -left-12 animate-float-delayed"></div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex-1">
            <h3 className="text-lg font-display text-white mb-2">We value your privacy</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-6 py-3 bg-[#00E6FF] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#00E6FF]/20 transition-all duration-300 whitespace-nowrap"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:border-[#00E6FF]/50 hover:ring-1 hover:ring-[#00E6FF]/50 transition-all duration-300 whitespace-nowrap"
            >
              Reject All
            </button>
            <Link 
              href="/cookie-policy" 
              className="w-full sm:w-auto px-6 py-3 text-gray-400 font-medium hover:text-[#00E6FF] transition-colors text-center"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cookie-banner {
          transform: translateY(${showBanner ? '0' : '100%'});
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
