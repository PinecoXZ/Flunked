"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Download, Share2, Copy, Check, MessageSquare, Sparkles } from "lucide-react";

interface ShareSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHARE_URL = "https://flunked.online";
const SHARE_TEXT =
  "Flunked — 19 tools for college students: 75% Bunk calculator, Placement readiness quiz, LinkedIn bio auditor & CGPA marriage prospects: https://flunked.online";

// Safe cross-browser rounded rectangle helper
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

export function ShareSiteModal({ isOpen, onClose }: ShareSiteModalProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setImageUrl(null);
      setImageBlob(null);
      return;
    }

    setIsGenerating(true);

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    ctx.imageSmoothingEnabled = true;

    // Helper: Neo-Brutalist Box (fill + black stroke + optional offset shadow)
    const drawNeoCard = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fill: string,
      borderWidth = 5,
      shadowOffset = 10
    ) => {
      if (shadowOffset > 0) {
        ctx.fillStyle = "#000000";
        drawRoundRect(ctx, x + shadowOffset, y + shadowOffset, w, h, r);
        ctx.fill();
      }

      ctx.fillStyle = fill;
      drawRoundRect(ctx, x, y, w, h, r);
      ctx.fill();

      if (borderWidth > 0) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = borderWidth;
        ctx.stroke();
      }
    };

    // 1. Warm Off-White Graph Canvas Background
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(0, 0, 1080, 1350);

    // Subtle graph grid lines
    ctx.strokeStyle = "rgba(0, 0, 0, 0.045)";
    ctx.lineWidth = 2;
    for (let x = 0; x <= 1080; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1350);
      ctx.stroke();
    }
    for (let y = 0; y <= 1350; y += 36) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // 2. Main Outer Card
    drawNeoCard(44, 44, 992, 1262, 32, "#FFFFFF", 6, 12);

    // 3. Header: Logo, Tagline, & "19 Tools" Badge
    // Logo "Flunked"
    ctx.fillStyle = "#000000";
    ctx.font = "900 52px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Flunked", 84, 124);

    ctx.fillStyle = "#555555";
    ctx.font = "800 15px monospace";
    ctx.fillText("COLLEGE SURVIVAL CALCULATORS", 86, 150);

    // Pill Badge: "19 FREE CALCULATORS"
    drawNeoCard(700, 80, 296, 56, 14, "#FFE600", 4, 5);
    ctx.fillStyle = "#000000";
    ctx.font = "900 19px monospace";
    ctx.textAlign = "center";
    ctx.fillText("⚡ 19 FREE CALCULATORS", 848, 115);

    // Header divider line
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(84, 180);
    ctx.lineTo(996, 180);
    ctx.stroke();

    // 4. Hero Banner (Signature Flunked Yellow Card)
    drawNeoCard(84, 210, 912, 290, 24, "#FFE600", 6, 10);

    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.font = "900 58px system-ui, -apple-system, sans-serif";
    ctx.fillText("SAVE YOUR SEMESTER.", 540, 305);

    ctx.font = "800 24px monospace";
    ctx.fillStyle = "#000000";
    ctx.fillText("ATTENDANCE · PLACEMENTS · LINKEDIN · RISHTA INDEX", 540, 362);

    // White Pill in Hero
    drawNeoCard(240, 400, 600, 56, 14, "#FFFFFF", 4, 4);
    ctx.fillStyle = "#000000";
    ctx.font = "900 20px monospace";
    ctx.fillText("100% CLIENT-SIDE · ZERO BS · NO ADS", 540, 436);

    // 5. 2x2 Feature Showcase Cards
    const cardW = 440;
    const cardH = 265;
    const coords = [
      { x: 84, y: 535 },
      { x: 556, y: 535 },
      { x: 84, y: 830 },
      { x: 556, y: 830 },
    ];

    const cards = [
      {
        bg: "#E0F2FE", // Soft sky blue
        title: "📚 BUNK CALCULATOR",
        sub: "Safe 75% cutoff allowances",
        sample: "Attended: 42/50 (84%)",
        badge: "✓ Safe to bunk 6 classes",
        badgeBg: "#DCFCE7",
        badgeColor: "#15803D",
      },
      {
        bg: "#D1FAE5", // Mint green
        title: "🎯 PLACEMENT READINESS",
        sub: "DSA, resume & core mock quiz",
        sample: "Tier: Product Ready (78/100)",
        badge: "⚡ 5 high-priority fix areas",
        badgeBg: "#CFFAFE",
        badgeColor: "#0E7490",
      },
      {
        bg: "#FEF3C7", // Amber
        title: "💼 LINKEDIN BIO AUDITOR",
        sub: "Scores cringe About sections",
        sample: "Paste bio → Instant audit",
        badge: "🔥 Score: 4.5/10 · Actionable fixes",
        badgeBg: "#FFEDD5",
        badgeColor: "#C2410C",
      },
      {
        bg: "#FCE7F3", // Soft rose
        title: "💍 MARRIAGE PROSPECTS",
        sub: "CGPA to arranged rishta index",
        sample: "CGPA 7.8 · Tier 2 · CS Branch",
        badge: "😂 Rishta Score: 68/100 (Satire)",
        badgeBg: "#FEE2E2",
        badgeColor: "#B91C1C",
      },
    ];

    cards.forEach((c, i) => {
      const pos = coords[i];

      // Outer card box
      drawNeoCard(pos.x, pos.y, cardW, cardH, 20, c.bg, 5, 8);

      // Card Title
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      ctx.font = "900 22px monospace";
      ctx.fillText(c.title, pos.x + 22, pos.y + 46);

      // Card Subtitle
      ctx.font = "600 18px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#333333";
      ctx.fillText(c.sub, pos.x + 22, pos.y + 82);

      // Inner Sample Container Box
      drawNeoCard(pos.x + 18, pos.y + 110, cardW - 36, 126, 14, "#FFFFFF", 3, 3);

      // Sample data line
      ctx.font = "700 17px monospace";
      ctx.fillStyle = "#666666";
      ctx.fillText(c.sample, pos.x + 36, pos.y + 152);

      // Metric Badge inside box
      drawNeoCard(pos.x + 32, pos.y + 175, cardW - 64, 46, 10, c.badgeBg, 2, 0);
      ctx.fillStyle = c.badgeColor;
      ctx.font = "900 17px monospace";
      ctx.fillText(c.badge, pos.x + 48, pos.y + 204);
    });

    // 6. Bottom Bar: Clean Domain URL & Callout
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(84, 1130);
    ctx.lineTo(996, 1130);
    ctx.stroke();

    // Domain Pill
    drawNeoCard(84, 1160, 340, 68, 16, "#FFE600", 5, 6);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.font = "900 30px monospace";
    ctx.fillText("flunked.online", 254, 1205);

    // Right Arrow Callout
    ctx.textAlign = "right";
    ctx.fillStyle = "#000000";
    ctx.font = "900 24px system-ui, -apple-system, sans-serif";
    ctx.fillText("Free tools for Indian students →", 996, 1204);

    // Export to PNG data URL and Blob
    try {
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl);
      canvas.toBlob((blob) => {
        if (blob) setImageBlob(blob);
      }, "image/png");
    } catch (err) {
      console.error("Canvas export error:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Native Mobile Share (attaches the high-res PNG file)
  const handleNativeShare = async () => {
    if (!imageBlob && !imageUrl) {
      handleDownload();
      return;
    }

    try {
      const blob = imageBlob || (imageUrl ? await (await fetch(imageUrl)).blob() : null);
      if (!blob) return;

      const file = new File([blob], "flunked-card.png", { type: "image/png" });

      if (
        typeof navigator !== "undefined" &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Flunked.online — College Survival Calculators",
          text: SHARE_TEXT,
        });
        return;
      }

      // Fallback text share if browser doesn't support file attachment
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Flunked.online — College Survival Calculators",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") return;
    }

    handleDownload();
  };

  // 2. Download Image PNG
  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "flunked-college-survival-tools.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 3. WhatsApp Direct Share
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `*Flunked.online — College Survival Suite* 🎓\n\n` +
        `Tools every Indian student needs right now:\n` +
        `• 📚 *Bunk Calculator*: Safe 75% attendance limits & skippable classes\n` +
        `• 🎯 *Placement Readiness Quiz*: Test your DSA, resume & project readiness\n` +
        `• 💼 *LinkedIn Bio Auditor*: Scores & roasts cringe About sections out of 10\n` +
        `• 💍 *CGPA → Marriage Prospects*: Satirical arranged rishta readiness index\n\n` +
        `Check your scores here: ${SHARE_URL}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // 4. Copy Image PNG to Clipboard
  const handleCopyImage = async () => {
    if (!imageBlob && !imageUrl) {
      handleCopyLink();
      return;
    }

    try {
      const blob = imageBlob || (imageUrl ? await (await fetch(imageUrl)).blob() : null);
      if (!blob) return;

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    } catch {
      handleCopyLink();
    }
  };

  // 5. Copy Official Link
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(SHARE_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // 6. Copy Clean Message
  const handleCopyText = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(SHARE_TEXT);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Share Flunked with Friends"
    >
      <div className="relative w-full max-w-lg bg-white border-2 border-black rounded-2xl shadow-neo-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-black bg-flunked-yellow">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
            <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
              Share Flunked With Friends
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg bg-white hover:bg-black hover:text-white border-2 border-black text-black transition cursor-pointer shadow-neo-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body - Image Preview */}
        <div className="p-4 sm:p-5 overflow-y-auto flex flex-col items-center bg-[#F8F7F4]">
          {isGenerating || !imageUrl ? (
            <div className="w-full max-w-[320px] aspect-[4/5] rounded-xl border-2 border-black bg-white shadow-neo flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-4 border-black border-t-flunked-yellow animate-spin" />
              <p className="font-mono text-xs font-bold text-black">
                Rendering Pixel-Perfect Card...
              </p>
            </div>
          ) : (
            <div className="relative group max-w-[320px] sm:max-w-[340px] rounded-xl border-2 border-black bg-white shadow-neo overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Flunked Neo-Brutalist Share Card"
                className="w-full h-auto object-cover select-none block"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black text-white text-[10px] font-mono font-black border border-white/40 shadow-xs">
                1080 × 1350 PNG
              </div>
            </div>
          )}

          {/* Clean URL display bar with Copy button */}
          <div className="w-full max-w-[340px] mt-3.5 flex items-center gap-2 bg-white border-2 border-black rounded-xl p-1.5 shadow-neo-sm">
            <span className="px-2 font-mono text-xs font-bold text-zinc-800 truncate select-all">
              {SHARE_URL}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-flunked-yellow hover:bg-[#FFD000] border border-black font-mono font-black text-xs text-black transition cursor-pointer shrink-0 shadow-xs active:translate-y-px"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="p-4 border-t-2 border-black bg-white space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Native Share */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-cyan-300 hover:bg-cyan-200 border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Share Image</span>
            </button>

            {/* Download PNG */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download PNG</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* WhatsApp Direct */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>WhatsApp</span>
            </button>

            {/* Copy Image */}
            <button
              type="button"
              onClick={handleCopyImage}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-zinc-100 border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
            >
              {copiedImage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00C853] stroke-[3]" />
                  <span>Image Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copy Image</span>
                </>
              )}
            </button>
          </div>

          {/* Copy Full Message Bar */}
          <button
            type="button"
            onClick={handleCopyText}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#F0EFEB] hover:bg-[#E5E3DC] border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
          >
            {copiedText ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00C853] stroke-[3]" />
                <span>Message Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copy Share Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
