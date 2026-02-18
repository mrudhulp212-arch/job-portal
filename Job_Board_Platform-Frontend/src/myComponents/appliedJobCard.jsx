import useThemeStyle from '@/myHooks/useThemeStyle';
import { setEmployeeSavedJobs } from '@/redux/slices/employee/savedJobsSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function AppliedJobCard({ job }) {
    const { user } = useSelector(state => state.user);
    const { employeeSavedJobs } = useSelector(state => state.employeeSavedJobs);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const [badgColor, setBadgColor] = useState('');
    const [saveJobColor, setSaveJobColor] = useState('');
    const [myJob, setMyJob] = useState(false);
    const dispatch = useDispatch();

    const themeStyle = useThemeStyle();

    useEffect(() => {
        const isSaved = employeeSavedJobs.some(item => item.jobId._id === job._id);
        setSaveJobColor(isSaved ? 'text-red-500' : 'text-gray-400');
    }, [employeeSavedJobs, saveJobColor, job]);

    const manageJobSave = async () => {
        const data = { jobId: job._id, jobTitle: job.title };
        try {
            if (saveJobColor === 'text-gray-400') {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/saveJob`, data, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            } else {
                const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/saveJob/${job._id}`, { withCredentials: true });
                dispatch(setEmployeeSavedJobs(response?.data?.data));
            }
        } catch (error) {
            console.error("Error saving or deleting job:", error);
        }
    };

    return (
        <div className={` relative py-4 sm:px-5 px-10 w-[21rem] sm:w-1/2 rounded-md ease-in-out duration-300 hover:shadow-md ${themeStyle}`}>
            {user?.userType === 'employee' && (
                <span className={`absolute top-0 right-0 text-xs font-semibold px-2 py-1 rounded-l`}>
                    <i onClick={manageJobSave} className={`ri-heart-fill font-normal text-xl ${saveJobColor} cursor-pointer`}></i>
                </span>
            )}
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="pb-2">Location: {job.location}</p>
            <hr />
            <p>Requirement: {job.headline}</p>
            <p>Starts from: ₹{job.salary}</p>
            <p>{job.company.name}</p>
            <Link to={`/jobs/${job._id}`} className="text-blue-400 underline">See more</Link>
        </div>
    );
}

export default AppliedJobCard;