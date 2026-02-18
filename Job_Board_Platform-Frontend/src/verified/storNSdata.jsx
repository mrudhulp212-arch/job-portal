import { useFetchList } from '@/myHooks/fetchList';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import { setEmployerCompanies } from '@/redux/slices/employer/companiesSlice';
import { setEmployerJobs } from '@/redux/slices/employer/jobsSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function StorNSdata(props) {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(state => state.user);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);

    const bringNessessity = async () => {
        if (user?.userType === 'employee') {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/saveJob`, { withCredentials: true })
                .then(response => {
                    // console.log(response)
                    dispatch(setEmployeeSavedJobs(response?.data?.data));
                })
                .catch(error => {
                    console.log(error);
                })
        }
        if (user?.userType === 'employer') {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs?jobCreatedBy=${user.id}`, { withCredentials: true })
                .then(response => {
                    // console.log(response)
                    dispatch(setEmployerJobs(response?.data?.data))
                })
                .catch(error => {
                    console.log(error);
                })
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/companies?createdBy=${user.id}`, { withCredentials: true })
                .then(response => {
                    // console.log(response)
                    dispatch(setEmployerCompanies(response?.data?.data))
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    useEffect(() => {
        bringNessessity();
    }, [user]);
    return (
        <div className='pt-20'>

        </div>
    );
}

export default StorNSdata;