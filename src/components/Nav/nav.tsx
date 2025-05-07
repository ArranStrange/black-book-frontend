import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Docs: file://./docs/Nav.NOTES.md#props
interface Props {
  onSelectLetter: (letter: string) => void;
}

export default function Nav({ onSelectLetter }: Props) {
  // Docs: file://./docs/Nav.NOTES.md#state
  const [selectedLetter, setSelectedLetter] = useState("");

  // Docs: file://./docs/Nav.NOTES.md#handleletterclickletter
  const handleLetterClick = (letter: string) => {
    onSelectLetter(letter);
    setSelectedLetter(letter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Docs: file://./docs/Nav.NOTES.md#useeffect-on-mount
  useEffect(() => {
    handleLetterClick("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50px",
        left: 0,
        height: "calc(100vh - 50px)",
        width: isMobile ? "auto" : 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        zIndex: 10,
        backgroundColor: "background.default",
        borderRight: `1px solid ${theme.palette.divider}`,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          mb: 2,
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        {selectedLetter || "ALL"}
      </Typography>

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
                minWidth: 36,
                height: 36,
                borderRadius: "50%",
                fontWeight: "bold",
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
  );
}
