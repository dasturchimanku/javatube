import { Stack, Box } from "@mui/material";
import { logo } from "../../constants";
import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import { SearchBar } from "../";

const Navbar = () => {
    return (
        <Stack
            direction={"row"}
            alignItems="center"
            color={"#fff"}
            p={2}
            sx={{
                position: "sticky",
                background: colors.info,
                top: 0,
                zIndex: 100,
                justifyContent: "space-between",
                height: { xs: "auto", md: "60px" },
            }}
        >
            <Link
                to={"/"}
                style={{
                    cursor: "pointer",
                }}
            >
                <img src={logo} alt="logo" height="30" width="30" />
            </Link>
            <SearchBar />
            <Box />
        </Stack>
    );
};

export default Navbar;
