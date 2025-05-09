import React, { useState } from "react";
import { useDrinks } from "../../../hooks/useDrinks";
import { useFilterDrinks } from "../../../hooks/useFilterDrinks";
import { Drink } from "../../types/types";
import "./drinks-list.css";
import EditDrinkModal from "../EditDrinksModal/EditDrinksModal";
import Shaker from "../../assets/shaker.png";
import Spill from "../../assets/spil.png";
import SelectedDrinkModal from "../SelectedDrinkModal/selectedDrinkModal";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
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
  const { drinks, loading, error, handleSaveEdit, handleDelete } = useDrinks();
  const filteredDrinks = useFilterDrinks(drinks, selectedLetter, searchQuery);

  const isGuest = localStorage.getItem("authToken") === "guest";

  const [showDrinkModal, setShowDrinkModal] = useState<boolean>(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleDrinkClick = (drink: Drink) => {
    setSelectedDrink(drink);
    setShowDrinkModal(true);
  };

  const handleCloseDrinkModal = () => {
    setShowDrinkModal(false);
    setSelectedDrink(null);
  };

  const handleEditClick = () => {
    if (!selectedDrink) return;
    setShowDrinkModal(false);
    setShowEditModal(true);
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setSelectedDrink(null);
  };

  if (loading) {
    return (
      <div className="fetch-messages">
        <div className="loading-message">
          <img src={Shaker} className="loading-shaker" alt="loading shaker" />
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fetch-messages">
        <div className="loading-message">
          <img
            src={Spill}
            className="network-error"
            alt="network error shaker"
          />
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          p: 10,
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

      {showDrinkModal && selectedDrink && (
        <SelectedDrinkModal
          drink={selectedDrink}
          onClose={handleCloseDrinkModal}
          onEdit={handleEditClick}
          isGuest={isGuest}
        />
      )}

      {showEditModal && selectedDrink && (
        <EditDrinkModal
          drink={selectedDrink}
          onSave={handleSaveEdit}
          setShowEditModal={setShowEditModal}
          onCancel={cancelEdit}
          onDelete={() => handleDelete(selectedDrink._id)}
        />
      )}
    </>
  );
};

export default DrinksList;
