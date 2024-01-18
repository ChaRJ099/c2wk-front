import { Grid } from "@mui/material";
import Image from "next/image";
import { picturesList } from "../utils/pictures";
import styles from "../page.module.css";

interface CardProductProps {
  titre: string;
  prix: string;
}



export default function CardProduct(props: CardProductProps) {
  const { titre, prix } = props;

  const definePicture = () => {
    const randomPictureIndex = Math.floor(Math.random() * picturesList.length);
    const picture = picturesList[randomPictureIndex];
    return picture.split(".")[0];
  }
  
  const randomPicture = definePicture();

  return (
    <Grid className={styles.vignette_product}>
      <Image src={`/${randomPicture}.jpeg`} width={100} height={100} alt={`${randomPicture}`} />
      <h3>{titre}</h3>
      <p>{prix}</p>
    </Grid>
  );
}
