import React from "react";
import { Box, Flex, Button, VStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box p={4}>
      <Heading textAlign="center" mb={8}>Welcome to our Nyka Dashboard!</Heading>
      <VStack spacing={4} align="center">
        <Button as={Link} to="/login" colorScheme="blue" size="lg">
          Login
        </Button>
        <Button as={Link} to="/register" colorScheme="green" size="lg">
          Register
        </Button>
      </VStack>
      <Box textAlign="center" mt={8}>
        <p>Please login or register to continue.</p>
      </Box>
    </Box>
  );
};

export default Home;
