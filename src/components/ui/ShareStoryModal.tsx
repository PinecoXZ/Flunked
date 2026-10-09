"use client";

import React, { useEffect, useState } from "react";
import { X, Download, Share2, Copy, Check, MessageSquare, Sparkles } from "lucide-react";
import { type ResultStatus } from "./ResultCard";

const STATUS_COLORS_MAP: Record<ResultStatus, { bg: string; text: string; label: string }> = {
  safe: { bg: "#00C853", text: "#000000", label: "SAFE ZONE" },
  warning: { bg: "#FFD000", text: "#000000", label: "THIN ICE" },
  danger: { bg: "#FF3333", text: "#FFFFFF", label: "DANGER" },
  critical: { bg: "#D90429", text: "#FFFFFF", label: "COOKED" },
};

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  categoryLabel?: string;
  metric?: string | number;
  metricLabel?: string;
  headline: string;
  verdict: string;
  status: ResultStatus;
  breakdown?: { label: string; value: string | number }[];
  toolSlug?: string;
}

export function ShareStoryModal({
  isOpen,
  onClose,
  toolName,
  categoryLabel = "Campus Tool",
  metric,
  metricLabel,
  headline,
  verdict,
  status,
  breakdown = [],
  toolSlug,
}: ShareStoryModalProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

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

    if (!ctx) return;

    const statusColors = STATUS_COLORS_MAP[status] || STATUS_COLORS_MAP.warning;

    // Helper: Rounded rectangle with border and shadow
    const drawNeoCard = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fill: string,
      hasShadow = true
    ) => {
      if (hasShadow) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.roundRect(x + 12, y + 12, w, h, r);
        ctx.fill();
      }
      ctx.fillStyle = fill;
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
      ctx.stroke();
    };

    // Helper: Wrap text
    const wrapText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      maxLines = 4
    ) => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;
      let linesDrawn = 0;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[i] + " ";
          currentY += lineHeight;
          linesDrawn++;
          if (linesDrawn >= maxLines) {
            ctx.fillText(line.trim() + "...", x, currentY);
            return currentY;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      return currentY + lineHeight;
    };

    // 1. Background Fill
    ctx.fillStyle = "#FDFBF7";
    ctx.fillRect(0, 0, 1080, 1350);

    // Subtle Grid pattern
    ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
    ctx.lineWidth = 2;
    for (let x = 0; x < 1080; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1350);
      ctx.stroke();
    }
    for (let y = 0; y < 1350; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // Outer Main Card
    drawNeoCard(50, 50, 980, 1250, 36, "#FFFFFF", true);

    // 2. Header
    // Flunked logo
    ctx.font = "900 46px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText("Flunked", 95, 135);

    // Category Tag (Right aligned)
    ctx.fillStyle = "#FDFBF7";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(760, 92, 220, 50, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#000000";
    ctx.font = "900 20px monospace";
    ctx.textAlign = "center";
    ctx.fillText(categoryLabel.toUpperCase(), 870, 124);

    // Horizontal Divider
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(90, 175);
    ctx.lineTo(990, 175);
    ctx.stroke();

    // 3. Tool Title & Status Pill
    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.font = "900 36px system-ui, -apple-system, sans-serif";
    ctx.fillText(toolName, 95, 235);

    // Status Pill
    ctx.fillStyle = statusColors.bg;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(770, 200, 210, 48, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = statusColors.text;
    ctx.font = "900 22px monospace";
    ctx.textAlign = "center";
    ctx.fillText(statusColors.label, 875, 233);

    // 4. Center Hero Metric Card
    drawNeoCard(95, 280, 890, 360, 28, "#FDFBF7", true);

    if (metric !== undefined) {
      ctx.textAlign = "center";
      ctx.font = "900 110px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = status === "safe" ? "#00A843" : status === "warning" ? "#000000" : "#D90429";
      ctx.fillText(String(metric), 540, 415);

      if (metricLabel) {
        ctx.font = "700 26px monospace";
        ctx.fillStyle = "#555555";
        ctx.fillText(metricLabel, 540, 470);
      }
    }

    ctx.font = "900 42px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    wrapText(headline, 540, metric !== undefined ? 545 : 460, 830, 52, 2);

    // 5. Verdict Box (Yellow Neo Box)
    drawNeoCard(95, 680, 890, 290, 24, "#FFF8D6", true);

    // Header in Verdict Box
    ctx.textAlign = "left";
    ctx.font = "900 22px monospace";
    ctx.fillStyle = "#000000";
    ctx.fillText("HONEST STUDENT VERDICT", 135, 735);

    // Verdict Quote
    ctx.font = "italic 700 32px Georgia, serif";
    ctx.fillStyle = "#000000";
    wrapText(`“${verdict}”`, 135, 790, 810, 46, 3);

    // 6. Breakdown Parameters (if available)
    if (breakdown.length > 0) {
      const pillWidth = (890 - (breakdown.length - 1) * 20) / breakdown.length;
      breakdown.forEach((item, idx) => {
        const px = 95 + idx * (pillWidth + 20);
        drawNeoCard(px, 1000, pillWidth, 120, 16, "#FFFFFF", false);
        ctx.textAlign = "center";
        ctx.font = "700 18px monospace";
        ctx.fillStyle = "#666666";
        ctx.fillText(item.label.toUpperCase(), px + pillWidth / 2, 1040);

        ctx.font = "900 34px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#000000";
        ctx.fillText(String(item.value), px + pillWidth / 2, 1088);
      });
    }

    // 7. Footer Bar
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(90, 1170);
    ctx.lineTo(990, 1170);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.font = "900 24px monospace";
    const brandX = 95;
    ctx.fillText("flunked.online", brandX, 1225);
    const brandWidth = ctx.measureText("flunked.online").width;

    ctx.font = "600 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#666666";
    ctx.fillText(
      "· Free survival tools for Indian college students",
      brandX + brandWidth + 14,
      1225
    );

    ctx.textAlign = "right";
    ctx.fillStyle = "#000000";
    ctx.font = "900 24px monospace";
    ctx.fillText("Calculate yours →", 985, 1225);

    // Export to Data URL and Blob
    try {
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl);
      canvas.toBlob((blob: Blob | null) => {
        if (blob) setImageBlob(blob);
      }, "image/png");
    } catch (e) {
      console.error("Canvas export failed:", e);
    } finally {
      setIsGenerating(false);
    }
  }, [isOpen, toolName, categoryLabel, metric, metricLabel, headline, verdict, status, breakdown]);

  if (!isOpen) return null;

  // 1. Native Mobile Share (Direct image share to WhatsApp/Instagram)
  const handleNativeShare = async () => {
    if (!imageBlob && !imageUrl) return;

    try {
      const blob = imageBlob || (imageUrl ? await (await fetch(imageUrl)).blob() : null);
      if (!blob) return;
      const file = new File([blob], `flunked-${toolSlug || "result"}.png`, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${toolName} | Flunked`,
          text: `${headline} — ${verdict} | Check yours at flunked.online`,
        });
        return;
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") return;
    }

    // Fallback: Download
    handleDownload();
  };

  // 2. Download Image PNG
  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `flunked-${toolSlug || "result"}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 3. Direct WhatsApp Web Text + Link Share
  const handleWhatsAppShare = () => {
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : "https://flunked.online";
    const text = encodeURIComponent(
      `*${toolName} Status via Flunked*\n\n` +
        `🔥 *${headline}*\n` +
        `"${verdict}"\n\n` +
        `Calculate yours: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // 4. Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!imageBlob && !imageUrl) return;
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

  // 5. Copy Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Story Card Share Modal"
    >
      <div className="relative w-full max-w-lg bg-white border-2 border-black rounded-2xl shadow-neo-lg overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-black bg-flunked-yellow">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
            <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
              Shareable Story Card
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
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col items-center bg-flunked-bg">
          {isGenerating || !imageUrl ? (
            <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-xl border-2 border-black bg-white shadow-neo flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-4 border-black border-t-flunked-yellow animate-spin" />
              <p className="font-mono text-xs font-bold text-black">Generating Story Card...</p>
            </div>
          ) : (
            <div className="relative group max-w-[280px] sm:max-w-[320px] rounded-xl border-2 border-black bg-white shadow-neo overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`${toolName} ${headline} story card preview for WhatsApp and Instagram`}
                className="w-full h-auto object-cover select-none"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black text-white text-[10px] font-mono font-black border border-white/50">
                1080 × 1350
              </div>
            </div>
          )}

          <p className="text-[11px] font-mono text-black/70 font-bold mt-3 text-center">
            Optimized for Instagram Stories, WhatsApp Status &amp; batch chats.
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="p-4 border-t-2 border-black bg-white space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Primary: Share / Download */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Share Image</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-flunked-bg border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
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

            {/* Copy image or link */}
            <button
              type="button"
              onClick={handleCopyImage}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-flunked-bg border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition cursor-pointer"
            >
              {copiedImage || copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00C853] stroke-[3]" />
                  <span>{copiedImage ? "Copied Image!" : "Copied Link!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copy Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
