import React, { useState } from "react";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setView } from "../../redux/slices/uiSlice";
import { enterGuestMode } from "../../redux/thunks/authThunks";

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
    dispatch(setView("login"));
    handleClose();
  };

  const handleLogoutClick = () => {
    dispatch(enterGuestMode());
    dispatch(setView("login"));
    handleClose();
  };

  return (
    <>
      <Button
        size="large"
        onClick={handleOpen}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {open ? (
          <MenuOpenIcon sx={{ color: theme.palette.primary.main }} />
        ) : (
          <MenuIcon sx={{ color: theme.palette.primary.main }} />
        )}
      </Button>
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
