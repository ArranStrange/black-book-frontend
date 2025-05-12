import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Slide, Container, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

// Theme and Components
import blackBookTheme from "./theme";
import AddDrinkForm from "./components/Drinks/AddDrink/AddDrinksForm";
import DrinksList from "./components/Drinks/DrinksList/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";
import MessageModal from "./components/message/MessageModal";
import UserMenu from "./components/Nav/UserMenu";

const App: React.FC = () => {
  // const theme = useTheme();

  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }>({});

  const [isAddDrinkFormVisible, setIsAddDrinkFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const isGuest = localStorage.getItem("authToken") === "guest";

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleRegisterSuccess = () => setIsAuthenticated(true);

  const handleSearch = (query: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }) => {
    setSearchQuery({
      drinkName: query.drinkName || "",
      category: query.category || "",
      glass: query.glass || "",
      ice: query.ice || "",
    });
  };

  const handleLetterSelection = (letter: string) => {
    setSelectedLetter(letter);
  };

  const onShowAll = () => {
    setSearchQuery({});
    setSelectedLetter("");
  };

  const toggleAddDrinkForm = () => {
    setIsAddDrinkFormVisible((prev) => !prev);
  };

  const handleAddDrinkToggle = () => {
    toggleAddDrinkForm();
    setIsFormVisible((prev) => !prev);
  };

  const handleCloseModal = () => {
    setModalMessage(null);
    setModalTitle(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  useEffect(() => {
    setModalMessage(
      "The backend of this app is hosted on a free server, please be patient it can be a little slow. Up to 30 seconds!"
    );
    setModalTitle("A Heads Up");
  }, []);

  return (
    <ThemeProvider theme={blackBookTheme}>
      <CssBaseline />

      {modalMessage && modalTitle && (
        <MessageModal
          message={modalMessage}
          title={modalTitle}
          onClose={handleCloseModal}
        />
      )}

      {isAuthenticated ? (
        <>
          <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
            <UserMenu onLogout={handleLogout} isGuest={isGuest} />
          </Box>

          {!isGuest && (
            <IconButton
              onClick={handleAddDrinkToggle}
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 1200,
                backgroundColor: "transparent",
                color: "primary.main",
                border: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "primary.light",
                },
                fontSize: 36,
              }}
            >
              <motion.div
                animate={{ rotate: isFormVisible ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <AddIcon fontSize="inherit" />
              </motion.div>
            </IconButton>
          )}

          <Slide in={isAddDrinkFormVisible} direction="left" unmountOnExit>
            <Box
              sx={{
                zIndex: 100,
                position: "absolute",
                p: 2,
                minWidth: "100vw",
                mx: "auto",
                top: 0,
                right: 0,
                borderRadius: 2,
                boxShadow: 4,
                backgroundColor: "#1b1c1e",
              }}
            >
              <AddDrinkForm toggleAddDrinkForm={toggleAddDrinkForm} />
            </Box>
          </Slide>

          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <DrinksList
              selectedLetter={selectedLetter}
              searchQuery={searchQuery}
            />
          </Container>

          <Search
            onSearch={handleSearch}
            toggleAddDrinkForm={toggleAddDrinkForm}
            onShowAll={onShowAll}
          />

          <Nav onSelectLetter={handleLetterSelection} />
        </>
      ) : isRegisterVisible ? (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          setIsLoginVisible={() => setIsRegisterVisible(false)}
          onGuestLogin={handleLoginSuccess}
        />
      ) : (
        <Login
          onLoginSuccess={handleLoginSuccess}
          setIsRegisterVisible={setIsRegisterVisible}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
