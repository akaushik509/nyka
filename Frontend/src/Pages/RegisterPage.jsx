import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello")
    try {
      const response = await axios.post(
        "https://lively-crab-handkerchief.cyclic.app/users/register",
        formData
      );
      console.log(response.data); 
      toast({
        title: "Account created.",
        description: "Your account has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: "Account already registered",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto" w="md"  borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading textAlign="center" mb={8}>
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="avatar" mb={4}>
          <FormLabel>Avatar</FormLabel>
          <Input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" w="100%" mb={4}>
          Register
        </Button>
      </form>
      <Box textAlign="center">
        <Link to="/login">
          <Button colorScheme="teal" variant="outline" mr={4}>
            Sign In
          </Button>
        </Link>
        <Button as={Link} to="/" colorScheme="gray" variant="outline">
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
