import axios from "axios";
import { API_URL } from "../utils/config";
import { Drink } from "../components/types/types";

// Fetch all drinks
export const fetchDrinks = async (): Promise<Drink[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/drinks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching drinks:", error);
    throw new Error("Failed to fetch drinks.");
  }
};

// Edit an existing drink
export const editDrink = async (updatedDrink: Drink) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/drinks/${updatedDrink._id}`,
      updatedDrink
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update drink.");
  }
};

// Delete a drink
export const deleteDrink = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/api/drinks/${id}`);
  } catch (error) {
    throw new Error("Failed to delete drink.");
  }
};

// Add Drink
export const addDrink = async (drinkData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/drinks`, drinkData);
    return response.data;
  } catch (error: any) {
    console.error("Error adding drink:", error);
    throw new Error("Failed to add drink.");
  }
};
