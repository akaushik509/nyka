import React, { useState } from "react";
import { Box, Flex, Spacer, VStack, Text, IconButton, Image, Icon } from "@chakra-ui/react";
import { FiMenu} from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    if (menuName === "login") {
      localStorage.clear();
    }
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      left={0}
      top={0}
      h="100vh"
      w="200px"
      bg="blue.600"
      color="white"
      zIndex={1000}
    >
      <Flex align="center" p={4}>
        
        <Text ml={2} fontSize="lg" fontWeight="bold">
          Nyka Dashboard
        </Text>
        <Spacer />
        <IconButton
          icon={<FiMenu />}
          display={{ base: "inline-flex", md: "none" }}
          aria-label="Toggle Menu"
          variant="ghost"
        />
      </Flex>

      <VStack spacing={4} p={4} align="flex-start">
        <Link to="/dashboard">
          <Flex
            align="center"
            onClick={() => setActiveMenu("dashboard")}
            _hover={{ cursor: "pointer", color: "yellow.300" }}
            color={activeMenu === "dashboard" ? "yellow.300" : "white"}
          >
            
            <Text fontSize="l" fontWeight="bold" ml={2}>
              Dashboard
            </Text>
          </Flex>
        </Link>
        <Flex
          align="center"
          onClick={() => setActiveMenu("analytics")}
          _hover={{ cursor: "pointer", color: "yellow.300" }}
          color={activeMenu === "analytics" ? "yellow.300" : "white"}
        >
          <Link to="/analytics">
            
            <Text fontSize="l" fontWeight="bold" ml={2}>
              Analytics
            </Text>
          </Link>
        </Flex>
        <Link to="/login" onClick={() => handleMenuClick("login")}>
          <Flex
            align="center"
            _hover={{ cursor: "pointer", color: "yellow.300" }}
            color={activeMenu === "login" ? "yellow.300" : "white"}
          >
            
            <Text fontSize="l" fontWeight="bold" ml={2}>
              Logout
            </Text>
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
};

export default Navbar;
