import { useState, useEffect } from "react";
import { Stack, Box, Container, Typography } from "@mui/material";
import { colors } from "../../constants/colors";
import { Category } from "../";
import { Videos } from "../";
import { ApiService } from "../../service/api.service";
const Main = () => {
    const [selectedCategory, setSelectedCategory] = useState("New");

    const [videos, setVideos] = useState([]);

    const selectedCategoryHandler = (category) => setSelectedCategory(category);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await ApiService.fetching(
                    `search?part=snippet&q=${selectedCategory}`
                );
                setVideos(data.items);
            } catch (error) {
                console.log(error);
            }
        };
        getData(getData);
    }, [selectedCategory]);

    return (
        <Stack>
            <Category
                selectedCategoryHandler={selectedCategoryHandler}
                selectedCategory={selectedCategory}
            />
            <Box p={2} sx={{ height: "60vh" }}>
                <Container maxWidth={"90%"}>
                    <Typography variant="h4" fontWeight={"bold"} mb={2}>
                        {selectedCategory}{" "}
                        <span style={{ color: colors.error }}>Videos</span>
                    </Typography>
                    <Videos videos={videos} />
                </Container>
            </Box>
        </Stack>
    );
};

export default Main;
