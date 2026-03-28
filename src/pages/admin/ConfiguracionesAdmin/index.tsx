import React from "react";
import {
  Box,
  Grid,
  Stack,
  Heading,
  Text,
  Field,
  Fieldset,
  Input,
  Textarea,
  Button,
  Icon,
  Tooltip,
  Progress,
  Checkbox,
  Separator as Divider,
  Tabs,
  IconButton,
} from "@chakra-ui/react";
import { FiSave, FiUpload, FiInfo } from "react-icons/fi";

const ConfiguracionesAdmin = () => {
  return (
    <Box p={6}>
      <Heading size="md" mb={4}>
        Configuraciones
      </Heading>

      <Tabs.Root defaultValue="cuenta" variant="enclosed">
        <Tabs.List>
          <Tabs.Trigger value="cuenta">Mi cuenta</Tabs.Trigger>
          <Tabs.Trigger value="generales">Parámetros generales</Tabs.Trigger>
          <Tabs.Trigger value="administrativos">
            Parámetros administrativos
          </Tabs.Trigger>
        </Tabs.List>

        {/* =================== Mi cuenta =================== */}
        <Tabs.Content value="cuenta">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={8}
            mt={5}
            alignItems="start"
          >
            <Fieldset.Root size="sm">
              <Fieldset.Legend>Datos de la empresa</Fieldset.Legend>

              <Field.Root>
                <Field.Label>Nombre</Field.Label>
                <Input defaultValue="MasCopies" />
              </Field.Root>

              <Field.Root>
                <Field.Label>CUIT</Field.Label>
                <Input defaultValue="27032136732" />
              </Field.Root>

              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                <Field.Root>
                  <Field.Label>Color primario</Field.Label>
                  <Input type="color" defaultValue="#32b49b" h="8" p="1" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Color del texto</Field.Label>
                  <Input type="color" defaultValue="#333333" h="8" p="1" />
                </Field.Root>
              </Grid>

              <Divider my={5} />

              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                <Field.Root>
                  <Field.Label>Logo Header (200x70)</Field.Label>
                  <Stack direction="row" gap={2}>
                    <Input type="file" />
                    <IconButton aria-label="Subir" variant="subtle">
                      <Icon as={FiUpload} />
                    </IconButton>
                  </Stack>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Imagen del Header (preview no funcional)
                  </Text>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Logo Login (500x300)</Field.Label>
                  <Stack direction="row" gap={2}>
                    <Input type="file" />
                    <IconButton aria-label="Subir" variant="subtle">
                      <Icon as={FiUpload} />
                    </IconButton>
                  </Stack>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Imagen del Login (preview no funcional)
                  </Text>
                </Field.Root>
              </Grid>
            </Fieldset.Root>

            <Fieldset.Root size="sm">
              <Fieldset.Legend>Datos legales y Notificaciones</Fieldset.Legend>

              <Field.Root>
                <Field.Label>Razón social</Field.Label>
                <Input defaultValue="MASCOPIES de Maria Dolores Burgueño" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Pie de página</Field.Label>
                <Input defaultValue="MASCOPIES Soluciones Gráficas" />
              </Field.Root>

              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Stack direction="row" align="center" mt={2} mb={1}>
                    <Icon as={FiInfo} />
                    <Text fontSize="sm" color="gray.700">
                      Capacidad contratada
                    </Text>
                  </Stack>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>
                    Espacio utilizado: 12.56GB de 15GB
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>

              <Progress.Root max={100} value={83} size="sm" rounded="sm">
                <Progress.Track />
                <Progress.Range />
              </Progress.Root>

              <Divider my={5} />

              <Field.Root>
                <Field.Label>Firma (emails)</Field.Label>
                <Textarea rows={8} defaultValue="NOTIFICACIONES MASCOPIES" />
              </Field.Root>
            </Fieldset.Root>
          </Grid>

          <Stack direction="row" justify="flex-end" mt={6}>
            <Button variant="subtle">Cancelar</Button>
            <Button colorPalette="teal">
              <Icon as={FiSave} mr="2" />
              Guardar
            </Button>
          </Stack>
        </Tabs.Content>

        <Tabs.Content value="generales">
          <Box mt={5}>
            <Fieldset.Root size="sm" gap={4}>
              <Fieldset.Legend>Facturación</Fieldset.Legend>

              <Stack>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Emitir factura sin CUIT o DNI</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root>
                  <Checkbox.Control />
                  <Checkbox.Label>
                    Emitir factura solo con CUIT o DNI
                  </Checkbox.Label>
                </Checkbox.Root>
              </Stack>

              <Divider my={4} />

              <Fieldset.Legend>Datos a enviar a facturar</Fieldset.Legend>
              <Grid
                templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
                gap={2}
              >
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Nro. de pedido</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Observaciones</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Producto</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Material</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Terminación</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Cantidad</Checkbox.Label>
                </Checkbox.Root>
              </Grid>

              <Stack direction="row" justify="flex-end" mt={6}>
                <Button variant="subtle">Cancelar</Button>
                <Button colorPalette="teal">
                  <Icon as={FiSave} mr="2" />
                  Guardar
                </Button>
              </Stack>
            </Fieldset.Root>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="administrativos">
          <Box mt={5}>
            <Fieldset.Root size="sm" gap={4}>
              <Fieldset.Legend>Preferencias</Fieldset.Legend>

              <Stack>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Ocultar pedidos entregados</Checkbox.Label>
                </Checkbox.Root>
              </Stack>

              <Field.Root mt={2}>
                <Field.Label>Precisión decimal</Field.Label>
                <Input type="number" defaultValue={2} min={0} />
              </Field.Root>

              <Divider my={4} />

              <Fieldset.Legend>
                Productos a mostrar en el cliente
              </Fieldset.Legend>
              <Stack>
                <Checkbox.Root defaultChecked>
                  <Checkbox.Control />
                  <Checkbox.Label>Ambos</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root>
                  <Checkbox.Control />
                  <Checkbox.Label>Cotizador</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root>
                  <Checkbox.Control />
                  <Checkbox.Label>Pedidos simples</Checkbox.Label>
                </Checkbox.Root>
              </Stack>

              <Divider my={4} />

              <Stack>
                <Checkbox.Root>
                  <Checkbox.Control />
                  <Checkbox.Label>“Nuevo pedido” abre la tienda</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root>
                  <Checkbox.Control />
                  <Checkbox.Label>
                    Multiplicar cantidades en presupuestos
                  </Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root>
                  <Checkbox.Control />
                  <Checkbox.Label>
                    Notificar vencimiento de comprobante
                  </Checkbox.Label>
                </Checkbox.Root>
              </Stack>

              <Stack direction="row" justify="flex-end" mt={6}>
                <Button variant="subtle">Cancelar</Button>
                <Button colorPalette="teal">
                  <Icon as={FiSave} mr="2" />
                  Guardar
                </Button>
              </Stack>
            </Fieldset.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default ConfiguracionesAdmin;
