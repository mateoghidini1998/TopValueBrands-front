"use client";

import React from "react";
import { QrCodeDialog } from "../qr-code-dialog";

const QrCode = ({ data }: any) => {
  return (
    <div>
      <QrCodeDialog
        palletNumber={data.pallet_number}
        palletId={data.id}
        open={true}
        orderNumber={data.purchaseOrder.order_number}
      />
    </div>
  );
};

export default QrCode;
