import React, { useState } from "react";
import { Button, ConfigProvider, Modal } from "antd";
import "./OrderModal.css";

type OrderModalProps = {
  downloadButton: any;
  approveButton: any;
  rejectButton: any;
  order: any;
};

const OrderModal = ({
  downloadButton,
  approveButton,
  rejectButton,
  // order,
}: OrderModalProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            // Estilos personalizados para el componente Modal
            contentBg: "#1F2128",
            headerBg: "#1F2128",
            footerBg: "#1F2128",
            colorText: "#F8FAFC",
            titleColor: "#F8FAFC",
            colorIcon: "#F8FAFC",
            colorIconHover: "#F8FAFC",
          },
        },
        token: {
          // Seed Token
        },
      }}
    >
      <section className="w-[full] h-full">
        <Button
          type="primary"
          onClick={showModal}
          className="dark:bg-dark dark:text-white"
        >
          Open Modal with customized footer
        </Button>
        <Modal
          open={open}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[downloadButton, approveButton, rejectButton]}
          className="dark:bg-dark dark:text-white w-[1000px]" // Aquí aplicas las clases de Tailwind CSS
          style={{ width: "1000px" }}
        >
          <p className="dark:text-white">Some contents...</p>
          <p className="dark:text-white">Some contents...</p>
          <p className="dark:text-white">Some contents...</p>
          <p className="dark:text-white">Some contents...</p>
          <p className="dark:text-white">Some contents...</p>
        </Modal>
      </section>
    </ConfigProvider>
  );
};

export default OrderModal;
