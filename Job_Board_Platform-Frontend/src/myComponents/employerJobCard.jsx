import useThemeStyle from '@/myHooks/useThemeStyle';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EmployerJobCard({ job }) {
    const [badgColor, setBadgColor] = useState('');
    const themeStyle = useThemeStyle();

    useEffect(() => {
        if (job.verifiedJob === 'approved') setBadgColor('bg-green-200 text-green-700');
        else if (job.verifiedJob === 'rejected') setBadgColor('bg-red-200 text-red-600');
        else if (job.verifiedJob === 'pending') setBadgColor('bg-yellow-200 text-yellow-700');
    }, [job]);

    return (
        <div className={` relative py-4 sm:px-5 px-10 w-[21rem] sm:w-1/2 rounded-md ease-in-out duration-300 hover:shadow-md ${themeStyle}`}>

            <span className={`absolute top-3 right-0 ${badgColor} text-xs font-semibold px-2 py-1 rounded-l`}>
                {job.verifiedJob}
            </span>


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

export default EmployerJobCard;
