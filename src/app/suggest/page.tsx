import type { Metadata } from "next";
import { SuggestForm } from "@/components/suggest/SuggestForm";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata: Metadata = {
  title: "Suggest a Student Tool",
  description:
    "Have an idea for a college calculator or academic survival tool? Suggest it here. Built by students, for students.",
  alternates: {
    canonical: "https://flunked.online/suggest",
  },
};

export default function SuggestPage() {
  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
      {/* Breadcrumbs & Back button */}
      <SubpageHeader breadcrumbLabel="Suggest a Tool" backLabel="Back to Hub" />

      <SuggestForm />
    </div>
  );
}
