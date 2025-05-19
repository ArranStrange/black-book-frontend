import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Rating,
} from "@mui/material";
import { useAddDrink } from "../../../hooks/useAddDrink";
import MessageModal from "../../message/MessageModal";
import { useAppSelector } from "../../../redux/hooks";
import { categories, glasses, iceTypes } from "../../../utils/drinks.constants";

const AddDrinkForm: React.FC<{ toggleAddDrinkForm: () => void }> = ({
  toggleAddDrinkForm,
}) => {
  const { formData, handleChange, handleSubmit } =
    useAddDrink(toggleAddDrinkForm);
  const modalTitle = useAppSelector((state) => state.ui.modalTitle);
  const modalMessage = useAppSelector((state) => state.ui.modalMessage);

  function handleCloseModal(modalTitle: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(4, 1fr)",
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
        {/* Row 1*/}
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

        {/* Row 2*/}
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

        {/* Row 3*/}
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
            gridColumn: "span 4",
            height: "100%",
          }}
        />
        <TextField
          label="Description"
          name="Description"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          multiline
          rows={4}
          fullWidth
          sx={{
            gridColumn: "span 3",
            height: "100%",
          }}
        />
        {/* <TextField
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
        /> */}

        <Box
          sx={{
            gridColumn: "span 1",
            gridRow: "span 1",
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
            style={{
              maxHeight: "120px",
              objectFit: "cover",
              width: "120px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          />
        </Box>

        {/* Row 4 */}

        <TextField
          label="Thumbnail URL"
          name="DrinkThumb"
          value={formData.DrinkThumb}
          onChange={handleChange}
          fullWidth
          sx={{
            gridColumn: "span 4",
          }}
        />

        <Box
          sx={{
            gridColumn: "1 / span 4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating
            name="Rating"
            value={formData.Rating}
            max={5}
            precision={1}
            onChange={(_, newValue) => {
              handleChange({
                target: { name: "Rating", value: newValue ?? 0 },
              } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            sx={{
              color: "primary.main",
            }}
          />
        </Box>

        {/* Submit Button */}
        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "150px" }}
          >
            Add Drink
          </Button>
        </Box>
      </Box>

      {modalMessage && modalTitle && (
        <MessageModal
          message={modalMessage}
          title={modalTitle}
          onClose={() => handleCloseModal(modalTitle)}
        />
      )}
    </>
  );
};

export default AddDrinkForm;
