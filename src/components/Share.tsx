import React, { useEffect } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title = "Check this out",
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Share</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            ✕
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-4">

          <button
            onClick={shareWhatsApp}
            className="rounded-xl bg-green-500 py-3 font-medium text-white hover:bg-green-600 transition"
          >
            Share on WhatsApp
          </button>

          <button
            onClick={shareTwitter}
            className="rounded-xl bg-black py-3 font-medium text-white hover:opacity-80 transition"
          >
            Share on Twitter (X)
          </button>

          <button
            onClick={copyLink}
            className="rounded-xl border border-gray-300 py-3 font-medium hover:bg-gray-100 transition"
          >
            Copy Link
          </button>

        </div>
      </div>
    </div>
  );
};