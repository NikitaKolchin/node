import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem } from "@material-ui/core";

function MyMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        МЕНЮ
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          {" "}
          <Link to="/">Домашняя страница</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/result">Результаты</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/info">Информация</Link>
        </MenuItem>
        {props.currentUser.isAdmin && (
          <MenuItem onClick={handleClose}>
            <Link to="/admin">Администрирование</Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <Link to="/login">Выйти</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export { MyMenu };
