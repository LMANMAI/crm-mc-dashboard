import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import Sidebar from "../Sidemenu";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const AdminLayout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={4} bg="gray.50">
          <Outlet />
        </Box>
      </Flex>{" "}
      <Footer />
    </Flex>
  );
};

export default AdminLayout;
