'use client';

import { useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

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
        background: "#1a1a1a",
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
        background: "#e50914",
        color: "white",
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
        border: "2px solid #e50914",
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
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#FF1745]/20 p-4 md:p-6 z-50">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-display text-white mb-2">We value your privacy</h3>
            <p className="text-[#C0C0C0] text-sm">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-[#FF1745] text-white font-display rounded hover:bg-[#D90429] transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-2 border border-[#FF1745]/20 text-white font-display rounded hover:bg-[#FF1745]/10 transition-colors"
            >
              Reject All
            </button>
            <Link 
              href="/cookie-policy" 
              className="px-6 py-2 text-[#C0C0C0] font-display hover:text-white transition-colors"
            >
              Learn more
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
