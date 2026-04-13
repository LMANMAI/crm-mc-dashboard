import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import OrderPreview from "./sections/OrderPreview";
import OrderForm from "./sections/OrderForm";
import OrderSummary from "./sections/OrderSummary";
import OrderSuccess from "./sections/OrderSuccess";
import orderData from "./orderData.json";
import useFetch from "../../../hooks/useFetch";
import { ORDERS } from "../../../config/constants";

const MEDIOS_PAGO_LABELS: Record<string, string> = {
  efectivo: "Efectivo",
  cheque: "Cheque",
  mercadopago: "Mercado Pago",
};

interface CreatedOrder {
  id: string | number;
  [key: string]: unknown;
}

const CrearPedidoAdminPage = () => {
  const [step, setStep] = React.useState<"form" | "summary" | "success">("form");
  const [cliente, setCliente] = React.useState("");
  const [producto, setProducto] = React.useState("anillados");
  const [subproducto, setSubproducto] = React.useState("");
  const [cantidad, setCantidad] = React.useState<number>(11);
  const [observaciones, setObservaciones] = React.useState("");
  const [, setArchivo] = React.useState<File | null>(null);
  const [medioPago, setMedioPago] = React.useState("");
  const [comentariosPago, setComentariosPago] = React.useState("");
  const [createdOrderId, setCreatedOrderId] = React.useState<string | number>("");

  const { isLoading: isSaving, makeRequest } = useFetch<CreatedOrder>(ORDERS.CREATE);

  // Encontrar la info del producto seleccionado
  const selectedProduct = orderData.productos.find((p) => p.value === producto);

  // Subproductos del producto elegido
  const subproductosOpts = selectedProduct?.subproductos || [];

  // Precio unitario del subproducto seleccionado
  const precioUnitario =
    subproductosOpts.find((s) => s.value === subproducto)?.precio ?? 0;

  // Labels para resumen y pantalla de éxito
  const clienteData = (orderData.clientes?.items || []).find(
    (c) => String(c.id) === cliente
  );
  const clienteLabel =
    clienteData?.empresa?.trim() ||
    clienteData?.razonSocial?.trim() ||
    clienteData?.nombre?.trim() ||
    "";

  const subproductoLabel =
    subproductosOpts.find((s) => s.value === subproducto)?.label || "";

  const total = precioUnitario * cantidad;

  const handleSave = async () => {
    const payload = {
      clientId: cliente,
      productId: producto,
      subProductId: subproducto,
      quantity: cantidad,
      observations: observaciones,
      medioPago,
      comentariosPago,
      total,
      createdAt: new Date().toISOString(),
    };

    const result = await makeRequest({ method: "post", data: payload });
    setCreatedOrderId(result?.id ?? `MCK-${Date.now()}`);
    setStep("success");
  };

  const handleReset = () => {
    setStep("form");
    setCliente("");
    setProducto("anillados");
    setSubproducto("");
    setCantidad(11);
    setObservaciones("");
    setArchivo(null);
    setMedioPago("");
    setComentariosPago("");
    setCreatedOrderId("");
  };

  if (step === "success") {
    return (
      <Box px={6} py={8} maxW="7xl" mx="auto">
        <OrderSuccess
          orderId={createdOrderId}
          clienteLabel={clienteLabel}
          productoLabel={selectedProduct?.label || ""}
          subproductoLabel={subproductoLabel}
          total={total}
          onNuevoPedido={handleReset}
        />
      </Box>
    );
  }

  if (step === "summary") {
    return (
      <Box px={6} py={8} maxW="7xl" mx="auto">
        <OrderSummary
          clienteLabel={clienteLabel}
          productoLabel={selectedProduct?.label || ""}
          subproductoLabel={subproductoLabel}
          cantidad={cantidad}
          precioUnitario={precioUnitario}
          observaciones={observaciones}
          medioPagoLabel={MEDIOS_PAGO_LABELS[medioPago] || medioPago}
          comentariosPago={comentariosPago}
          isSaving={isSaving}
          onSave={handleSave}
          onNuevoPedido={handleReset}
        />
      </Box>
    );
  }

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
          precioUnitario={precioUnitario}
        />

        <OrderForm
          cliente={cliente}
          setCliente={setCliente}
          producto={producto}
          setProducto={(val) => {
            setProducto(val);
            setSubproducto("");
          }}
          subproducto={subproducto}
          setSubproducto={setSubproducto}
          cantidad={cantidad}
          setCantidad={setCantidad}
          observaciones={observaciones}
          setObservations={setObservaciones}
          setArchivo={setArchivo}
          medioPago={medioPago}
          setMedioPago={setMedioPago}
          comentariosPago={comentariosPago}
          setComentariosPago={setComentariosPago}
          onConfirm={() => setStep("summary")}
          options={{
            clientes: (orderData.clientes?.items || []).map((c) => ({
              label:
                c.empresa?.trim() || c.razonSocial?.trim() || c.nombre?.trim(),
              value: String(c.id),
            })),
            productos: orderData.productos,
            subproductos: subproductosOpts,
          }}
        />
      </Grid>
    </Box>
  );
};

export default CrearPedidoAdminPage;
