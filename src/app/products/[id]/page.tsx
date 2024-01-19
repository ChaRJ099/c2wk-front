"use client";
import styles from "../../page.module.css";
import { Button, Grid } from "@mui/material";
import { ArrowBack, Image } from "@mui/icons-material";
import Link from "next/link";
import * as apiProductService from "../../services/api-products-service";
import { useEffect, useState } from "react";
import { ProductInterface } from "@/app/interfaces/product-interface";
// import { useRouter } from "next/navigation";

export default function Product({ params }: { params: { id: number } }) {
  const [product, setProduct] = useState<ProductInterface>({
    productName: "",
    price: 0,
    picture: "",
    description: "",
    category: "",
  });

  console.log("router", params.id);

  useEffect(() => {
    async function getData() {
      setProduct(await apiProductService.getProduct(params.id));
    }
    getData();
  }, []);

  return (
    <section>
      <Grid className={styles.breadcrumb}>
        <Link href="/">
          <ArrowBack />
        </Link>

        <p>Retour à la liste des produits</p>
      </Grid>
      <Grid className={styles.page_produit}>
        <Image sx={{ fontSize: "400px", color: "grey" }}></Image>
        <Grid
          container
          flexDirection="column"
          gap="32px"
          marginTop="50px"
          marginRight="50px"
        >
          <Grid container flexDirection="column" gap="16px">
            {" "}
            <h1>{product.productName}</h1>
            <p>{product.description}</p>
            <p>{product.price} ₽</p>
          </Grid>

          <Button variant="contained" sx={{ width: "max-content" }}>
            Ajouter au panier
          </Button>
        </Grid>
      </Grid>
    </section>
  );
}
