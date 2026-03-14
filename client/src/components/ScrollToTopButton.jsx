import React from "react";
import { ChevronUp } from "lucide-react";

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-1 cursor-pointer right-1 bg-slate-800 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg z-50"
    >
      <ChevronUp size={15} />
    </button>
  );
}

export default ScrollToTopButton;
