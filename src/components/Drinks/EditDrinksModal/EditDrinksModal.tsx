import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal/ConfirmDeleteModal";
import { useEditDrink } from "../../../hooks/useEditDrink";
import { closeEditDrinkModal } from "../../../redux/slices/drinksSlice";

import {
  Box,
  TextField,
  IconButton,
  Typography,
  Stack,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";

export type Drink = {
  drinkName?: string;
  Category?: string;
  Glass?: string;
  Instructions?: string;
  shortDescription?: string;
  DrinkThumb?: string;
  Rating?: number;
} & {
  [key in `Ingredient${1 | 2 | 3 | 4 | 5 | 6}`]?: string;
} & {
  [key in `Measure${1 | 2 | 3 | 4 | 5 | 6}`]?: string;
};

const EditDrinkModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedDrink } = useAppSelector((state) => state.drinks);

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
  } = useEditDrink(selectedDrink ?? { _id: "", drinkName: "" });

  if (!selectedDrink) return null;

  return (
    <Dialog
      open
      onClose={() => dispatch(closeEditDrinkModal())}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Drink</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          <TextField
            label="Drink Name"
            name="drinkName"
            value={editedDrink.drinkName || ""}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Category"
              name="Category"
              value={editedDrink.Category || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Glass Type"
              name="Glass"
              value={editedDrink.Glass || ""}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <TextField
            label="Instructions"
            name="Instructions"
            value={editedDrink.Instructions || ""}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
          />

          <TextField
            label="Description"
            name="shortDescription"
            value={editedDrink.shortDescription || ""}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
          />

          <Divider />

          <Typography variant="subtitle1">Ingredients</Typography>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Stack direction="row" spacing={2} key={i}>
              <TextField
                label={`Ingredient ${i}`}
                name={`Ingredient${i}`}
                value={editedDrink[`Ingredient${i}` as keyof Drink] || ""}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label={`Measure ${i}`}
                name={`Measure${i}`}
                value={editedDrink[`Measure${i}` as keyof Drink] || ""}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          ))}

          <Stack spacing={2} alignItems="center">
            <TextField
              label="Thumbnail URL"
              name="DrinkThumb"
              value={editedDrink.DrinkThumb || ""}
              onChange={handleChange}
              fullWidth
            />

            <Box
              sx={{
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
          </Stack>

          {error && <Typography color="error">{error}</Typography>}

          <Divider />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <IconButton color="success" type="submit" disabled={isSaving}>
              <GiConfirmed />
            </IconButton>
            <IconButton
              color="warning"
              onClick={() => dispatch(closeEditDrinkModal())}
            >
              <MdCancel />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <RiDeleteBin6Line />
            </IconButton>
          </Stack>
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
