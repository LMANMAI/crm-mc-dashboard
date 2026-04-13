import React from "react";
import { Stack } from "@chakra-ui/react";
import ProductInfo from "../components/ProductInfo";
import PriceSummary from "../components/PriceSummary";

interface OrderPreviewProps {
  producto: string;
  cantidad: number;
  precioUnitario: number;
}

const OrderPreview: React.FC<OrderPreviewProps> = ({
  producto,
  cantidad,
  precioUnitario,
}) => {
  return (
    <Stack gap={6}>
      <ProductInfo producto={producto} />
      <PriceSummary cantidad={cantidad} precioUnitario={precioUnitario} />
    </Stack>
  );
};

export default OrderPreview;
