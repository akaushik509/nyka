import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar"; 
import PieChart from "./PieChart"; 
import PieChart2 from "./PieChart2";
import { Box, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";

export const Analytics = () => {
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [makeupCount, setMakeupCount] = useState(0);
    const [haircareCount, setHaircareCount] = useState(0);
    const [skincareCount, setSkincareCount] = useState(0);
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        countGender();
        countCategories();
    }, []); 

    const countGender = () => {
        axios.get("https://lively-crab-handkerchief.cyclic.app/products")
            .then(response => {
                let maleCount = 0;
                let femaleCount = 0;

                response.data.forEach((product) => {
                    if (product.gender.toLowerCase() === 'male') {
                        maleCount++;
                    } else if (product.gender.toLowerCase() === 'female') {
                        femaleCount++;
                    }
                });

                setMaleCount(maleCount);
                setFemaleCount(femaleCount);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    const countCategories = () => {
        axios.get("https://lively-crab-handkerchief.cyclic.app/products")
            .then(response => {
                let makeupCount = 0;
                let haircareCount = 0;
                let skincareCount = 0;

                response.data.forEach((product) => {
                    const category = product.category.toLowerCase();
                    switch (category) {
                        case 'makeup':
                            makeupCount++;
                            break;
                        case 'haircare':
                            haircareCount++;
                            break;
                        case 'skincare':
                            skincareCount++;
                            break;
                        default:
                            break;
                    }
                });

                setMakeupCount(makeupCount);
                setHaircareCount(haircareCount);
                setSkincareCount(skincareCount);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    const pieData = {
        labels: ["Male", "Female"],
        values: [maleCount,femaleCount],
        colors: ["green", "#ED561B"],
    };

    const pieData2 = {
        labels: ["Makeup", "SkinCare", "HairCare"],
        values: [makeupCount,skincareCount,haircareCount],
        colors: ["green", "#ED561B", "yellow"],
    };
    const token = localStorage.getItem("token");
    if(token)
    return (
        <>
            {!isSmallerThan768 && <Navbar />}
            <Box p={4} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Grid templateColumns='repeat(2, 5fr)' gap={50}>
                    <Box >
                        <Text>Gender Overview Chart</Text>
                        <Box border="1px solid black" borderRadius="md">
                            <PieChart data={pieData} width={400} height={400} />
                        </Box>
                    </Box>

                    <Box >
                        <Text>Product Overview Chart</Text>
                        <Box border="1px solid black" borderRadius="md">
                            <PieChart2 data={pieData2} width={400} height={400} />
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </>
    );
};

export default Analytics;
