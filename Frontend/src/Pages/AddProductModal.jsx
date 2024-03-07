import React, { useState, useEffect } from "react";
import {  
    Input,  
    Button,
    Stack,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";  
  import axios from "axios";  

export const AddProductModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState([]);
  
    const getProd = async () =>{
        return await axios.get("https://lively-crab-handkerchief.cyclic.app/products/")
        .then(response => {
          setProducts(response.data);
          
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
        
    };
    useEffect(() => {
        getProd()
      }, []);

    const handleAddProduct = () => {
      const newProduct = {
        name,
        picture,
        description,
        gender,
        category,
        price
      };
      console.log("New Product:", newProduct);
      axios.post("https://lively-crab-handkerchief.cyclic.app/products/", newProduct)
        .then(response => {
          console.log("Product added successfully:", response.data);
          onClose();
          getProd();
          
        })
        .catch(error => {
          console.error("Error adding product:", error);
        });
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Picture URL" value={picture} onChange={(e) => setPicture(e.target.value)} />
              <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Select placeholder="Select Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <Select placeholder="Select Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="makeup">Makeup</option>
                <option value="skincare">Skincare</option>
                <option value="haircare">Haircare</option>
              </Select>
              <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Stack>
          </ModalBody>
          <Button colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
        </ModalContent>
      </Modal>
    );
  };