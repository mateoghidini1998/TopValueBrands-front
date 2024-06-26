"use client";
import React, { useEffect, useState } from "react";
import { Alert, Space } from "antd";
import { ConfigProvider } from "antd";

export enum CustomAlertOptions {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export enum CustomAlertTheme {
  LIGHT = "light",
  DARK = "dark",
}

type CustomAlertProps = {
  message: string;
  description: string;
  type: CustomAlertOptions;
  closable: boolean;
  showIcon: boolean;
  visible?: boolean;
  theme: CustomAlertTheme;
};

const CustomAlert = ({
  message,
  description,
  type,
  closable,
  showIcon,
  visible = false,
  theme,
}: CustomAlertProps) => {
  const [isDarkmode, setIsDarkmode] = useState(
    !(theme === CustomAlertTheme.DARK) ? "dark" : "light"
  );

  useEffect(() => {
    setIsDarkmode(!(theme === CustomAlertTheme.DARK) ? "dark" : "light");
  }, [theme]);

  return (
    <ConfigProvider
      theme={
        isDarkmode === "dark"
          ? {
              token: {
                colorText: "#fff",
                colorError: "#F5222D",
                colorErrorBorder: "#393E4F",
                colorErrorBg: "#1F2128",
                colorSuccessBg: "#1F2128",
                colorSuccessBorder: "#393E4F",
              },
            }
          : {
              token: {
                colorText: "#000",
                colorError: "#F5222D",
                colorErrorBorder: "#c2c2c2",
                colorErrorBg: "#c2c2c2",
                colorSuccessBg: "#c2c2c2",
                colorSuccessBorder: "#fff",
              },
            }
      }
    >
      <Space
        direction="vertical"
        style={{
          width: "fit-content",
          visibility: visible ? "visible" : "hidden",
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      >
        <Alert
          closable={closable}
          message={message}
          description={description}
          type={type}
          showIcon={showIcon}
        />
      </Space>
    </ConfigProvider>
  );
};

export default CustomAlert;
