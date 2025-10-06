import { Stack, Box, IconButton } from "@mui/material";
import { logo } from "../../constants";
import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import { SearchBar } from "../";
import TelegramIcon from "@mui/icons-material/Telegram"; // 🔹 Telegram ikonka

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

            <Box>
                <IconButton
                    component="a"
                    href="https://t.me/javokhirOka" // bu yerga o'z Telegram username'ingni yoz
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#fff" }}
                >
                    <TelegramIcon fontSize="large" /> Javokhir Oka
                </IconButton>
            </Box>
        </Stack>
    );
};

export default Navbar;
