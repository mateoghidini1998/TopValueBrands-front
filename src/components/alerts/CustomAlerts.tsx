import React from "react";
import { Alert, Space } from "antd";
import { ConfigProvider } from "antd";

export enum CustomAlertOptions {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

type CustomAlertProps = {
  message: string;
  description: string;
  type: CustomAlertOptions;
  closable: boolean;
  showIcon: boolean;
  closabel?: boolean;
  visible?: boolean;
};

const CustomAlert = ({
  message,
  description,
  type,
  closable,
  showIcon,
  visible = false,
}: CustomAlertProps) => (
  <ConfigProvider
    theme={{
      token: {
        colorText: "#fff",
        
        colorError: "#F5222D",
        colorErrorBorder:"#393E4F",
        colorErrorBg: "#1F2128",

        colorSuccessBg: "#1F2128",
        colorSuccessBorder:"#393E4F",
      },
    }}
  >
    <Space
      direction="vertical"
      style={{
        width: "fit-content",
        visibility: `${visible ? "visible" : "hidden"}`,
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "1000",
      }}
    >
      <Alert
        closable={false}
        message={message}
        description={description}
        type={type}
        showIcon={showIcon}
      />
    </Space>
  </ConfigProvider>
);

export default CustomAlert;
