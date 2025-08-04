import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Table, type Column } from "../Table";

interface AccountSectionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  tableColumns: Column<any>[];
  tableData: any[];
}

const AccountSection = ({
  title,
  icon,
  color,
  tableColumns,
  tableData,
}: AccountSectionProps) => {
  return (
    <Box border="1px solid" borderColor="gray.300" rounded="md" mb={6}>
      <Flex align="center" bg={color} px={4} py={2} gap={2}>
        <Icon as={() => icon} ml={5} />
        <Text fontWeight="bold" color="white">
          {title}
        </Text>
      </Flex>
      <Box p={4}>
        <Table columns={tableColumns} data={tableData} rowKey="id" />
      </Box>
    </Box>
  );
};

export default AccountSection;
