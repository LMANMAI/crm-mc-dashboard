import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Spinner,
  Stack,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useParams, useLocation } from "react-router-dom";
import { SectionBox, TitleWithIcon, Table } from "../../../components";
import useFetch from "../../../hooks/useFetch";
import { ORDERS } from "../../../config/constants";

// Shape que devuelve la API (json-server / backend)
interface OrderApiResponse {
  id: string | number;
  clientId?: string;
  productId?: string;
  subProductId?: string;
  quantity?: number;
  observations?: string;
  medioPago?: string;
  comentariosPago?: string;
  total?: number;
  createdAt?: string;
  // campos legacy / backend real
  fechaCarga?: string;
  cliente?: string;
  email?: string;
  trabajo?: string;
  fechaOrden?: string;
  estado?: string;
  precio?: number;
  subproducto?: string;
  medida?: string;
  cantidad?: number;
  terminaciones?: string;
  archivoLink?: string;
  fechaEntrega?: string;
  pagos?: Array<{ fecha: string; tipo: string; monto: number }>;
}

const pagosColumns = [
  { header: "Fecha", accessor: "fecha" },
  { header: "Tipo", accessor: "tipo" },
  { header: "Monto", accessor: "monto", textAlign: "right" as const },
];

const DetailOrderClientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateOrder = location.state?.order as OrderApiResponse | undefined;

  const [mensaje, setMensaje] = React.useState("");
  const [mensajes, setMensajes] = React.useState<string[]>([]);

  const { data: apiOrder, isLoading, error } = useFetch<OrderApiResponse>(
    ORDERS.GET(id!),
    { useInitialFetch: true }
  );

  // Usar datos de la API si están disponibles, sino el state pasado por navigate
  const order = apiOrder ?? stateOrder;

  if (isLoading && !order) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="red.500" fontWeight="medium">
          {error ?? "No se encontró el pedido."}
        </Text>
      </Box>
    );
  }

  // Normalizar campos: soporta tanto el shape del backend real como el del mock POST
  const displayId     = order.id;
  const fechaCarga    = order.fechaCarga ?? order.createdAt?.slice(0, 10) ?? "—";
  const cliente       = order.cliente ?? order.clientId ?? "—";
  const email         = order.email ?? order.clientId ?? "—";
  const trabajo       = order.trabajo ?? order.productId ?? "—";
  const fechaOrden    = order.fechaOrden ?? order.createdAt?.slice(0, 10) ?? "—";
  const estado        = order.estado ?? "1. Pendiente";
  const precio        = order.precio ?? order.total ?? 0;
  const subproducto   = order.subproducto ?? order.subProductId ?? "—";
  const medida        = order.medida ?? "—";
  const cantidad      = order.cantidad ?? order.quantity ?? 0;
  const terminaciones = order.terminaciones ?? "No posee";
  const observaciones = order.observations ?? order.observations ?? "";
  const fechaEntrega  = order.fechaEntrega ?? "—";
  const pagos         = order.pagos ?? [];

  return (
    <Stack gap={6} p={6}>
      <TitleWithIcon
        icon="📝"
        title={`Order N° ${displayId}`}
        subtitle={`Fecha de Carga: ${fechaCarga}`}
      />

      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={[12, 6]}>
          <SectionBox title="Información del pedido">
            <Stack gap={2}>
              <HStack>
                <Text fontWeight="bold">Order N°:</Text>
                <Text>{displayId}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Cliente:</Text>
                <Text>{cliente}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Email:</Text>
                <Text>{email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Trabajo:</Text>
                <Text>{trabajo}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Fecha de la orden:</Text>
                <Text>{fechaOrden}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Estado:</Text>
                <Tag.Root colorPalette="yellow"><Tag.Label>{estado}</Tag.Label></Tag.Root>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Precio:</Text>
                <Text>$ {precio.toLocaleString("es-AR")}</Text>
              </HStack>
            </Stack>
          </SectionBox>
        </GridItem>

        <GridItem colSpan={[12, 6]}>
          <SectionBox title="Detalles de la orden de trabajo">
            <Stack gap={2}>
              <HStack>
                <Text fontWeight="bold">Producto:</Text>
                <Text>{trabajo}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Sub-Producto:</Text>
                <Text>{subproducto}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Medida:</Text>
                <Text>{medida}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Cantidad:</Text>
                <Text>{Number(cantidad).toFixed(2)}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Terminaciones:</Text>
                <Text>{terminaciones}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Archivo:</Text>
                <Input size="sm" type="file" />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Link del Archivo:</Text>
                <Input size="sm" placeholder="URL..." />
                <Button size="sm" colorPalette="teal">Subir</Button>
              </HStack>
              <HStack alignItems="flex-start">
                <Text fontWeight="bold" pt={1}>Observaciones:</Text>
                <Textarea size="sm" defaultValue={observaciones} placeholder="Observaciones..." />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Fecha de entrega:</Text>
                <Text>{fechaEntrega}</Text>
              </HStack>
            </Stack>
          </SectionBox>
        </GridItem>

        <GridItem colSpan={12}>
          <SectionBox title="Mensajes">
            <Stack gap={2}>
              {mensajes.length === 0 ? (
                <Text color="gray.500" fontSize="sm">Aún no hay mensajes.</Text>
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
                  colorPalette="teal"
                  onClick={() => {
                    if (!mensaje.trim()) return;
                    setMensajes((prev) => [...prev, mensaje.trim()]);
                    setMensaje("");
                  }}
                >
                  Enviar
                </Button>
              </HStack>
            </Stack>
          </SectionBox>
        </GridItem>

        <GridItem colSpan={12}>
          <Box bg="gray.100" p={4} borderRadius="md">
            <HStack justify="space-between">
              <Text>Total:</Text>
              <Text fontWeight="bold">$ {precio.toLocaleString("es-AR")}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Total Pagos:</Text>
              <Text fontWeight="bold">$ 0,00</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Saldo:</Text>
              <Text fontWeight="bold">$ {precio.toLocaleString("es-AR")}</Text>
            </HStack>
          </Box>
        </GridItem>

        <GridItem colSpan={12}>
          <SectionBox title="Pagos realizados">
            <Table data={pagos} columns={pagosColumns} rowKey="fecha" />
          </SectionBox>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default DetailOrderClientePage;
