"use client";
import React, { useState, useEffect } from "react";
import styles from "../../page.module.css";
import {
  Button,
  Box,
  Icon,
  Typography,
} from "@mui/material";
import {
  AddCircleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { IUser } from "@/app/interfaces/user-interface";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const token = localStorage.getItem("token");

export default function UsersPage() {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUserID, setSelectedUserID] = useState<number>(0); 

    useEffect(() => {
        const getUsers = async () => {
          const response = await fetch(`${apiUrl}/api/users`, {
              headers: {
                  "Authorization": "Bearer " + token,
              },
          })
            .then((response) => response.json())
            .then((data) => data);
          setUsers(response);
        };
        getUsers();
        return () => {
            setActiveTab(0);
          };
    }, []);

      const handleChipClick = (n: number) => {
        setActiveTab(n);
      };

      const handleUserSelection = (id: number) => {
          setSelectedUserID(id);
        }

    const promoteUser = async (id: number) => {
        let userToPromote = users.find((user) => user.id_user === selectedUserID);
        if (!userToPromote) {
            return;
        }
        userToPromote.role = 'admin';
        const response: any = await fetch(`${apiUrl}/api/users/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(userToPromote),
          })
            .then((response) => response.text())
            .then((data) => data);
        if (response.affectedRows !== 0) {
            setUsers([...users]);
        }
    }

      const deleteUser = async (id: number) => {
        const response = await fetch(`${apiUrl}/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.text())
          .then((data) => data);
    
        if (response === "") {
          const index = users.findIndex(
            (element: IUser) => element.id_user === id
          );
          users.splice(index, 1);
          setUsers([...users]);
        }
      };

      return (
        <Box
          sx={{
            height: "80%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            m: "auto",
            p: "15px",
          }}
        >
          <h3 className="admin_h3">Manage your users here</h3>
          <Typography>What&#39;s your mood today ?</Typography>
          <Box
            sx={{
              height: "60px",
              width: "60%",
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: "1%",
              m: "20px",
            }}
          >
            <Button
              variant="outlined"
              className={
                activeTab === 1 ? styles.admin_chip_active : styles.admin_chip
              }
              onClick={() => handleChipClick(1)}
            >
              <Icon fontSize="small" sx={{ height: "25px", width: "25px" }}>
                <AddCircleOutline />
              </Icon>
              Promote
            </Button>
            <Button
              variant="outlined"
              className={
                activeTab === 2 ? styles.admin_chip_active : styles.admin_chip
              }
              onClick={() => handleChipClick(2)}
            >
              <Icon fontSize="small" sx={{ height: "25px", width: "25px" }}>
                <DeleteOutline />
              </Icon>
              Delete
            </Button>
          </Box>
          <Typography>Your current users :</Typography>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <Box
                    sx={{
                        height: "30px",
                        width: "500px",
                        backgroundColor: 'orange',
                        color: "#000",
                        textAlign: "center",
                        borderRadius: "5px",
                        display: 'grid',
                        gridTemplateColumns: '40% 40% 20%',
                        gap: '10px',
                        p: '5px',
                        m: "0 5px",
                    }}
                >
                    <Typography>First name</Typography>
                    <Typography>Last name</Typography>
                    <Typography>Role</Typography> 
                </Box>
            {users.length > 0 &&
            users?.map((user: IUser) => (
                <Button
                    key={user.id_user}
                    sx={{
                        height: "30px",
                        width: "500px",
                        color: "#000",
                        textAlign: "center",
                        borderRadius: "5px",
                        display: 'grid',
                        gridTemplateColumns: '40% 40% 20%',
                        gap: '10px',
                        p: '5px',
                        m: "0 5px",
                        backgroundColor: `${
                            selectedUserID === user.id_user
                              ? "red"
                              : "#e4e4e4"
                          }`
                    }}
                    onClick={() => handleUserSelection(user.id_user)}
                >
                <Typography>{user.first_name}</Typography>
                <Typography>{user.last_name}</Typography>
                <Typography>{user.role}</Typography>  
                </Button>
            ))}
          </Box>
            <Button
            variant="contained"
            onClick={activeTab === 1 ?  () => promoteUser(selectedUserID): () => deleteUser(selectedUserID)}
            disabled={selectedUserID === 0}
            >
            {activeTab === 1 ? 'Promote' : 'Delete'}
            </Button>
      </Box>
        
    )
}
