import useThemeStyle from '@/myHooks/useThemeStyle';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const [badgColor, setBadgColor] = useState('');
    const [myCompany, setMyCompany] = useState(false);

    const themeStyle = useThemeStyle();

    useEffect(() => {
        if (company.verifiedCompany == 'approved') setBadgColor('bg-green-200 text-green-700')
        if (company.verifiedCompany == 'rejected') setBadgColor('bg-red-200 text-red-600')
        if (company.verifiedCompany == 'pending') setBadgColor('bg-yellow-200 text-yellow-700')
    }, [company]);

    useEffect(() => {
        company && setMyCompany(employerCompanies.some(item => item._id === company._id))
    }, [employerCompanies])

    return (
        <div key={company._id} className={`relative border p-4 rounded-lg shadow-sm hover:shadow-md ${themeStyle}`}>
            {user.userType === 'admin' && <span className={`absolute top-3 right-0 ${badgColor} text-xs font-semibold px-2 py-1 rounded-l`}>
                {company.verifiedCompany}
            </span>}
            {user.userType === 'employer' && myCompany && (
                <span className={`absolute top-3 right-0 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded-l`}>
                    Your Job
                </span>
            )}
            <Link to={`/${user.userType}/companies/${company._id}`}>
                <div className="flex flex-col items-center">
                    <img
                        src={company.logo}
                        alt={company.name}
                        className="w-28 h-28 rounded-full mb-4 object-cover"
                    />
                    <h2 className="text-lg font-medium">{company.name}</h2>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                    <p className="text-sm text-gray-500">{company.location}</p>
                </div>
            </Link>
        </div>
    );
}

export default CompanyCard;