import { Select, createListCollection, Portal } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  multiple?: false;
  placeholder?: string;
  name?: string;
}

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccioná una opción",
  name,
}: CustomSelectProps) => {
  const collection = createListCollection({
    items: options.map((opt) => ({ label: opt.label, value: opt.value })),
  });

  return (
    <Box width="100%">
      <Select.Root
        name={name}
        value={[value]}
        onValueChange={({ value }) => onChange(value[0])}
        collection={collection}
        multiple={false}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
            <Select.ClearTrigger />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
};

export default CustomSelect;
