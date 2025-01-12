"use client";

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
import jsPDF from "jspdf";
import Image from "next/image";
import QRCode from "qrcode";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

type QrCodeDialogProps = {
  palletNumber: string;
  palletId: number;
  open?: boolean;
  orderNumber: string;
  classNames?: string;
};

export function QrCodeDialog({
  palletNumber,
  palletId,
  open = false,
  orderNumber,
  classNames,
}: QrCodeDialogProps) {
  const [src, setSrc] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false);

  const generateQrCode = useCallback(async () => {
    await QRCode.toDataURL(
      `${process.env.NEXT_PUBLIC_FRONT_URL}/warehouse/storage/${palletId}`
    ).then(setSrc);
  }, [palletId]);

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

  // Generar el QR automáticamente si el diálogo está abierto
  useEffect(() => {
    if (isOpen) {
      generateQrCode();
    }
  }, [isOpen, generateQrCode]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span
          className={
            classNames
              ? classNames
              : "text-[#438EF3] hover:underline cursor-pointer"
          }
          onClick={generateQrCode}
        >
          View QR
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-auto fixed inset-0 flex flex-col items-center justify-between max-h-[500px] transform translate-y-[40%] ">
        <DialogHeader>
          <DialogTitle>Pallet {palletNumber}</DialogTitle>
          <span>Purchase Order Number: {orderNumber}</span>
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
