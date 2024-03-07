import React, { useState, useEffect } from "react";
import {
    Box,
    Input,
    Avatar,
    Button,
    Stack,
    Select,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Grid,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { GridItem } from '@chakra-ui/react'
import { AddProductModal } from "./AddProductModal";
import { Pagination } from "../Pages/Pagination"

export const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [genderFilter, setGenderFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortOption, setSortOption] = useState("");
    const [products, setProducts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        getProd()
        
    }, [currentPage]);

    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(
            (product) =>
                genderFilter === "all" || product.gender.toLowerCase() === genderFilter
        )
        .filter(
            (product) =>
                categoryFilter === "all" ||
                product.category.toLowerCase() === categoryFilter
        )
        .sort((a, b) => {
            if (sortOption === "price") {
                return a.price - b.price;
            } else if (sortOption === "price-dsc") {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    const handleEdit = (productId) => {
        const productToEdit = products.find(product => product._id === productId);
        setEditingProduct(productToEdit);
        onOpen();
    };

    const handleDelete = (productId) => {
        console.log("Delete product with ID:", productId);
        fetch(`https://lively-crab-handkerchief.cyclic.app/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authbyadmin": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => {
                getProd();
            })

    };

    const getProd = () => {
        return axios.get("https://lively-crab-handkerchief.cyclic.app/products/")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    const handleModalClose = () => {
        setEditingProduct(null);
        onClose();
    };

    const handleSaveChanges = () => {
        console.log("Saving changes to product:", editingProduct);
        axios.patch(`https://lively-crab-handkerchief.cyclic.app/products/${editingProduct._id}`, editingProduct, {
            headers: {
                "Content-Type": "application/json",
                authbyadmin: localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("Product updated successfully:", response.data);
                onClose();
                getProd();
            })
            .catch(error => {
                console.error("Error updating product:", error);
            });
    };
    const token = localStorage.getItem("token");
    if(token){
        return (
            <Box p={4} style={{ marginLeft: "220px", padding: "20px" }}>
                <Navbar />
                <Stack direction="row" align="center" justify="space-between" mb={4}>
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        maxW="sm"
                        bg="white"
                        color="gray.800"
                    />
                </Stack>
    
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    <GridItem direction="row" align="center" justify="space-between" mb={4}>
    
                        <Select
                            size="sm"
                            value={sortOption}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option >Sort by Price</option>
                            <option value="price">Ascending</option>
                            <option value="price-dsc">Descending</option>
                        </Select>
                    </GridItem >
    
                    <GridItem direction="row" mb={4}>
                        <Select
                            size="sm"
                            value={genderFilter}
                            onChange={(e) => setGenderFilter(e.target.value)}
                        >
    
                            <option value="all">Filter by Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </GridItem >
    
                    <GridItem direction="row" mb={4}>
                        <Select
                            size="sm"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
    
                            <option value="all">Filter by Category</option>
                            <option value="makeup">Makeup</option>
                            <option value="skincare">Skincare</option>
                            <option value="haircare">Haircare</option>
                        </Select>
                    </GridItem >
    
                    <GridItem direction="row" mb={4}>
                        <Button bg={"blue.600"} _hover={{ color: "black", bg: "#EDF2F7" }} color={"white"} onClick={() => setAddProductModalOpen(true)}>Add Product</Button>
                        <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setAddProductModalOpen(false)} />
                    </GridItem >
                </Grid>
    
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Picture</Th>
                            <Th>Description</Th>
                            <Th>Gender</Th>
                            <Th>Category</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {paginatedProducts.map((product) => (
                            <Tr key={product._id}>
                                <Td>{product.name}</Td>
                                <Td><Avatar src={product.picture} /></Td>
                                <Td>{product.description}</Td>
                                <Td>{product.gender}</Td>
                                <Td>{product.category}</Td>
                                <Td>{product.price}</Td>
                                <Td>
                                    <Button onClick={() => handleEdit(product._id)} mr={2}>
                                        Edit
                                    </Button>
                                    <Modal isOpen={isOpen} onClose={handleModalClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Edit</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Text>Name:</Text>
                                                <Input
                                                    value={editingProduct?.name}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                    placeholder="Enter product name"
                                                    mb={4}
                                                />
                                                <Text>Picture:</Text>
                                                <Input
                                                    value={editingProduct?.picture}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, picture: e.target.value })}
                                                    placeholder="Enter product picture URL"
                                                    mb={4}
                                                />
                                                <Text>Description:</Text>
                                                <Input
                                                    value={editingProduct?.description}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                    placeholder="Enter product description"
                                                    mb={4}
                                                />
                                                <Text>Gender:</Text>
                                                <Select
                                                    size="sm"
                                                    value={editingProduct?.gender}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, gender: e.target.value })}
                                                    mb={4}
                                                >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </Select>
                                                <Text>Category:</Text>
                                                <Select
                                                    size="sm"
                                                    value={editingProduct?.category}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                                    mb={4}
                                                >
                                                    <option value="makeup">Makeup</option>
                                                    <option value="skincare">Skincare</option>
                                                    <option value="haircare">Haircare</option>
                                                </Select>
                                                <Text>Price:</Text>
                                                <Input
                                                    value={editingProduct?.price}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                                    placeholder="Enter product price"
                                                    mb={4}
                                                />
                                                <Button colorScheme="blue" onClick={handleSaveChanges}>
                                                    Save Changes
                                                </Button>
                                            </ModalBody>
                                        </ModalContent>
                                    </Modal>
                                    <Button colorScheme="red" onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredProducts.length}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </Box>
        );
    }else{
        <>
            <Text>Please login</Text>
        </>
    }
};

export default Dashboard;
