import { api } from './index';
import AsyncStorage from "@react-native-async-storage/async-storage";

//on setup the company rating and individal ratings are set to 0.
//when updating the ratings set the company rating to the users individual rating
// and the invidual rating to 1
export class EmployerProfile {
  constructor(user_id, company_name, company_description) {
    this.created_at = new Date().toISOString();
    this.user_id = user_id;
    this.company_name = company_name;
    this.company_description = company_description;
    this.company_rating = 0;
    this.individual_ratings = 0;
  }
}

export const employerProfileSetup = async (data) => {
  try {
    console.log(data);
    const employerProfile = new EmployerProfile(
      data.user_id,
      data.company_name,
      data.company_description
    );

    console.log('Employer Profile:', employerProfile);

    const response = await api.post('/employers/', employerProfile);
    console.log(response);
    console.log('after response');
    return response.data;
  } catch (error) {
    console.error('Failed to set up employer profile:', error);
    return { success: false, message: 'Failed to set up employer profile', error: error.message };
  }
};