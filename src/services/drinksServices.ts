import axios from "axios";
import { API_URL } from "../utils/config";
import { Drink } from "../components/types/types";
//
//
// Fetch all drinks
export const fetchDrinks = async (): Promise<Drink[]> => {
  try {
    //sends a GET request to the below API
    const response = await axios.get(`${API_URL}/api/drinks`);
    //returns a promise == the drinks array
    return response.data;
    //error handling
  } catch (error) {
    //logs and throws the error message
    console.error("Error fetching drinks:", error);
    throw new Error("Failed to fetch drinks.");
  }
};
//
//
// Edit an existing drink
export const editDrink = async (updatedDrink: Drink) => {
  try {
    //uses a PUT request to update drink
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
  //uses a DELETE request with the param of the drink id
  try {
    await axios.delete(`${API_URL}/api/drinks/${id}`);
    //error handling
  } catch (error) {
    throw new Error("Failed to delete drink.");
  }
};

// Add Drink
export const addDrink = async (formData: any) => {
  try {
    //uses a post request with the formData to the below URL
    const response = await axios.post(`${API_URL}/api/drinks`, formData);
    // returns the backend response
    return response.data;
    //catches any errors
  } catch (error: any) {
    console.error("Error adding drink:", error);
    throw new Error("Failed to add drink.");
  }
};
