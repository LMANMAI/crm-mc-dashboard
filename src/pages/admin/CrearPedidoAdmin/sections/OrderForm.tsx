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
} from "@chakra-ui/react";
import { Select } from "../../../components";

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
  options: {
    clientes: { label: string; value: string }[];
    productos: { label: string; value: string }[];
    subproductos: { label: string; value: string }[];
  };
}

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
  options,
}) => {
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
            colorScheme="teal"
            size="sm"
            disabled={!cliente || !producto || !subproducto}
          >
            CONTINUAR
          </Button>
        </HStack>
      </Fieldset.Root>
    </Stack>
  );
};

export default OrderForm;
