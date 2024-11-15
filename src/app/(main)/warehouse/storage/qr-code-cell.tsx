"use client";
import { QrCodeDialog } from "./qr-code-dialog";

type QrCodeCellProps = {
  incomingOrder: any;
};

const QrCodeCell = ({ incomingOrder }: QrCodeCellProps) => {
  return (
    <QrCodeDialog
      palletNumber={incomingOrder.pallet_number}
      palletId={incomingOrder.id}
    />
  );
};

export default QrCodeCell;
