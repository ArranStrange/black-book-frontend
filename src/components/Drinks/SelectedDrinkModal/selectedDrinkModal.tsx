import React from "react";
import { toSentenceCase } from "../../../hooks/useToSentenceCase";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Paper,
  Table,
  TableCell,
  useTheme,
  Rating,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import {
  closeDrinkModal,
  showEditDrinkModal,
} from "../../../redux/slices/drinksSlice";

const SelectedDrinkModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isGuest = useAppSelector((state) => state.auth.isGuest);
  const { selectedDrink, showDrinkModal } = useAppSelector(
    (state) => state.drinks
  );

  const theme = useTheme();

  if (!showDrinkModal || !selectedDrink) return null;

  return (
    <Dialog
      open={showDrinkModal}
      onClose={() => dispatch(closeDrinkModal())}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            {selectedDrink.drinkName}
          </Typography>
          <Rating
            name="rating"
            value={selectedDrink.Rating}
            max={5}
            precision={1}
            readOnly
            sx={{ color: "primary.main", gap: 1 }}
          />
          <Box sx={{ m: 1, display: "flex", gap: 1 }}>
            {!isGuest && (
              <IconButton
                onClick={() => dispatch(showEditDrinkModal())}
                color="primary"
              >
                <FaEdit />
              </IconButton>
            )}
            <IconButton
              onClick={() => dispatch(closeDrinkModal())}
              color="error"
            >
              <IoMdClose />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1.2fr" }}
          gap={4}
        >
          {/* Left */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box
              component="img"
              src={
                selectedDrink.DrinkThumb ||
                "https://www.creativefabrica.com/wp-content/uploads/2021/07/01/Cocktail-icon-Graphics-14120200-1-1-580x387.jpg"
              }
              alt={selectedDrink.drinkName}
              sx={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              fontWeight={100}
              gutterBottom
              color="text.primary"
            >
              <i>
                {toSentenceCase(
                  selectedDrink.shortDescription || "No Description"
                )}
              </i>
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns="auto 1fr"
              rowGap={1}
              columnGap={2}
              mb={2}
              borderTop={`1px solid ${theme.palette.divider}`}
              pt={2}
              mt={3}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Category:
              </Typography>
              <Typography>
                {toSentenceCase(selectedDrink.Category || "No Category")}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600}>
                Glassware:
              </Typography>
              <Typography>
                {toSentenceCase(selectedDrink.Glass || "No Glassware")}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600}>
                Ice:
              </Typography>
              <Typography>
                {toSentenceCase(selectedDrink.Ice || "No Ice")}
              </Typography>
            </Box>
          </Paper>

          {/* Right */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" gutterBottom>
              {selectedDrink.Instructions}
            </Typography>

            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Ingredients
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr"
                component={Table}
                sx={{ border: "none" }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => {
                  const ingredient =
                    selectedDrink[
                      `Ingredient${i}` as keyof typeof selectedDrink
                    ];
                  const measure =
                    selectedDrink[`Measure${i}` as keyof typeof selectedDrink];
                  return ingredient ? (
                    <React.Fragment key={i}>
                      <TableCell sx={{ border: "none", pl: 0 }}>
                        {ingredient}
                      </TableCell>
                      <TableCell sx={{ border: "none", pr: 0 }} align="right">
                        {measure ? `${measure}ml` : "-"}
                      </TableCell>
                    </React.Fragment>
                  ) : null;
                })}
              </Box>
            </Box>
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SelectedDrinkModal;
