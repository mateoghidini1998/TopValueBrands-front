"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import jsPDF from "jspdf";

type QrCodeDialogProps = {
  palletNumber: string;
  palletId: number;
};

export function QrCodeDialog({ palletNumber, palletId }: QrCodeDialogProps) {
  const [src, setSrc] = useState<string>("");

  const generateQrCode = async () => {
    await QRCode.toDataURL(
      `http://localhost:3000/warehouse/storage/${palletId}`
    ).then(setSrc);
  };

  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.download = `pallet-${palletNumber}.png`;
    link.href = src;
    link.click();
  };

  // to download as PDF with details just return it and the we can doc.save();
  const createPDFWithDetailsAndQRCode = () => {
    const doc = new jsPDF();
    doc.text("Pallet Details", 10, 10);
    doc.text(`Pallet ID: ${palletId}`, 10, 20);
    doc.text(`Pallet Number: ${palletNumber}`, 10, 30);
    doc.addImage(src, "png", 10, 40, 100, 100);
    doc.save(`pallet-${palletNumber}.pdf`);
    return doc;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className="text-[#438EF3] hover:underline cursor-pointer"
          onClick={generateQrCode}
        >
          View QR
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-auto fixed inset-0 flex flex-col items-center justify-between max-h-[500px] transform translate-y-[40%] ">
        <DialogHeader>
          <DialogTitle>Pallet {palletNumber}</DialogTitle>
          <DialogDescription>
            Anyone who has this QR code will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Image src={src} width={250} height={250} alt="QR Code" />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              className="w-[250px]"
              type="button"
              variant="outline"
              onClick={downloadQrCode}
            >
              Download QR
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
