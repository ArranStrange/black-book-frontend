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
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

// Docs: file://./docs/search-bar-notes.md#props
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
  // Docs: file://./docs/search-bar-notes.md#ui_states
  const [showFilters, setShowFilters] = useState(false);

  // Docs: file://./docs/search-bar-notes.md#search_input_states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGlass, setSelectedGlass] = useState("");
  const [selectedIce, setSelectedIce] = useState("");

  const theme = useTheme();

  // Docs: file://./docs/search-bar-notes.md#handlesearchquerychange
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setSearchQuery(event.target.value);

  // Docs: file://./docs/search-bar-notes.md#handleselectchange
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name === "category") setSelectedCategory(value);
    else if (name === "glass") setSelectedGlass(value);
    else if (name === "ice") setSelectedIce(value);
  };

  // Docs: file://./docs/search-bar-notes.md#handlesearchsubmit
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

  // Docs: file://./docs/search-bar-notes.md#handleshowall
  const handleShowAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedGlass("");
    setSelectedIce("");
    setShowFilters(false);
    onShowAll();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        width: "100%",
        maxWidth: "900px",
        mx: "auto",
        px: 2,
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        borderBottom: "none",
      }}
    >
      <Box
        display="flex"
        gap={1}
        alignItems="center"
        width="100%"
        justifyContent="center"
        mb={showFilters ? 2 : 0}
      >
        <TextField
          placeholder="Search"
          variant="standard"
          size="small"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          sx={{ flex: 1, input: { color: theme.palette.text.primary } }}
        />
        <Button type="submit" variant="text" size="small">
          Search
        </Button>
        <Button variant="text" size="small" onClick={handleShowAll}>
          Clear
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "Hide Filters" : "Filters"}
        </Button>
      </Box>

      <Collapse in={showFilters} timeout="auto" unmountOnExit>
        <Box
          min-width="100%"
          mt={1}
          p={2}
          borderRadius={2}
          bgcolor="background.paper"
          boxShadow={3}
          display="flex"
          gap={2}
          flexWrap="wrap"
        >
          <FormControl fullWidth size="small" variant="standard">
            <InputLabel shrink>Category</InputLabel>
            <Select
              name="category"
              value={selectedCategory}
              onChange={handleSelectChange}
              label="Category"
            >
              <MenuItem value="">Not Defined</MenuItem>
              {[
                "aperitif",
                "cobbler",
                "collins",
                "daisy",
                "flip",
                "frozen",
                "highball",
                "julep",
                "martini",
                "punch",
                "sling",
                "sour",
                "tiki",
                "toddy",
                "spritz",
                "fizz",
              ].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" variant="standard">
            <InputLabel shrink>Glass</InputLabel>
            <Select
              name="glass"
              value={selectedGlass}
              onChange={handleSelectChange}
              label="Glass"
            >
              <MenuItem value="">Not Defined</MenuItem>
              {[
                "Highball",
                "Coup",
                "Hurricane",
                "Old Fashioned",
                "Julep Tin",
                "Wine",
                "Flute",
              ].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" variant="standard">
            <InputLabel shrink>Ice</InputLabel>
            <Select
              name="ice"
              value={selectedIce}
              onChange={handleSelectChange}
              label="Ice"
            >
              <MenuItem value="">Not Defined</MenuItem>
              {["Cubed", "Crushed", "Block", "Shaved", "Straight"].map(
                (opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>
      </Collapse>
    </Box>
  );
}
