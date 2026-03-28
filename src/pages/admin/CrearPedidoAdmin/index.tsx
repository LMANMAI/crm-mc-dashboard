import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import OrderPreview from "./sections/OrderPreview";
import OrderForm from "./sections/OrderForm";
import orderData from "./orderData.json";

const CrearPedidoAdminPage = () => {
  const [cliente, setCliente] = React.useState("");
  const [producto, setProducto] = React.useState("anillados"); // Default selection
  const [subproducto, setSubproducto] = React.useState("");
  const [cantidad, setCantidad] = React.useState<number>(11);
  const [observaciones, setObservaciones] = React.useState("");
  const [, setArchivo] = React.useState<File | null>(null);

  // Encontrar la info del producto seleccionado
  const selectedProduct = orderData.productos.find((p) => p.value === producto);

  // Filtrar los subproductos correspondientes al producto elegido
  const subproductosOpts = selectedProduct?.subproductos || [];

  return (
    <Box px={6} py={8} maxW="7xl" mx="auto">
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 420px" }}
        gap={{ base: 8, md: 10 }}
        alignItems="start"
      >
        <OrderPreview
          producto={selectedProduct?.label || ""}
          cantidad={cantidad}
        />

        <OrderForm
          cliente={cliente}
          setCliente={setCliente}
          producto={producto}
          setProducto={(val) => {
            setProducto(val);
            setSubproducto(""); // Reset subproducto al cambiar el producto
          }}
          subproducto={subproducto}
          setSubproducto={setSubproducto}
          cantidad={cantidad}
          setCantidad={setCantidad}
          observaciones={observaciones}
          setObservations={setObservaciones}
          setArchivo={setArchivo}
          options={{
            clientes: orderData.clientes,
            productos: orderData.productos,
            subproductos: subproductosOpts,
          }}
        />
      </Grid>
    </Box>
  );
};

export default CrearPedidoAdminPage;
