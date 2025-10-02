import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Stack,
  Button,
  Input,
  Textarea,
  HStack,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import { SectionBox, TitleWithIcon, Table } from "../../components";

interface Order {
  id: string;
  fechaCarga: string;
  cliente: string;
  email: string;
  trabajo: string;
  fechaOrden: string;
  estado: string;
  precio: number;
  subproducto: string;
  medida: string;
  cantidad: number;
  terminaciones: string;
  archivoLink?: string;
  observaciones?: string;
  fechaEntrega: string;
  pagos: Array<{ fecha: string; tipo: string; monto: number }>;
}

const DetailOrderClientePage: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setOrder({
        id: "85201",
        fechaCarga: "29/07/2025",
        cliente: "javi.c97@hotmail.com",
        email: "javi.c97@hotmail.com",
        trabajo: "Anillados",
        fechaOrden: "29/07/2025",
        estado: "1. Pendiente",
        precio: 2241,
        subproducto: "Espiral plástico 9mm hasta 50 hojas",
        medida: "0x0",
        cantidad: 1,
        terminaciones: "No posee",
        archivoLink: "",
        observaciones: "",
        fechaEntrega: "29/07/2025",
        pagos: [],
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading || !order) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  // columnas para "Pagos realizados"
  const pagosColumns = [
    { header: "Fecha", accessor: "fecha" },
    { header: "Tipo", accessor: "tipo" },
    {
      header: "Monto",
      accessor: "monto",
      textAlign: "right" as const,
    },
  ];

  return (
    <Stack gap={6} p={6}>
      <TitleWithIcon
        icon="📝"
        title={`Order N° ${order.id}`}
        subtitle={`Fecha de Carga ${order.fechaCarga}`}
      />

      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={[12, 6]}>
          <SectionBox title="Información del pedido">
            <Stack gap={2}>
              <HStack>
                <Text fontWeight="bold">Order N°:</Text>
                <Text>{order.id}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Cliente:</Text>
                <Text>{order.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Trabajo:</Text>
                <Text>{order.trabajo}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Fecha de la orden:</Text>
                <Text>{order.fechaOrden}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Estado:</Text>
                <Tag.Root colorPalette="yellow">{order.estado}</Tag.Root>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Precio:</Text>
                <Text>${order.precio.toLocaleString()}</Text>
              </HStack>
            </Stack>
          </SectionBox>
        </GridItem>

        <GridItem colSpan={[12, 6]}>
          <SectionBox title="Detalles de la orden de trabajo">
            <Stack gap={2}>
              <HStack>
                <Text fontWeight="bold">Producto:</Text>
                <Text>{order.trabajo}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Sub-Producto:</Text>
                <Text>{order.subproducto}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Medida:</Text>
                <Text>{order.medida}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Cantidad:</Text>
                <Text>{order.cantidad.toFixed(2)}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Terminaciones:</Text>
                <Text>{order.terminaciones}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Archivo:</Text>
                <Input size="sm" type="file" />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Link del Archivo:</Text>
                <Input size="sm" placeholder="URL..." />
                <Button size="sm">Subir</Button>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Observaciones:</Text>
                <Textarea
                  size="sm"
                  value={order.observaciones}
                  placeholder="Observaciones..."
                />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Fecha de entrega:</Text>
                <Text>{order.fechaEntrega}</Text>
              </HStack>
            </Stack>
          </SectionBox>
        </GridItem>

        <GridItem colSpan={12}>
          <SectionBox title="Mensajes">
            <Stack gap={2}>
              {mensajes.length === 0 ? (
                <Text color="gray.600">Aún no hay mensajes</Text>
              ) : (
                mensajes.map((m, i) => <Text key={i}>{m}</Text>)
              )}
              <HStack>
                <Textarea
                  size="sm"
                  value={mensaje}
                  placeholder="Escribir un nuevo mensaje..."
                  onChange={(e) => setMensaje(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    if (!mensaje.trim()) return;
                    setMensajes((prev) => [...prev, mensaje.trim()]);
                    setMensaje("");
                  }}
                >
                  Enviar mensaje
                </Button>
              </HStack>
            </Stack>
          </SectionBox>
        </GridItem>

        <GridItem colSpan={12} /* md={4}*/>
          <Box bg="gray.100" p={4} borderRadius="md">
            <HStack justify="space-between">
              <Text>Total:</Text>
              <Text fontWeight="bold">${order.precio.toLocaleString()}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Total Pagos:</Text>
              <Text fontWeight="bold">$0.00</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Saldo:</Text>
              <Text fontWeight="bold">${order.precio.toLocaleString()}</Text>
            </HStack>
          </Box>
        </GridItem>

        <GridItem colSpan={12} /*md={8}*/>
          <SectionBox title="Pagos realizados">
            <Table data={order.pagos} columns={pagosColumns} rowKey="fecha" />
          </SectionBox>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default DetailOrderClientePage;
