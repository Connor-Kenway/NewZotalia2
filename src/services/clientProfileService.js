import { api } from './index';


const jobSpecialties = {
    'Programming': 'Programming',
    'UI/UX': 'UI/UX',
    'Animation': 'Animation',
    'AI': 'AI',
}

export class GigWorkerProfile {
    constructor(user_id, work_preferences, 
        main_job_specialty, first_alternative_specialty,
        work_duration_singleDay, work_duration_shortTerm, work_duration_hourly, 
        job_is_remote, pay_rate_total, pay_rate_hourly) {
        //woker_id auto-generated by supabase
        this.created_at = new Date().toISOString();
        this.user_id = user_id;
        //dont' worry about this field
        this.specialties = 'UI/UX'
        //work preferences is a dict/json object like this:
        //{"preferences":{"fulltime":true,"part_time":false}}
        this.work_preferences = work_preferences
        this.main_job_specialty = main_job_specialty//jobSpecialties
        this.first_alternative_specialty = first_alternative_specialty//jobSpecialties
        //don't worry about this field
        this.secondary_job_specialty = 'UI/UX'
        this.work_duration_singleDay = work_duration_singleDay//true or false
        this.work_duration_shortTerm = work_duration_shortTerm//true or false
        this.work_duration_hourly = work_duration_hourly//true or false
        this.job_is_remote = job_is_remote//true or false
        this.pay_rate_total = pay_rate_total//int
        this.pay_rate_hourly = pay_rate_hourly//int
    }
}

export const gigWorkerProfileSetup = async (data) => {
    try {
        console.log(data);
        const gigWorkerProfile = new gigWorkerProfile(
            data.user_id,
            data.specialties,
            data.work_preferences,
            data.main_job_specialty,
            data.first_alternative_specialty,
            data.secondary_job_specialty,
            data.work_duration_singleDay,
            data.work_duration_shortTerm,
            data.work_duration_hourly,
            data.job_is_remote,
            data.pay_rate_total,
            data.pay_rate_hourly    
       
        );

        console.log('Gig Worker Profile:', gigWorkerProfile);

        const response = await api.post('/gig-workers/', gigWorkerProfile);
        console.log(response);
        console.log('after response');
        return response.data;
    } catch (error) {
        console.error('Failed to set up gig worker profile:', error);
        return { success: false, message: 'Failed to set up gig worker profile', error: error.message };
    }
}

//the code below is an example of the proper format: ign more the types
// const testGigWorker: Omit<Tables<'gig_worker'>, 'worker_id' | 'created_at'> = {
//     //gig_worker id auto generated by supabase
//     //created at auto generated by supabase
//     user_id:'9cfcd323-da6d-445b-ab70-fb7f47 e8bd43',
//     specialties: 'UI/UX',
//     work_preferences: {"preferences":{"fulltime":false,"part_time":true}},
//     rating: 0.00,
//     main_job_specialty: 'Programming',
//     first_alternative_specialty: 'AI',
//     secondary_job_specialty: 'AI',
//     work_duration_singleDay: false,
//     work_duration_hourly: false,
//     work_duration_shortTerm: true,
//     job_is_remote: true,
//     pay_rate_total: 45000,
//     pay_rate_hourly: 50

// };

//used to get the gig_worker profile that is display on the profile page
export const fetchGigWorkerProfile = async (gig_worker_id) => {
    try {
        const response = await api.get(`/gig-workers/${gig_worker_id}`);
        console.log('Fetched Gig Worker Profiles:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch gig worker profiles:', error);
        return { success: false, message: 'Failed to fetch gig worker profiles', error: error.message };
    }
};




