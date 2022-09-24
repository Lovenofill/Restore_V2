import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { Product } from "../../App/models/Product";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import agent from "../../App/api/agent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();



  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {product.name.at(0)?.toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.pictureUrl}
          subheader={product.name}
        />

        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={product.pictureUrl}
          sx={{ backgroundSize: "contain", bgcolor: "#F1EFDC" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={status === "pendingAddItem" + product.id}
            onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
            size="small"
          >
            Add to cart
          </LoadingButton>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
