import React from "react";
import { Stack } from "@chakra-ui/react";
import ProductInfo from "../components/ProductInfo";
import PriceSummary from "../components/PriceSummary";

interface OrderPreviewProps {
  producto: string;
  cantidad: number;
}

const OrderPreview: React.FC<OrderPreviewProps> = ({
  producto,
  cantidad,
}) => {
  return (
    <Stack gap={6}>
      <ProductInfo producto={producto} />
      <PriceSummary cantidad={cantidad} />
    </Stack>
  );
};

export default OrderPreview;
