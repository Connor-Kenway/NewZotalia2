import { useState, useEffect } from 'react';
import { fetchMonthyIncome, fetchCurrentGig } from '../../../../src/services/financeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFinanceData = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [currentGig, setCurrentGig] = useState(null);

  useEffect(() => {
    const loadIncome = async () => {
      try {
        //need to pull user id
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetchMonthyIncome(token);
        if (response.success) {
          setMonthlyIncome(response.income);
        }
      } catch (error) {
        console.error('Failed to load monthly income:', error);
      }
    };

    loadIncome();
  }, []);

  useEffect(() => {
    const loadCurrentGig = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetchCurrentGig(token);
        if (response.success) {
          setCurrentGig(response.gig);
        }
      } catch (error) {
        console.error('Failed to load current gig:', error);
      }
    };

    loadCurrentGig();
  }, []);

  return { monthlyIncome, currentGig };
};