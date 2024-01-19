"use client";
import React from "react";
import styles from "../page.module.css";
import { Button, Grid, TextField, Box, Icon } from "@mui/material";
import { UpdateOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "80%",
        height: "80%",
        m: "auto",
      }}
    >
      <h2>Admin space : sell&#39;em all!</h2>
      <Button
        className={styles.admin_button}
        variant="contained"
        onClick={() => router.push("/admin/users")}
      >
        <Icon sx={{ m: "auto", height: 30, width: 30 }}>
          <UpdateOutlined />
        </Icon>
        Manage users
      </Button>
      <Button
        className={styles.admin_button}
        variant="contained"
        onClick={() => router.push("/admin/categories")}
      >
        <Icon sx={{ m: "auto", height: 30, width: 30 }}>
          <UpdateOutlined />
        </Icon>
        Manage categories
      </Button>
      <Button
        className={styles.admin_button}
        variant="contained"
        onClick={() => router.push("/admin/articles")}
      >
        <Icon sx={{ m: "auto", height: 30, width: 30 }}>
          <UpdateOutlined />
        </Icon>
        Manage articles
      </Button>
    </Box>
  );
}
