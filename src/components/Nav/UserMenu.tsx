import React, { useState } from "react";
import { IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setView } from "../../redux/slices/uiSlice";
import { performLogout } from "../../redux/thunks/authThunks";

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const isGuest = useAppSelector((state) => state.auth.isGuest);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    console.log("Login menu clicked");
    dispatch(setView("login"));
    handleClose();
  };

  const handleLogoutClick = () => {
    console.log("Logout menu clicked");
    dispatch(performLogout());
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="large"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          boxShadow: 3,
          position: "absolute",
          top: 0,
          right: 5,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ dense: true }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Favourites</MenuItem>

        {isGuest ? (
          <MenuItem onClick={handleLoginClick}>Login</MenuItem>
        ) : (
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
