import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Container,
  Input,
  Typography,
  TextField,
} from "@mui/material";
import { IMAGES_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateProduct, getAllProducts } from "./productSlice";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductDataService from "../../services/ProductService";

import DialogWarnning from "./DialogWarnning";

export default function EditProduct() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChangeDialog = (status) => {
    setOpenDialog(status);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileStatus, setfileStatus] = useState(false);

  const params = useParams();
  const id = parseInt(params.id.trim());

  const [productById, setproductById] = useState(null);

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  const getProductById = async () => {
    try {
      const { data } = await ProductDataService.get(id);
      if (!isEmptyObject(data)) {
        setproductById({ ...data });
        setfileStatus(true);
      } else {
        navigate("/");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const validationSchema = Yup.object({
    p_name: Yup.string()
      .min(2, "Product name should be of minimum 2 characters length")
      .max(50, "Product should be of maximum 50 characters length!")
      .required("Product name is required"),
    p_price: Yup.number()
      .required("Product price is required")
      .positive()
      .integer(),
    p_count: Yup.number()
      .required("Product count is required")
      .positive()
      .integer(),
    p_image: Yup.mixed().required("Product image is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    if (isFileImage(selectedImage)) {
      createBase64Image(selectedImage);
      setproductById({ ...productById, p_image: selectedImage });
      setfileStatus(true);
    } else {
      setOpenDialog(true);
      console.log("ไฟล์ที่อัปโหลดไม่ใช่รูปภาพ");
      setfileStatus(false);
    }
  };

  const isFileImage = (file) => {
    return file && file.type.split("/")[0].trim() === "image";
  };

  const createBase64Image = (fileObject) => {
    if (fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setImagePreview(fileObject);
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(fileObject);
    }
  };

  const showPreviewImage = () => {
    if (imagePreview) {
      return <img src={imagePreview} style={{ height: 100, marginTop: 16 }} />;
    } else if (productById) {
      const path = `${IMAGES_URL}/${productById.p_image}`;
      return <img src={path} style={{ height: 100, marginTop: 16 }} />;
    }
  };

  const onSubmit = async (data) => {
    try {
      if (fileStatus) {
        const payload = { ...data, p_image: productById.p_image };
        await dispatch(updateProduct({ id, payload }));
        await dispatch(getAllProducts());
        await navigate("/");
      } else {
        setOpenDialog(true);
        console.log("ไฟล์ที่อัปโหลดไม่ใช่รูปภาพ");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <>
      {productById && (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              เเก้ไขสินค้า
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  รายละเอียดสินค้า
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      defaultValue={id}
                      required
                      id="p_id"
                      disabled
                      name="p_id"
                      label="ไอดีสินค้า"
                      fullWidth
                      autoComplete="given-p_id"
                      variant="standard"
                      {...register("p_id")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      defaultValue={productById.p_name}
                      required
                      id="p_name"
                      name="p_name"
                      label="ชื่อสินค้า"
                      fullWidth
                      autoComplete="given-p_name"
                      variant="standard"
                      {...register("p_name")}
                      error={errors.p_price ? true : false}
                      helperText={errors.p_name?.message}
                    />
                    <Typography variant="inherit" color="textSecondary">
                      {errors.p_name?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="p_price"
                      defaultValue={productById.p_price}
                      type="number"
                      min={0}
                      name="p_price"
                      label="ราคาสินค้า"
                      fullWidth
                      autoComplete="family-p_price"
                      variant="standard"
                      {...register("p_price")}
                      error={errors.p_price ? true : false}
                    />
                    <Typography variant="inherit" color="textSecondary">
                      {errors.p_price?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="p_count"
                      name="p_count"
                      defaultValue={productById.p_count}
                      label="จำนวนสินค้า"
                      fullWidth
                      type="number"
                      min={1}
                      autoComplete="product count"
                      variant="standard"
                      {...register("p_count")}
                      error={errors.p_count ? true : false}
                    />
                    <Typography variant="inherit" color="textSecondary">
                      {errors.p_count?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      style={{ marginTop: 20 }}
                      accept="image/*"
                      id="p_image"
                      multiple
                      fullWidth
                      required
                      type="file"
                      {...register("p_image")}
                      error={errors.p_image ? true : false}
                      onChange={(e) => {
                        handleImage(e);
                        e.preventDefault();
                      }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                      {errors.p_image?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {showPreviewImage()}
                  </Grid>
                  {/* <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="Use this address for payment details"
              />
            </Grid> */}
                </Grid>
              </React.Fragment>

              <Button
                variant="contained"
                type="submit"
                color="warning"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                เเก้ไข
              </Button>
            </Box>
          </Paper>
          <DialogWarnning
            openDialog={openDialog}
            handleChangeDialog={handleChangeDialog}
          />
        </Container>
      )}
    </>
  );
}
