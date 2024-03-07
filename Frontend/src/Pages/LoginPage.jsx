import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
          "https://lively-crab-handkerchief.cyclic.app/users/login",
          { email, password }
        );
        console.log(response.data);
        const token = response.data.token;
        const name = response.data.name;
        const avatar = response.data.avatar;
        const emailid = response.data.email;
  
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("avatar", avatar);
          localStorage.setItem("emailid", emailid);
          
          toast({
            description: "Signed in successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/dashboard"); 
        } else {
          toast({
            description: "Wrong ID/Password",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        toast({
          description: "Failed to login",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box w="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={4}>Login to Nyka</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" mt={8} type="submit" w="100%">
            Login
          </Button>
        </form>
        <Box mt={4} textAlign="center">
          <Link to="/register">
            <Button colorScheme="teal" variant="outline" mr={4}>
              Sign Up
            </Button>
          </Link>
          <Button as={Link} to="/" colorScheme="gray" variant="outline">
            Go Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
