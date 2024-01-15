"use client";
import React from "react";
import { useState } from "react";
import styles from "../page.module.css";
import { Button, Grid, TextField } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Link from "next/link";
import { UserInfosInterface } from "../interfaces/interfaces";
import { useRouter } from "next/navigation";
import { Http2ServerResponse } from "http2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CreateAccountPage() {
  const [userInfos, setUserInfos] = useState<UserInfosInterface>({
    mail: '',
    password: '',
    firstname: '',
    lastname: '',
  })
  const router = useRouter();

  const handleChange = (e: any) => {
    const { value } = e.target;
    setUserInfos({
      ...userInfos,
      [e.target.name]: value,
    });
  };

  const register = async (userInfos: UserInfosInterface) => {
    const response = await fetch(`${apiUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfos),
    })
    .then((response) => response)
    .then((data) => data)
    if (response.status === 201) {
      router.replace('/connexion');
    }   
    
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    register(userInfos);
  }

  return (
    <section className={styles.formlogin_section}>
      <Grid className={styles.formlogin_container}>
        <Grid className={styles.formlogin_header}>
          <GroupsOutlinedIcon sx={{ fontSize: "100px", color: "black" }} />

          <h1 className={styles.formlogin_title}>Créer un compte</h1>
        </Grid>
        <Grid className={styles.formlogin_body}>
          <TextField
            id="firstname"
            label="Prénom"
            variant="outlined"
            name="firstname"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="lastname"
            label="Nom"
            variant="outlined"
            name="lastname"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="mail"
            label="Email"
            variant="outlined"
            name="mail"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="password"
            label="Mot de passe"
            variant="outlined"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <Button
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Créer mon compte
          </Button>
        </Grid>
      </Grid>
    </section>
  );
}
