import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, TOOLS } from "@/data/tools";
import { getToolFaqs } from "@/data/toolFaqs";
import { ToolDetailClient } from "@/components/tools/ToolDetailClient";
import { env } from "@/lib/env";
import { safeJsonLd } from "@/lib/jsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all 19 tools at build time
export async function generateStaticParams() {
  return TOOLS.map((t) => ({
    slug: t.slug,
  }));
}

// Dynamic SEO metadata per tool
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested tool does not exist.",
    };
  }

  const title = `${tool.name} — ${tool.tagline}`;
  const description = `${tool.description} Free online academic & placement tool built for Indian college students. No ads. No BS.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${env.NEXT_PUBLIC_BASE_URL}/tools/${tool.slug}`,
    },
    keywords: [
      tool.name.toLowerCase(),
      tool.category,
      "indian college tools",
      "college calculator",
      "bunk attendance calculator",
      "cgpa to percentage",
      "campus placement preparation",
      "flunked.online",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${env.NEXT_PUBLIC_BASE_URL}/tools/${tool.slug}`,
      siteName: "Flunked",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const faqs = getToolFaqs(slug);

  // JSON-LD Structured Data for SoftwareApplication and FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        description: tool.description,
        url: `${env.NEXT_PUBLIC_BASE_URL}/tools/${tool.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(jsonLd),
          }}
        />
      )}
      <ToolDetailClient tool={tool} slug={slug} faqs={faqs} />
    </>
  );
}
