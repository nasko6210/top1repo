import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Button,
  Stack,
  alpha,
  styled,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "./AuthContext";
import { MyProfile } from "../pages/myProfile";
import Logo from "../pictures/top1logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  width: "100%",
  flexGrow: 1,
  maxWidth: "500px", // Balanced width
  display: "flex",
  alignItems: "center",
  transition: "0.2s",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "none", // Full width on tiny screens
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "0.875rem",
  },
}));

export function Navbar() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255, 255, 255, 0.95)", // Slight transparency for a modern feel
        backdropFilter: "blur(8px)", // Glassmorphism effect
        zIndex: (theme) => theme.zIndex.drawer + 1, // Stay above the sidebar
      }}
    >
      <Container maxWidth="xl">
        {" "}
        {/* Keeps nav aligned with page margins */}
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", height: 70 }}
        >
          {/* LOGO */}
          <Box
            component="img"
            src={Logo}
            alt="Top1 Logo"
            sx={{
              width: { xs: 80, sm: 110 }, // Scale logo for mobile
              cursor: "pointer",
              borderRadius: "8px",
              mr: 2,
            }}
            onClick={() => navigate("/")}
          />

          {/* SEARCH BAR */}
          <Search>
            <SearchIconWrapper onClick={() => navigate("/")}>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Търси в Top1..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* ACTIONS */}
          <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
            {authState.status && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/addPoster")}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "600",
                  display: { xs: "none", lg: "flex" }, // Show text only on larger screens
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Публикувай
              </Button>
            )}

            <MyProfile />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
