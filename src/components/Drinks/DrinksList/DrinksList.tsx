import React from "react";
import { useFilterDrinks } from "../../../hooks/useFilterDrinks";
import { Drink } from "../../types/types";
import "./drinks-list.css";
import EditDrinkModal from "../EditDrinksModal/EditDrinksModal";
import { selectDrink } from "../../../redux/slices/drinksSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import SelectedDrinkModal from "../SelectedDrinkModal/selectedDrinkModal";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Loading from "../../Loading/Loading";
import { ErrorMessage } from "../../Error/Error";
//
//Docs: file://./docs/DrinksList.NOTE.md
//
//
//
interface DrinksListProps {
  selectedLetter: string;
  searchQuery: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  };
}

const DrinksList: React.FC<DrinksListProps> = ({
  selectedLetter,
  searchQuery,
}) => {
  const filteredDrinks = useFilterDrinks(selectedLetter, searchQuery);
  const loading = useAppSelector((state) => state.drinks.loading);
  const error = useAppSelector((state) => state.drinks.error);
  const isGuest = useAppSelector((state) => state.auth.isGuest);

  const dispatch = useAppDispatch();
  const { showDrinkModal, showEditModal } = useAppSelector(
    (state) => state.drinks
  );

  const handleDrinkClick = (drink: Drink) => {
    dispatch(selectDrink(drink));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error as string} />;
  }

  return (
    <>
      <Box
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          pt: 5,
          pb: 10,
          zIndex: 1,
          position: "relative",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {filteredDrinks.map((drink) => (
            <Grid
              item
              key={drink._id}
              xs={5}
              sm={6}
              md={4}
              lg={3}
              {...(undefined as any)}
            >
              <Card
                sx={{
                  height: 320,
                  width: 300,
                  borderRadius: 2,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => handleDrinkClick(drink)}
              >
                <CardMedia
                  component="img"
                  image={
                    drink.DrinkThumb ||
                    "https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-cocktail-icon-png-image_1376820.jpg"
                  }
                  alt={drink.drinkName}
                  sx={{ height: 200 }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Typography variant="h6" noWrap>
                    {drink.drinkName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {drink.shortDescription || "No description set."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {showDrinkModal && <SelectedDrinkModal />}
      {showEditModal && <EditDrinkModal />}
    </>
  );
};

export default DrinksList;
