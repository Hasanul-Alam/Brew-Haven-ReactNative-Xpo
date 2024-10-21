import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";

const useAsyncStorage = (
  key: string,
  expiryDuration = 7 * 24 * 60 * 60 * 1000
) => {
  // States Here
  const [storedData, setStoredData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Save data in the storage.
  const saveData = async (value: any) => {
    try {
      const now = new Date().getTime();
      const item = {
        value,
        expiry: now + expiryDuration,
      };
      await AsyncStorage.setItem(key, JSON.stringify(item));
      setStoredData(value);
    } catch (error) {
      setError("Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  // Load data from storage
  const loadData = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const parsedData = JSON.parse(item);
        const now = new Date().getTime();

        // Check if the data expired or not
        if (now > parsedData.expiry) {
          await AsyncStorage.removeItem(key);
          return null;
          // setStoredData(null);
        } else {
          // setStoredData(parsedData.value);
          return parsedData.value;
        }
      } else {
        return null;
        // setStoredData(null);
      }
    } catch (error) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
    // clearStorage();
  };

  // Function to clear all AsyncStorage data
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Storage Cleared', 'All data has been cleared from AsyncStorage.');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  return {
    saveData,
    loadData,
    clearStorage,
    loading,
    error,
    storedData,
  };
};

export default useAsyncStorage;
