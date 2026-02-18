import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchList } from '@/myHooks/fetchList';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { TooltipDemo } from '@/myComponents/HoverToolTip';
import useThemeStyle from '@/myHooks/useThemeStyle';
import EmployerCompanyCard from '@/myComponents/employerCompnayCard';

function MyCompanies(props) {
    const { user, isLoaggedIn } = useSelector(state => state.user)
    const themeStyle = useThemeStyle()
    const [companies, loading, error] = useFetchList(`companies?createdBy=${user.id}`)

    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h1 className='font-bold text-2xl  p-3 sm:p-0'>Yours Listed Companies</h1>
                </div>
                <div className='flex flex-row justify-center items-center gap-3'>
                    <div className={`flex justify-center items-center ${themeStyle}`}>
                        <TooltipDemo add={'company'} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ?
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))
                    :
                    companies.map((company, index) => (
                        <EmployerCompanyCard company={company} key={company._id} />
                    ))
                }
            </div>
        </div>
    );
}

export default MyCompanies;