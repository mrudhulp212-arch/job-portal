import useThemeStyle from '@/myHooks/useThemeStyle';
import React from 'react';
import { Link } from 'react-router-dom';

function ApplicationCard({application}) {
    const themeStyle = useThemeStyle();
    return (
        <div key={application._id} className={`p-5 border m-1 rounded-sm w-[11.5rem] sm:w-[13rem] ${themeStyle}`}>
            <h2 className="text-lg font-medium ">{application?.userId.name}</h2>
            <p className="text-sm text-gray-600">{application.userId.profession}</p>
            <p className="text-sm text-gray-600">experience: {application.userId.experienced}</p>
            <a
                href={application.resume}
                target="_blank"
                rel="noopener noreferrer" // For security purposes
                className="bg-blue-600 text-white text-xs px-1 rounded-full hover:bg-blue-700 block text-center mt-3"
            > View Resume </a>
            <Link to={`/employer/employees/${application.userId._id}`} className='cursor-pointer text-xs text-blue-600 underline mt-3 block'>see the candidate</Link>
        </div>
    );
}

export default ApplicationCard;