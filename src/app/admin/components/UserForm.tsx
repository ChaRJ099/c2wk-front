'use client'
import React from "react";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { IUser } from "@/app/interfaces/user-interface";

type CategoryFormComponentProps = {
    promoteUser: (id: number) => void;
    activeTab: number;
    updateUser: (user: IUser) => void;
    selectedCategoriesIDs: number[];
}

export default function CategoryForm({ promoteUser, activeTab, selectedCategoriesIDs }: CategoryFormComponentProps) {
    

    const handleSubmit = (e: any) => {
    }

    return (
        <Box
        sx={{ display: 'flex', flexDirection: 'column'}}
        component="form"
        >
            <h4>Which user to promote?</h4>
         
        </Box>
    )
};