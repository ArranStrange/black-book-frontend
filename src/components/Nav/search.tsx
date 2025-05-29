import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Collapse,
  IconButton,
  useTheme,
  Grow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import type { SelectChangeEvent } from "@mui/material";

//file://./docs/search-bar-notes.md
interface Props {
  onSearch: (searchQuery: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }) => void;
  toggleAddDrinkForm: () => void;
  onShowAll: () => void;
}

export default function Search({ onSearch, onShowAll }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGlass, setSelectedGlass] = useState("");
  const [selectedIce, setSelectedIce] = useState("");

  const theme = useTheme();

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setSearchQuery(event.target.value);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name === "category") setSelectedCategory(value);
    else if (name === "glass") setSelectedGlass(value);
    else if (name === "ice") setSelectedIce(value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQueryObject = {
      drinkName: searchQuery.trim() || undefined,
      category: selectedCategory || undefined,
      glass: selectedGlass || undefined,
      ice: selectedIce || undefined,
    };
    onSearch(searchQueryObject);
    setShowFilters(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedGlass("");
    setSelectedIce("");
    setShowFilters(false);
    onShowAll();
  };

  if (!showSearchBar) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: { xs: 65, sm: 65, md: 100 },
          zIndex: 50,
        }}
      >
        <IconButton
          onClick={() => setShowSearchBar(true)}
          size="large"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            boxShadow: 3,
            "&:hover": { backgroundColor: theme.palette.action.hover },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <>
      <Grow in={showSearchBar} timeout={300}>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            position: "fixed",
            top: 20,
            left: 100,
            zIndex: 1300,
            width: "auto",
            backgroundColor: theme.palette.background.paper,
            boxShadow: 6,
            borderRadius: 2,
            px: 2,
            py: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            transformOrigin: "left top",
          }}
        >
          <Box
            id="searchInputContainer"
            sx={{
              width: { xs: 275, sm: 275, md: 300 },
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                placeholder="Search"
                data-testid="search-input"
                variant="standard"
                size="small"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                fullWidth
                sx={{ input: { color: theme.palette.text.primary } }}
              />
              <IconButton onClick={() => setShowSearchBar(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <Box display="flex" gap={1} mt={1}>
              <Button
                type="submit"
                data-testid="submit-search-button"
                variant="text"
                size="small"
              >
                Search
              </Button>
              <Button variant="text" size="small" onClick={handleShowAll}>
                Clear
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => setShowFilters((prev) => !prev)}
                data-testid="filters-toggle-button"
              >
                {showFilters ? "Hide Filters" : "Filters"}
              </Button>
            </Box>

            <Collapse in={showFilters} timeout="auto" unmountOnExit>
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                {[
                  {
                    label: "Category",
                    value: selectedCategory,
                    name: "category",
                    options: ["aperitif", "collins", "tiki", "sour", "fizz"],
                  },
                  {
                    label: "Glass",
                    value: selectedGlass,
                    name: "glass",
                    options: ["Highball", "Flute", "Wine", "Coup"],
                  },
                  {
                    label: "Ice",
                    value: selectedIce,
                    name: "ice",
                    options: ["Cubed", "Crushed", "Block"],
                  },
                ].map(({ label, value, name, options }) => (
                  <FormControl
                    fullWidth
                    size="small"
                    variant="standard"
                    key={name}
                  >
                    <InputLabel shrink>{label}</InputLabel>
                    <Select
                      name={name}
                      value={value}
                      onChange={handleSelectChange}
                      label={label}
                      data-testid={
                        name === "category"
                          ? "category-selection"
                          : name === "glass"
                          ? "glass-selection"
                          : name === "ice"
                          ? "ice-selection"
                          : undefined
                      }
                      MenuProps={{
                        disablePortal: process.env.NODE_ENV === "test",
                      }}
                    >
                      <MenuItem value="">Not Defined</MenuItem>
                      {options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Grow>
    </>
  );
}
