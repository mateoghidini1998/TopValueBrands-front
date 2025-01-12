"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-[100px]"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
