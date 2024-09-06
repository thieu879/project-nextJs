"use client";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import React, { useState } from "react";

export default function Navbar() {
  const [check, setCheck] = useState(true);
  const handleClick = () => {
    setCheck(!check);
  };
  const logOut = () => {
    
  }
  return (
    <div id="app" style={{ height: "100vh" }}>
      <Sidebar
        style={
          check
            ? { height: "100vh" }
            : { height: "100vh", width: "75px", minWidth: "0" }
        }
      >
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={handleClick}
            style={{ textAlign: "center", backgroundColor: "#ecf0f1" }}
          >
            <h2>
              {check ? (
                <nav className="flex items-center gap-[10px]">
                  <img
                    className="w-[40px] h-[40px]"
                    src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
                    alt=""
                  />
                  <div>Ecommerce</div>
                </nav>
              ) : (
                ""
              )}
            </h2>
          </MenuItem>

          <MenuItem icon={<PersonOutlinedIcon />}>{check && "Users"}</MenuItem>
          <MenuItem icon={<AdminPanelSettingsOutlinedIcon />}>
            {check && "Admin"}
          </MenuItem>
          <MenuItem icon={<Inventory2OutlinedIcon />}>
            {check && "Product"}
          </MenuItem>
          <MenuItem icon={<DashboardOutlinedIcon />}>
            {check && "Dashboard"}
          </MenuItem>
          <MenuItem icon={<LogoutOutlinedIcon />} onClick={logOut}>
            {check && "Log Out"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
