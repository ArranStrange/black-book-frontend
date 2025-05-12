import React, { useState } from "react";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface UserMenuProps {
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogout();
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
        <MenuItem onClick={handleLogoutClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Favourites</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        {/* You can add more <MenuItem>s here in future */}
      </Menu>
    </>
  );
};

export default UserMenu;
