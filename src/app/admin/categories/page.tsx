"use client";
import React, { useContext, useState, useEffect } from "react";
import { colors } from "@/app/utils/colors";
import styles from "../../page.module.css";
import {
  Button,
  Grid,
  TextField,
  Box,
  Icon,
  Typography,
  Badge,
} from "@mui/material";
import {
  AddCircleOutline,
  UpdateOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import CategoryForm from "../components/CategoryForm";
import { Category } from "@/app/interfaces/category-interface";
import { AuthContext } from "@/app/context/Authcontext";

const apiUrl = "http://23.97.147.233:5001";

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [token, setToken] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoriesIDs, setSelectedCategoriesIDs] = useState<number[]>(
    []
  );
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);
  const getCategories = async () => {
    const response = await fetch(`${apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => data);
    setCategories(response);
  };

  useEffect(() => {
    getCategories();
    return () => {
      setActiveTab(0);
    };
  }, []);

  const addCategory = async (nameCategory: string) => {
    const newCategory = {
      nameCategory: nameCategory,
    };
    console.log("Bearer " + token);
    await fetch(`${apiUrl}/api/categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then((data: Category) => {
        if (data) {
          setCategories([...categories, data]);
        }
      });
    setActiveTab(0);
  };

  const handleChipClick = (n: number) => {
    setActiveTab(n);
  };

  function defineBadgeColor(categoryName: string) {
    const arrayFound = colors.find((element) => element[0] === categoryName);
    if (arrayFound) {
      return arrayFound[1];
    } else {
      return "#e4e4e4";
    }
  }

  const handleCategorySelection = (id: number) => {
    if (activeTab === 2) {
      setSelectedCategoriesIDs([id]);
    } else {
      if (!selectedCategoriesIDs.includes(id)) {
        setSelectedCategoriesIDs([...selectedCategoriesIDs, id]);
      } else {
        const idFoundIndex = selectedCategoriesIDs.findIndex(
          (element) => element === id
        );
        selectedCategoriesIDs.splice(idFoundIndex, 1);
        setSelectedCategoriesIDs([...selectedCategoriesIDs]);
      }
    }
  };

  const updateCategory = async (id: number, name: string) => {
    const categoryToUpdate = {
      nameCategory: name,
    };
    const response = await fetch(`${apiUrl}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(categoryToUpdate),
    })
      .then((response) => response.json())
      .then((data) => data);
    const categoryIndex = categories.findIndex(
      (element) => element.name_category === name
    );
    categories.splice(categoryIndex, 1, response);
    setCategories([...categories]);
    setActiveTab(0);
  };

  const deleteCategory = async (id: number) => {
    const response = await fetch(`${apiUrl}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((data) => data);

    if (response === "") {
      const index = categories.findIndex(
        (element) => element.id_category === id
      );
      categories.splice(index, 1);
      setCategories([...categories]);
    }
  };

  const handleDelete = async (selection: number[]) => {
    for (const id of selection) {
      deleteCategory(id);
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
      <h3 className="admin_h3">Manage your categories here</h3>
      <Typography>What&#39;s your mood today ?</Typography>
      <Box
        sx={{
          height: "60px",
          width: "60%",
          display: "grid",
          gridTemplateColumns: "30% 30% 30%",
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
          Add
        </Button>
        <Button
          variant="outlined"
          className={
            activeTab === 2 ? styles.admin_chip_active : styles.admin_chip
          }
          onClick={() => handleChipClick(2)}
        >
          <Icon fontSize="small" sx={{ height: "25px", width: "25px" }}>
            <UpdateOutlined />
          </Icon>
          Update
        </Button>
        <Button
          variant="outlined"
          className={
            activeTab === 3 ? styles.admin_chip_active : styles.admin_chip
          }
          onClick={() => handleChipClick(3)}
        >
          <Icon fontSize="small" sx={{ height: "25px", width: "25px" }}>
            <DeleteOutline />
          </Icon>
          Delete
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "10%",
          width: "80%",
          m: "auto",
          gap: "15px",
        }}
      >
        <Typography>Your current categories :</Typography>
        {categories &&
          categories?.map((category: Category) => (
            <Button
              key={category.id_category}
              sx={{
                height: "30px",
                width: "100px",
                backgroundColor: `${defineBadgeColor(category.name_category)}`,
                color: "#000",
                textAlign: "center",
                borderRadius: "5px",
                transform: `${
                  selectedCategoriesIDs.includes(category.id_category)
                    ? "scale(1.2)"
                    : "scale(1)"
                }`,
                m: "0 5px",
              }}
              onClick={() => handleCategorySelection(category.id_category)}
            >
              {category.name_category}
            </Button>
          ))}
      </Box>
      {activeTab === 2 && (
        <Typography>
          Select the category you want to update and enter the new name
        </Typography>
      )}
      {activeTab === 3 && (
        <Typography>Select the categories you want to delete</Typography>
      )}
      {(activeTab === 1 || activeTab === 2) && (
        <CategoryForm
          activeTab={activeTab}
          addCategory={addCategory}
          updateCategory={updateCategory}
          selectedCategoriesIDs={selectedCategoriesIDs}
        />
      )}
      {activeTab === 3 && (
        <Button
          variant="contained"
          onClick={() => handleDelete(selectedCategoriesIDs)}
          disabled={selectedCategoriesIDs.length === 0}
        >
          Delete
        </Button>
      )}
    </Box>
  );
}
