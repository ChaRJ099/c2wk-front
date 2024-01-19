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
// import CategoryForm from "../components/CategoryForm";
import { AuthContext } from "@/app/context/Authcontext";
import {
  Product,
  ProductInterface,
  ProductPostPayload,
} from "@/app/interfaces/product-interface";
import * as apiProductService from "@/app/services/api-products-service";
import CategoryForm from "../components/CategoryForm";
import ProductForm from "../components/ProductForm";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [token, setToken] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductsIDs, setSelectedProductsIDs] = useState<number[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    apiProductService.getProducts().then((data) => setProducts(data));
  }, []);

  const addProduct = async (newProduct: ProductPostPayload) => {
    token &&
      apiProductService
        .postProduct(newProduct, token)
        .then((response) => setProducts([...products, response]));

    setActiveTab(0);
  };

  const deleteProduct = async (productId: number) => {
    token &&
      apiProductService.deleteProduct(productId, token).then((status) => {
        status === 204 &&
          apiProductService.getProducts().then((data) => setProducts(data));
      });
  };

  const updateProduct = async (
    productId: number,
    product: ProductPostPayload
  ) => {
    token &&
      apiProductService
        .updateProduct(productId, product, token)
        .then((status) => {
          status === 200 &&
            apiProductService.getProducts().then((data) => setProducts(data));
        });
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

  const handleProductSelection = (id: number) => {
    if (activeTab === 2) {
      setSelectedProductsIDs([id]);
    } else {
      if (!selectedProductsIDs.includes(id)) {
        setSelectedProductsIDs([...selectedProductsIDs, id]);
      } else {
        const idFoundIndex = selectedProductsIDs.findIndex(
          (element) => element === id
        );
        selectedProductsIDs.splice(idFoundIndex, 1);
        setSelectedProductsIDs([...selectedProductsIDs]);
      }
    }
  };

  const handleDelete = async (selection: number[]) => {
    for (const id of selection) {
      deleteProduct(id);
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
        {products &&
          products?.map((product: Product) => (
            <Button
              key={product.id_product}
              sx={{
                height: "30px",
                width: "100px",
                backgroundColor: `${defineBadgeColor(product.name_product)}`,
                color: "#000",
                textAlign: "center",
                borderRadius: "5px",
                transform: `${
                  selectedProductsIDs.includes(product.id_product)
                    ? "scale(1.2)"
                    : "scale(1)"
                }`,
                m: "0 5px",
              }}
              onClick={() => handleProductSelection(product.id_product)}
            >
              {product.name_product}
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
        <ProductForm
          activeTab={activeTab}
          addProduct={addProduct}
          updateProduct={updateProduct}
          selectedProductsIDs={selectedProductsIDs}
        />
      )}
      {activeTab === 3 && (
        <Button
          variant="contained"
          onClick={() => handleDelete(selectedProductsIDs)}
          // disabled={selectedProductsIDs.length === 0}
        >
          Delete
        </Button>
      )}
    </Box>
  );
}
