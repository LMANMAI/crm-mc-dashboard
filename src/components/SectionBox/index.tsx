import { Box, Flex, Text, Button } from "@chakra-ui/react";

interface SectionBoxProps {
  title: string;
  icon?: any;
  actionButton?: { label: string; onClick: () => void };
  children: React.ReactNode;
}
const SectionBox = ({
  title,
  icon,
  actionButton,
  children,
}: SectionBoxProps) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
    >
      <Flex align="center" bg="gray.500" color="white" px={4} py={2}>
        {icon && <Box as={icon} mr={2} />}
        <Text fontWeight="bold" flex="1">
          {title}
        </Text>
        {actionButton && (
          <Button size="sm" colorPalette="teal" onClick={actionButton.onClick}>
            {actionButton.label}
          </Button>
        )}
      </Flex>
      <Box p={4}>{children}</Box>
    </Box>
  );
};
export default SectionBox;
