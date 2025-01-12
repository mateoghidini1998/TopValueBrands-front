"use client";

import React from "react";
import { QrCodeDialog } from "../qr-code-dialog";
import classNames from "classnames";

const QrCode = ({ data }: any) => {
  return (
    <div className="w-full flex justify-end items-center ">
      <QrCodeDialog
        classNames="bg-[#438EF3] text-white hover:bg-[#6daaf8] px-4 py-2 rounded-md w-fit gap-y-3 gap-x-6 cursor-pointer"
        palletNumber={data.pallet_number}
        palletId={data.id}
        orderNumber={data.purchaseOrder.order_number}
      />
    </div>
  );
};

export default QrCode;
