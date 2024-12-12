import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Productcard from "../../components/Card";
import { getProducts } from "../../utils/api";
import { useState, useEffect } from "react";
export default function Product() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid size={4}>
            <Productcard />
          </Grid>
          <Grid size={4}>
            <Productcard />
          </Grid>
          <Grid size={4}>
            <Productcard />
          </Grid>
          <Grid size={4}>
            <Productcard />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
