import useThemeStyle from '@/myHooks/useThemeStyle';
import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeCard({employee}) {
    const themeStyle = useThemeStyle();
    return (
        <div className={`border p-4 rounded-lg shadow-sm ${themeStyle}`}>
            <Link to={`/employer/employees/${employee._id}`}>
                <div className="flex flex-col items-center">
                    <img
                        src={employee.profileImage}
                        alt={employee.name}
                        className="w-28 h-28 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-lg font-medium">{employee.name}</h2>
                    <p className="text-md font-semibold text-gray-500">{employee.profession}</p>
                    <p className="text-md font-semibold text-gray-500">{employee.experienced} year experience</p>
                </div>
            </Link>
        </div>
    );
}

export default EmployeeCard;