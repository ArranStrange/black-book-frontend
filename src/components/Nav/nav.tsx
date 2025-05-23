import { useEffect, useState } from "react";
import { Box, Button, Stack, useTheme, useMediaQuery } from "@mui/material";

//file://./docs/Nav.NOTES.md
interface Props {
  onSelectLetter: (letter: string) => void;
}

export default function Nav({ onSelectLetter }: Props) {
  const [selectedLetter, setSelectedLetter] = useState("");

  const handleLetterClick = (letter: string) => {
    onSelectLetter(letter);
    setSelectedLetter(letter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleLetterClick("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFilter = () => {
    handleLetterClick("");
  };

  useEffect(() => {
    clearFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "10px",
          left: 0,
          height: "calc(100vh - 50px)",
          width: isMobile ? "auto" : 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
          zIndex: 10,
          borderRight: `1px solid ${theme.palette.divider}`,
          overflowY: "auto",
        }}
      >
        <Stack spacing={1}>
          {Array.from({ length: 26 }, (_, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selectedLetter === letter;

            return (
              <Button
                key={letter}
                data-testid="letters"
                variant={isSelected ? "contained" : "outlined"}
                size="small"
                onClick={() => handleLetterClick(letter)}
                sx={{
                  minWidth: 30,
                  height: 30,
                  borderRadius: "50%",

                  padding: 0,
                  color: isSelected ? "background.default" : "text.primary",
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "background.default",
                  },
                }}
              >
                {letter}
              </Button>
            );
          })}
        </Stack>
      </Box>
      <Button
        onClick={clearFilter}
        variant="text"
        size="small"
        sx={{
          position: "fixed",
          bottom: 5,
          left: 0,
          mt: 2,
          fontSize: "0.75rem",
          color: theme.palette.secondary.main,
        }}
      >
        Clear
      </Button>
    </>
  );
}
