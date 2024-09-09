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
import { useRouter } from "next/navigation";

export default function Sidebars() {
  const route = useRouter()
  const [check, setCheck] = useState(true);
  const handleClick = () => {
    setCheck(!check);
  };
  const logOut = () => {
    route.push("/signIn")
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
                  <div>Trang Quản Lý</div>
                </nav>
              ) : (
                ""
              )}
            </h2>
          </MenuItem>

          <MenuItem href="/admin/UserManagement" icon={<PersonOutlinedIcon />}>
            {check && "Quản Lý Người Dùng"}
          </MenuItem>
          <MenuItem href="/admin/adminManagement" icon={<AdminPanelSettingsOutlinedIcon />}>
            {check && "Quản Lý Admin"}
          </MenuItem>
          <MenuItem href="/admin/productManagement" icon={<Inventory2OutlinedIcon />}>
            {check && "Quản Lý Sản Phẩm"}
          </MenuItem>
          <MenuItem icon={<DashboardOutlinedIcon />}>
            {check && "Trang Tổng Quan"}
          </MenuItem>
          <MenuItem icon={<LogoutOutlinedIcon />} onClick={logOut}>
            {check && "Đăng Xuất"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
