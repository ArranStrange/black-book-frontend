import { useState } from "react";
import { addDrink } from "../services/drinksServices";
import { useAppDispatch } from "../redux/hooks";
import {
  addDrink as addDrinkToStore,
  setDrinks,
} from "../redux/slices/drinksSlice";
import DrinksList from "../components/Drinks/DrinksList/DrinksList";

export const useAddDrink = (toggleAddDrinkForm: () => void) => {
  //initialises the formData state as an object, identical to the Drinks array
  const [formData, setFormData] = useState({
    idDrink: Date.now().toString(),
    //creates an ID of the date + the now() method and converts it to a string
    // all other fields begin empty
    drinkName: "",
    shortDescription: "",
    Category: "",
    Glass: "",
    Ice: "",
    Ingredient1: "",
    Ingredient2: "",
    Ingredient3: "",
    Ingredient4: "",
    Ingredient5: "",
    Ingredient6: "",
    Measure1: 0,
    Measure2: 0,
    Measure3: 0,
    Measure4: 0,
    Measure5: 0,
    Measure6: 0,
    DrinkThumb: "",
    Rating: 0,
    Instructions: "",
  });
  //
  //
  //
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  //
  const dispatch = useAppDispatch();
  //
  //
  const handleChange = (
    // e represents a change event from an input element
    e: React.ChangeEvent<
      //typescript requires the input types to be stated
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // deconstructing the event from the input element
    // takes the input elements name and the new value
    const { name, value } = e.target;
    // initialises setFormData, takes its previous state - ensuring the most recent state is used
    setFormData((prevData) => ({
      // creates a light copy and spreads the data
      ...prevData,
      //then sets the object field and its value
      [name]: value,
      //e.g. if name == "drinkName" and value == "Mojito", this will set the property "drinkName": "Mojito" in the new object.
    }));
  };
  //
  //
  //
  //when the form data is submitted

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createdDrink = await addDrink(formData);
      dispatch(addDrinkToStore(createdDrink));

      setModalMessage("Drink added successfully!");
      setModalTitle("Success");
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to add drink.");
    }
  };
  //
  //
  // handles a the close of the modal message
  const handleCloseModal = () => {
    setModalMessage(null);
    setModalTitle(null);
    // if modal title is === to success, will also close the add drink form
    if (modalTitle === "Success") {
      toggleAddDrinkForm();
    }
  };

  //returns the relevant state and functions to be used in addDrinkForm
  return {
    formData,
    setFormData,
    modalTitle,
    modalMessage,
    handleChange,
    handleSubmit,
    handleCloseModal,
  };
};
