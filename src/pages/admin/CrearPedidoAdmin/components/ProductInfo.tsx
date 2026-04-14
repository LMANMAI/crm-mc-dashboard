import React from "react";
import { Stack, Image, Text } from "@chakra-ui/react";

interface ProductInfoProps {
  producto: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ producto }) => {
  return (
    <Stack gap={4}>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200"
        alt="Producto"
        borderRadius="md"
        objectFit="cover"
        maxH="320px"
      />

      <Text fontSize="sm" color="gray.600">
        <Text as="span" fontWeight="semibold">
          Producto:
        </Text>{" "}
        {producto || "No seleccionado"}
      </Text>

      <Text fontSize="sm" color="gray.600" lineHeight="tall">
        Este producto es para anillar copias que traes o para anillar copias que
        vas a hacer con nosotros. Debes elegir el anillado que más se acerque a
        la cantidad de hojas que vas a querer anillar (la cantidad de hojas que
        se anillan depende del gramaje del papel. La referencia indicada es
        estipulada para hoja A4 de 80g).
        <br />
        Podés elegir anillado plástico espiralado o anillado metálico
        (ringwire). Incluye tapa y contratapa plástica.
      </Text>
    </Stack>
  );
};

export default ProductInfo;
