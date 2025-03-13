import { useState } from "react";
import { addDrink } from "../services/drinksServices";

export const useAddDrink = (toggleAddDrinkForm: () => void) => {
  const [formData, setFormData] = useState({
    idDrink: Date.now().toString(),
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

  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDrink(formData);
      setModalMessage("Drink added successfully!");
      setModalTitle("Success");
      setFormData((prevData) => ({
        ...prevData,
        idDrink: Date.now().toString(),
      }));
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to add drink.");
    }
  };

  const handleCloseModal = () => {
    setModalMessage(null);
    setModalTitle(null);
    if (modalTitle === "Success") {
      toggleAddDrinkForm();
    }
  };

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
