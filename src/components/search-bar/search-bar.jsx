import { Paper, IconButton } from "@mui/material";
import { colors } from "../../constants/colors";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (value) {
            navigate(`/search/${value}`);
            setValue("");
        }
    };

    return (
        <Paper
            component={"form"}
            onSubmit={submitHandler}
            sx={{
                borderRadius: 20,
                border: `1px solid ${colors.border}`,
                pl: 2,
                boxShadow: "none",
                mr: 1,
                height: "40px",
            }}
        >
            <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px", color: colors.primary }}>
                <Search />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
