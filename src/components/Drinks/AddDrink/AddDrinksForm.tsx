import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useAddDrink } from "../../../hooks/useAddDrink";
import MessageModal from "../../message/MessageModal";

const categories = [
  "Cobbler",
  "Collins",
  "Daisy",
  "Flip",
  "Frozen",
  "Highball",
  "Julep",
  "Martini",
  "Punch",
  "Sling",
  "Sour",
  "Tiki",
  "Toddy",
  "Spritz",
  "Fizz",
];

const glasses = [
  "Highball",
  "Coup",
  "Hurricane",
  "Old Fashioned",
  "Julep Tin",
  "Wine",
  "Flute",
];

const iceTypes = ["Cubed", "Crushed", "Block", "Shaved", "Straight"];

const AddDrinkForm: React.FC<{ toggleAddDrinkForm: () => void }> = ({
  toggleAddDrinkForm,
}) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    modalTitle,
    modalMessage,
    handleCloseModal,
  } = useAddDrink(toggleAddDrinkForm);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          p: 4,
          pb: 10,
          maxWidth: 1000,
          height: "100vh",
          overflowY: "auto",
          mx: "auto",
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          component="h1"
          sx={{
            textAlign: "center",
            gridColumn: { xs: "span 4", sm: "span 4", md: "span 4" },
          }}
        >
          Add A Drink
        </Typography>
        {/* Row 1: Name, Category, Glass, Ice */}
        <TextField
          label="Drink Name"
          name="drinkName"
          value={formData.drinkName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ gridColumn: { xs: "span 4", sm: "span 2", md: "span 2" } }}
        />
        <TextField
          select
          label="Category"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          required
          fullWidth
          sx={{ gridColumn: { xs: "span 4", sm: "span 2", md: "span 2" } }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option.toLowerCase()}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Glass"
          name="Glass"
          value={formData.Glass}
          onChange={handleChange}
          required
          fullWidth
          sx={{ gridColumn: { xs: "span 4", sm: "span 2", md: "span 2" } }}
        >
          {glasses.map((option) => (
            <MenuItem key={option} value={option.toLowerCase()}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Ice"
          name="Ice"
          value={formData.Ice}
          onChange={handleChange}
          fullWidth
          sx={{ gridColumn: { xs: "span 4", sm: "span 2", md: "span 2" } }}
        >
          {iceTypes.map((option) => (
            <MenuItem key={option} value={option.toLowerCase()}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Row 2: Ingredient/Measure 1/2 */}
        <TextField
          label="Ingredient 1"
          name="Ingredient1"
          value={formData.Ingredient1}
          onChange={handleChange}
          fullWidth
          sx={{ gridColumn: "span 3" }}
        />
        <TextField
          label="Measure 1 (ml)"
          name="Measure1"
          type="number"
          value={formData.Measure1}
          onChange={handleChange}
          fullWidth
          sx={{ gridColumn: "span 1" }}
        />

        {/* Row 3: Instructions and Rating */}
        <TextField
          label="Instructions"
          name="Instructions"
          value={formData.Instructions}
          onChange={handleChange}
          required
          multiline
          rows={4}
          fullWidth
          sx={{
            gridColumn: { xs: "span 4", sm: "span 3", md: "span 3" },
            height: "100%",
          }}
        />
        <TextField
          label="Rating (0–10)"
          name="Rating"
          type="number"
          value={formData.Rating}
          onChange={handleChange}
          inputProps={{ min: 0, max: 10 }}
          required
          fullWidth
          sx={{
            gridColumn: { xs: "span 4", sm: "span 1", md: "span 1" },
            height: "100%",
          }}
        />

        {/* Row 4: Thumbnail and Preview */}
        <TextField
          label="Thumbnail URL"
          name="DrinkThumb"
          value={formData.DrinkThumb}
          onChange={handleChange}
          fullWidth
          sx={{
            gridColumn: { xs: "span 4", sm: "span 2", md: "span 2" },
          }}
        />
        <Box
          sx={{
            gridColumn: { xs: "span 4", sm: "span 2", md: "span 2" },

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#2e2e2b",
            borderRadius: 1,
            p: 1,
          }}
        >
          <img
            src={
              formData.DrinkThumb ||
              "https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-cocktail-icon-png-image_1376820.jpg"
            }
            alt="Preview"
            style={{ maxHeight: "120px", objectFit: "contain" }}
          />
        </Box>

        {/* Submit Button */}
        <Box sx={{ gridColumn: "span 4" }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Drink
          </Button>
        </Box>
      </Box>

      {modalMessage && modalTitle && (
        <MessageModal
          message={modalMessage}
          title={modalTitle}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AddDrinkForm;
