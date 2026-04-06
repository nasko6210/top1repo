import * as React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../components/AuthContext";
import { Box } from "@mui/material";

export function MyProfile() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  // MUI State for Menu anchor
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    setAuthState({ email: "", id: 0, status: false });
    navigate("/");
  };

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  };

  // Extract first letter for the Avatar if logged in
  const userInitial = authState.email
    ? authState.email.charAt(0).toUpperCase()
    : "";

  return (
    <React.Fragment>
      <Tooltip title="Профил">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: authState.status ? "black" : "#ccc",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "0.2s",
              "&:hover": { opacity: 0.8 },
            }}
          >
            {authState.status ? userInitial : <AccountCircleIcon />}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
            mt: 1.5,
            borderRadius: 3,
            minWidth: 180,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {!authState.status
          ? /* LOGGED OUT STATE */
            [
              <MenuItem key="login" onClick={() => handleNavigate("/login")}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Вход в TOP1
              </MenuItem>,
              <MenuItem
                key="register"
                onClick={() => handleNavigate("/register")}
              >
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Нова регистрация
              </MenuItem>,
            ]
          : /* LOGGED IN STATE */
            [
              <Box key="user-info" sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Здравей,
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {authState.email}
                </Typography>
              </Box>,
              <Divider key="divider" />,
              <MenuItem
                key="logout"
                onClick={handleLogout}
                sx={{ color: "error.main" }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: "error.main" }} />
                </ListItemIcon>
                Изход
              </MenuItem>,
            ]}
      </Menu>
    </React.Fragment>
  );
}
