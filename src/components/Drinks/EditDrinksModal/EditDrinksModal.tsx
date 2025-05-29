import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal/ConfirmDeleteModal";
import { useEditDrink } from "../../../hooks/useEditDrink";
import { closeEditDrinkModal } from "../../../redux/slices/drinksSlice";
import { categories, glasses, iceTypes } from "../../../utils/drinks.constants";

import {
  Box,
  TextField,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  MenuItem,
  Button,
} from "@mui/material";

const EditDrinkModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedDrink } = useAppSelector((state) => state.drinks);

  const hook = useEditDrink(
    selectedDrink ?? { _id: "", drinkName: "", Ingredients: [] }
  );

  if (!selectedDrink) return null;

  const {
    editedDrink,
    handleChange,
    handleSave,
    handleDeleteClick,
    handleConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    isSaving,
    error,
    handleIngredientChange,
    addIngredientField,
    removeIngredientField,
  } = hook;

  return (
    <Dialog
      open
      onClose={() => dispatch(closeEditDrinkModal())}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Drink</Typography>
          <IconButton onClick={() => dispatch(closeEditDrinkModal())}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(12, 1fr)" },
            gap: 2,
            p: 4,
            pb: 10,
            maxWidth: 1000,
            height: "100vh",
            overflowY: "auto",
            mx: "auto",
          }}
        >
          <TextField
            label="Drink Name"
            name="drinkName"
            value={editedDrink.drinkName || ""}
            onChange={handleChange}
            required
            fullWidth
            sx={{ gridColumn: "span 12" }}
          />

          <TextField
            select
            label="Category"
            name="Category"
            value={editedDrink.Category}
            onChange={handleChange}
            required
            fullWidth
            sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}
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
            value={editedDrink.Glass}
            onChange={handleChange}
            required
            fullWidth
            sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}
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
            value={editedDrink.Ice}
            onChange={handleChange}
            fullWidth
            sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}
          >
            {iceTypes.map((option) => (
              <MenuItem key={option} value={option.toLowerCase()}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {editedDrink.Ingredients.map((ing, index) => {
            const isLast = index === editedDrink.Ingredients.length - 1;
            return (
              <React.Fragment key={index}>
                <TextField
                  label={`Ingredient ${index + 1}`}
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  fullWidth
                  sx={{ gridColumn: { xs: "span 12", md: "span 9" } }}
                />
                <TextField
                  label="Measure (ml)"
                  type="number"
                  value={ing.measure}
                  onChange={(e) =>
                    handleIngredientChange(index, "measure", e.target.value)
                  }
                  fullWidth
                  sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}
                />
                <Box
                  sx={{
                    gridColumn: { xs: "span 12", md: "span 1" },
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {editedDrink.Ingredients.length > 1 && (
                    <Button
                      onClick={() => removeIngredientField(index)}
                      variant="outlined"
                      color="error"
                      sx={{ minWidth: "40px" }}
                    >
                      −
                    </Button>
                  )}
                  {isLast && (
                    <Button
                      onClick={addIngredientField}
                      variant="outlined"
                      color="primary"
                      sx={{ minWidth: "40px" }}
                    >
                      +
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            );
          })}

          <TextField
            label="Instructions"
            name="Instructions"
            value={editedDrink.Instructions || ""}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
            sx={{ gridColumn: "span 12" }}
          />

          <TextField
            label="Description"
            name="shortDescription"
            value={editedDrink.shortDescription || ""}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
            sx={{ gridColumn: "span 12" }}
          />

          <Box
            sx={{
              gridColumn: "span 12",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#2e2e2b",
              borderRadius: 1,
              p: 1,
            }}
          >
            <img
              src={
                editedDrink.DrinkThumb ||
                "https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-cocktail-icon-png-image_1376820.jpg"
              }
              alt="Preview"
              style={{
                maxHeight: "120px",
                objectFit: "cover",
                width: "120px",
                borderRadius: "8px",
              }}
            />
          </Box>

          <TextField
            label="Thumbnail URL"
            name="DrinkThumb"
            value={editedDrink.DrinkThumb || ""}
            onChange={handleChange}
            fullWidth
            sx={{ gridColumn: "span 12" }}
          />

          <Box
            sx={{
              gridColumn: "span 12",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Rating
              name="Rating"
              value={editedDrink.Rating ?? 0}
              max={5}
              precision={1}
              onChange={(_, newValue) => {
                handleChange({
                  target: {
                    name: "Rating",
                    value: newValue ?? 0,
                  },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
              sx={{ color: "primary.main" }}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ gridColumn: "span 12" }}>
              {error}
            </Typography>
          )}

          <Box
            sx={{
              gridColumn: "span 12",
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton color="success" type="submit" disabled={isSaving}>
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              color="warning"
              onClick={() => dispatch(closeEditDrinkModal())}
            >
              <CloseIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {showConfirmDelete && (
          <ConfirmDeleteModal
            drinkName={editedDrink.drinkName || "this drink"}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowConfirmDelete(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDrinkModal;
