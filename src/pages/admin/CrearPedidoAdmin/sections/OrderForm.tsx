import React from "react";
import {
  Heading,
  Stack,
  Fieldset,
  Field,
  Input,
  Textarea,
  HStack,
  Button,
  Text,
  Box,
  Separator,
} from "@chakra-ui/react";
import { Select } from "../../../../components";

interface OrderFormProps {
  cliente: string;
  setCliente: (val: string) => void;
  producto: string;
  setProducto: (val: string) => void;
  subproducto: string;
  setSubproducto: (val: string) => void;
  cantidad: number;
  setCantidad: (val: number) => void;
  observaciones: string;
  setObservations: (val: string) => void;
  setArchivo: (file: File | null) => void;
  medioPago: string;
  setMedioPago: (val: string) => void;
  comentariosPago: string;
  setComentariosPago: (val: string) => void;
  onConfirm: () => void;
  options: {
    clientes: { label: string; value: string }[];
    productos: { label: string; value: string }[];
    subproductos: { label: string; value: string }[];
  };
}

const MEDIOS_PAGO = [
  { label: "Efectivo", value: "efectivo" },
  { label: "Cheque", value: "cheque" },
  { label: "Mercado Pago", value: "mercadopago" },
];

const OrderForm: React.FC<OrderFormProps> = ({
  cliente,
  setCliente,
  producto,
  setProducto,
  subproducto,
  setSubproducto,
  cantidad,
  setCantidad,
  observaciones,
  setObservations,
  setArchivo,
  medioPago,
  setMedioPago,
  comentariosPago,
  setComentariosPago,
  onConfirm,
  options,
}) => {
  const [showPayment, setShowPayment] = React.useState(false);

  return (
    <Stack gap={5}>
      <Heading size="md" color="gray.700">
        ¿Qué querés cotizar?
      </Heading>

      <Fieldset.Root size="sm" gap={4}>
        <Field.Root>
          <Field.Label>Cliente</Field.Label>
          <Select
            options={options.clientes}
            value={cliente}
            onChange={setCliente}
            multiple={false}
            placeholder="Seleccione un cliente"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Producto</Field.Label>
          <Select
            options={options.productos}
            value={producto}
            onChange={setProducto}
            multiple={false}
            placeholder="Seleccione un producto"
            disabled={!cliente}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Subproducto</Field.Label>
          <Select
            options={options.subproductos}
            value={subproducto}
            onChange={setSubproducto}
            multiple={false}
            placeholder="Seleccione un subproducto"
            disabled={!producto}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Cantidad</Field.Label>
          <Input
            type="number"
            size="sm"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            min={1}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Observaciones</Field.Label>
          <Textarea
            rows={4}
            size="sm"
            value={observaciones}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Seleccioná el archivo a imprimir</Field.Label>
          <Input
            type="file"
            size="sm"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          />
          <Text mt={1} fontSize="xs" color="gray.500">
            Peso máximo 50MB
          </Text>
        </Field.Root>

        <HStack>
          <Button
            colorPalette="teal"
            size="sm"
            disabled={!cliente || !producto || !subproducto}
            onClick={() => setShowPayment(true)}
          >
            CONTINUAR
          </Button>
        </HStack>

        {showPayment && (
          <Box>
            <Separator my={4} />
            <Heading size="sm" color="gray.700" mb={4}>
              Información de pago
            </Heading>
            <Stack gap={4}>
              <Field.Root>
                <Field.Label>Medio de pago</Field.Label>
                <Select
                  options={MEDIOS_PAGO}
                  value={medioPago}
                  onChange={setMedioPago}
                  multiple={false}
                  placeholder="Seleccione un medio de pago"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Comentarios</Field.Label>
                <Textarea
                  rows={3}
                  size="sm"
                  placeholder="Aclaraciones sobre el pago..."
                  value={comentariosPago}
                  onChange={(e) => setComentariosPago(e.target.value)}
                />
              </Field.Root>

              <HStack>
                <Button
                  colorPalette="teal"
                  size="sm"
                  disabled={!medioPago}
                  onClick={onConfirm}
                >
                  CONFIRMAR PEDIDO
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPayment(false)}
                >
                  VOLVER
                </Button>
              </HStack>
            </Stack>
          </Box>
        )}
      </Fieldset.Root>
    </Stack>
  );
};

export default OrderForm;
