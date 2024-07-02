import ConfirmAlert from "@/components/alerts/ConfirmAlert";
import CustomAlert, {
  CustomAlertOptions,
} from "@/components/alerts/CustomAlerts";
import useThemeContext from "@/contexts/theme.context";
import {
  TrackedProductContext,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
import { useEffect, useState } from "react";

type OrderProductType = {
  orderProducts: any[];
};

export const OrderSummary = ({ orderProducts }: OrderProductType) => {
  const {
    setTrackedProductsAddedToOrder,
    handleCreateOrder,
    getTotalPrice,
    trackedProductsAddedToOrder,
  } = useTrackedProductContext();
  const [notes, setNotes] = useState("");
  const { theme } = useThemeContext();

  const [customAlertProperties, setCustomAlertProperties] = useState({
    show: false,
    type: CustomAlertOptions.SUCCESS,
    message: "",
    description: "",
    visible: false,
  });

  const showCustomAlert = (
    alertType: CustomAlertOptions,
    message: string,
    description: string,
    visible: boolean
  ) => {
    setCustomAlertProperties({
      show: true,
      type: alertType,
      message,
      description,
      visible,
    });
  };

  const handleCleanOrder = () => {
    // Set the trackedProductsAddedToOrder to empty array
    setTrackedProductsAddedToOrder([]);
  };

  const createOrder = async (orderProducts: any, notes: string) => {
    try {
      handleCreateOrder(orderProducts, notes).then((result: any) => {
        // console.log(result);
        if (result?.success) {
          showCustomAlert(
            CustomAlertOptions.SUCCESS,
            "Order created successfully",
            "The order has been created successfully",
            true
          );
        } else {
          showCustomAlert(
            CustomAlertOptions.ERROR,
            "Error creating order",
            "An error occurred while creating the order",
            true
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
    setTrackedProductsAddedToOrder([]);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  // useEffect(() => {
  //   console.log("should render the order summary");
  // }, [setTrackedProductsAddedToOrder]);

  return (
    <>
      <CustomAlert
        theme={theme}
        message={customAlertProperties.message}
        description={customAlertProperties.description}
        type={customAlertProperties.type}
        visible={customAlertProperties.visible}
        closable={true}
        showIcon={true}
      />

      {trackedProductsAddedToOrder.length > 0 && (
        <div className="w-full border-solid border-[1px] rounded-lg border-gray-300 p-4 h-fit dark:text-white space-y-4 mb-12">
          <h6 className="font-bold">Order Summary</h6>
          <div className="flex justify-between items-center">
            <p>Order Number:</p>
            <p>The order number would be automatically generated</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Supplier:</p>
            <p>{orderProducts[0]?.supplier_name || "Error"}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Date:</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex justify-between items-center ">
            <p className="font-bold">Total:</p>
            <p>{`$ ${getTotalPrice(orderProducts)}`}</p>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2 min-w-[300px] w-auto">
              <p>Notes</p>
              <textarea
                onChange={(e) => handleNotesChange(e)}
                className="bg-dark w-full h-[100px] border-solid border-[1px] rounded-lg border-gray-300 p-4 dark:text-white"
                placeholder="Order Notes"
              />
            </div>
            <div className="flex gap-2 w-fit items-center justify-between">
              <button
                onClick={() => {
                  createOrder(orderProducts, notes);
                }}
                className="bg-[#438EF3] text-white rounded-lg p-2 w-[130px]"
              >
                Submit Order
              </button>
              <button
                onClick={handleCleanOrder}
                className="bg-[#393E4F] text-white rounded-lg p-2 w-[107px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
