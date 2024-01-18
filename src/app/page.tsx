"use client";
import styles from "./page.module.css";
import CardProduct from "./components/product";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as apiProductService from "./services/api-products-service";
import * as apiCategoryService from "./services/api-categories-service";
import { Product } from "./interfaces/product-interface";
import { Category } from "./interfaces/category-interface";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsSorted, setProductsSorted] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState<number[]>([]);

  useEffect(() => {
    async function getData() {
      await apiProductService.getProducts().then((data) => {
        setProducts(data);
        setProductsSorted(data);
      });
    }
    getData();
    console.log(products);
  }, []);

  useEffect(() => {
    async function getData() {
      setCategories(await apiCategoryService.getCategories());
    }
    getData();
  }, []);

  const sortProductByCategory = (id: number, isChecked: boolean) => {
    if (isChecked) {
      const categoriesSelected = categorySelected;

      categoriesSelected.push(id);
      setCategorySelected(categoriesSelected);
    } else {
      const categoriesSelected = categorySelected;

      categoriesSelected.find((elem, index) => {
        if (elem === id) {
          categoriesSelected.splice(index, 1);
        }
      });

      setCategorySelected(categoriesSelected);
    }

    if (categorySelected.length === 0) {
      setProductsSorted(products);
      return;
    }

    const productsSorted: Product[] = [];
    categorySelected.forEach((cat) => {
      products.forEach((prod: Product) => {
        if (cat === prod.category_id) {
          productsSorted.push(prod);
        }
      });
    });
    setProductsSorted(productsSorted);
  };

  return (
    <main className={(styles.main, styles.homepage)}>
      <aside className={styles.sidebar}>
        <Grid
          container
          flexDirection="column"
          minWidth="max-content"
          marginRight="16px"
        >
          <h2 className={styles.sidebar_title}>Affiner par catégories</h2>
          <FormGroup>
            {categories.map((category: Category) => {
              return (
                <FormControlLabel
                  key={category.id_category}
                  control={
                    <Checkbox
                      onChange={(event) =>
                        sortProductByCategory(
                          category.id_category,
                          event.target.checked
                        )
                      }
                    />
                  }
                  label={category.name_category}
                />
              );
            })}
          </FormGroup>
        </Grid>
        <Divider
          variant="middle"
          orientation="vertical"
          sx={{ height: "100vh" }}
        />
      </aside>

      <section className={styles.home_group_sections}>
        <section className={styles.section_products}>
          <h1 className={styles.title}>Nos produits</h1>
          <Grid className={styles.list_products}>
            {productsSorted.map((product: Product) => {
              return (
                <Link
                  href={`/products/${product.id_product}`}
                  key={product.id_product}
                >
                  <CardProduct
                    titre={product.name_product}
                    prix={`${product.price} ₽`}
                  ></CardProduct>
                </Link>
              );
            })}
          </Grid>
        </section>
      </section>
    </main>
  );
}
