import {
    Box,
  
    Button,
   
    Text,
    
  } from "@chakra-ui/react";
export const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Button bg="#2B6CB0" _hover={{ color: "black", bg:"#EDF2F7" }} color={"white"} onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <Text mx={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button bg="#2B6CB0" _hover={{ color: "black", bg:"#EDF2F7" }} color={"white"} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    );
  };