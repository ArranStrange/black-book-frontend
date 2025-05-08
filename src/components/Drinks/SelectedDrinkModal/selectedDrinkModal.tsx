import React from "react";
import { toSentenceCase } from "../../../hooks/useToSentenceCase";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Drink } from "../../types/types";
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
} from "@mui/material";

interface SelectedDrinkModalProps {
  drink: Drink;
  onClose: () => void;
  onEdit: () => void;
  isGuest: boolean;
}

const SelectedDrinkModal: React.FC<SelectedDrinkModalProps> = ({
  drink,
  onClose,
  onEdit,
  isGuest,
}) => {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            {drink.drinkName}
          </Typography>
          <Box>
            {!isGuest && (
              <IconButton onClick={onEdit} color="primary">
                <FaEdit />
              </IconButton>
            )}
            <IconButton onClick={onClose} color="error">
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
                drink.DrinkThumb ||
                "https://www.creativefabrica.com/wp-content/uploads/2021/07/01/Cocktail-icon-Graphics-14120200-1-1-580x387.jpg"
              }
              alt={drink.drinkName}
              sx={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Box
              display="grid"
              gridTemplateColumns="auto 1fr"
              rowGap={1}
              columnGap={2}
              mb={2}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Category:
              </Typography>
              <Typography>
                {toSentenceCase(drink.Category || "No Category")}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600}>
                Glassware:
              </Typography>
              <Typography>
                {toSentenceCase(drink.Glass || "No Glassware")}
              </Typography>
            </Box>
          </Paper>

          {/* Right */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" gutterBottom>
              {drink.Instructions}
            </Typography>

            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Ingredients
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gap={1}
                component={Table}
                sx={{ border: "none" }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => {
                  const ingredient = drink[`Ingredient${i}` as keyof Drink];
                  const measure = drink[`Measure${i}` as keyof Drink];
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
