import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Container, Typography } from "@mui/material";
import { IMAGES_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import ProductDataService from "../../services/ProductService";

export default function ShowProduct() {
  const navigate = useNavigate();

  const params = useParams();
  const id = parseInt(params.id.trim());

  const [productById, setproductById] = useState(null);

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  const getProductById = async () => {
    try {
      const { data } = await ProductDataService.get(id);
      if (!isEmptyObject(data)) {
        setproductById({ ...data });
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

  const showPreviewImage = () => {
    if (productById) {
      const path = `${IMAGES_URL}/${productById.p_image}`;
      return <img src={path} style={{ height: 100, marginTop: 16 }} />;
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
              ข้อมูลสินค้า
            </Typography>
            <Box>
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} sx={{ marginTop: 2 }}>
                    <Typography variant="h8" gutterBottom>
                      ไอดีสินค้า
                    </Typography>
                    <Box
                      sx={{
                        fontWeight: "light",
                        marginLeft: 2,
                      }}
                    >
                      {id}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h8" gutterBottom>
                      ชื่อสินค้า
                    </Typography>
                    <Box
                      sx={{
                        fontWeight: "light",
                        marginLeft: 2,
                      }}
                    >
                      {productById.p_name}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h8" gutterBottom>
                      ไอดีสินค้า
                    </Typography>
                    <Box
                      sx={{
                        fontWeight: "light",
                        marginLeft: 2,
                      }}
                    >
                      Light
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h8" gutterBottom>
                      ราคาสินค้า
                    </Typography>
                    <Box
                      sx={{
                        fontWeight: "light",
                        marginLeft: 2,
                      }}
                    >
                      {productById.p_price}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h8" gutterBottom>
                      จำนวนที่เหลือ
                    </Typography>
                    <Box
                      sx={{
                        fontWeight: "light",
                        marginLeft: 2,
                      }}
                    >
                      {productById.p_count}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h8" gutterBottom>
                      ภาพสินค้า
                    </Typography>
                    <Box
                      sx={{
                        fontWeight: "light",
                        marginLeft: 2,
                      }}
                    >
                      {showPreviewImage()}
                    </Box>
                  </Grid>
                </Grid>
              </React.Fragment>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}
