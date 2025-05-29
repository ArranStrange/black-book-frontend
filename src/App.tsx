import React, { useEffect } from "react";
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

// Redux
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  setView,
  toggleAddDrinkForm,
  toggleFormVisible,
  setModal,
  clearModal,
  setSearchQuery,
  setSelectedLetter,
  clearFilters,
} from "./redux/slices/uiSlice";
import { useDrinks } from "./hooks/useDrinks";
import { syncAuthState } from "./redux/thunks/authThunks";
import theme from "./theme";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    view,
    isAddDrinkFormVisible,
    isFormVisible,
    modalMessage,
    modalTitle,
    searchQuery,
    selectedLetter,
  } = useAppSelector((state) => state.ui);

  const isGuest = useAppSelector((state) => state.auth.isGuest);
  useEffect(() => {
    dispatch(syncAuthState());
  }, [dispatch]);

  useDrinks();

  const handleSearch = (query: typeof searchQuery) => {
    dispatch(
      setSearchQuery({
        drinkName: query.drinkName || "",
        category: query.category || "",
        glass: query.glass || "",
        ice: query.ice || "",
      })
    );
  };

  const handleLetterSelection = (letter: string) => {
    dispatch(setSelectedLetter(letter));
  };

  const onShowAll = () => dispatch(clearFilters());

  const handleAddDrinkToggle = () => {
    dispatch(toggleAddDrinkForm());
    dispatch(toggleFormVisible());
  };

  const handleCloseModal = () => dispatch(clearModal());

  const handleLoginSuccess = () => {
    dispatch(syncAuthState());
    dispatch(setView("app"));
  };
  const handleRegisterSuccess = () => dispatch(setView("app"));

  useEffect(() => {
    dispatch(
      setModal({
        message:
          "The backend of this app is hosted on a free server, please be patient it can be a little slow. Up to 30 seconds!",
        title: "A Heads Up",
      })
    );
  }, [dispatch]);

  console.log("Current view:", view);

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

      {view === "app" ? (
        <>
          <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
            <UserMenu />
          </Box>

          {!isGuest && (
            <IconButton
              onClick={handleAddDrinkToggle}
              sx={{
                position: "fixed",
                bottom: 32,
                right: 21,
                zIndex: 1200,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.primary.main,
                border: "none",
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "primary.light",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                fontSize: 36,
              }}
            >
              <motion.div
                animate={{ rotate: isFormVisible ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
              <AddDrinkForm
                toggleAddDrinkForm={() => dispatch(toggleAddDrinkForm())}
              />
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
            toggleAddDrinkForm={handleAddDrinkToggle}
            onShowAll={onShowAll}
          />

          <Nav onSelectLetter={handleLetterSelection} />
        </>
      ) : view === "register" ? (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          setIsLoginVisible={() => dispatch(setView("login"))}
          onGuestLogin={handleLoginSuccess}
        />
      ) : view === "login" || view === "guest" ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          setIsRegisterVisible={() => dispatch(setView("register"))}
        />
      ) : null}
    </ThemeProvider>
  );
};

export default App;
