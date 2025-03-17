import { api } from "./index";

const fiancial_base_route = '/financials'
const financial_monthly_route = '/monthly'

const base_financial_call = async (base_id, endpoint) => {
    try {
        const response = await api.get(`${fiancial_base_route}${endpoint}${base_id}`);
        console.log(`Fetched gig worker ${endpoint}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch gig worker ${endpoint}:`, error);
        return { success: false, message: `Failed to fetch gig worker ${endpoint}`, error: error.message };
    }
}
export const fetchMonthyIncome = async (gig_worker_id) => {
    return base_financial_call(gig_worker_id, financial_monthly_route);
}


