import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import useThemeStyle from '@/myHooks/useThemeStyle';
import CompnayJobCard from '@/myComponents/compnayJobCard';

function Company(props) {
    const { user } = useSelector(state => state.user);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const { id } = useParams()

    const [badgColor, setBadgColor] = useState('');
    const [badgeText, setBadgeText] = useState('')
    const [myCompany, setMyCompany] = useState(false);
    const [companyJobsUrl, setCompanyJobsUrl] = useState('');
    const navigate = useNavigate();
    const themeStyle = useThemeStyle();
    const [approverdJobs, setApproverdJobs] = useState(false);

    const [company, loading, error] = useFetchDataDetail(`companies/${id}`);
    const [companyJobs, jobsLoading, jobsError] = useFetchDataDetail(companyJobsUrl)


    useEffect(() => {
        if (!loading) {
            if (company.verifiedCompany == 'approved') setBadgColor('bg-green-200 text-green-700')
            if (company.verifiedCompany == 'rejected') setBadgColor('bg-red-200 text-red-600')
            if (company.verifiedCompany == 'pending') setBadgColor('bg-yellow-200 text-yellow-700')
        }
        if (company) setCompanyJobsUrl(`jobs?company=${company._id}&verifiedJob=approved`)

        if(companyJobs) {
            setApproverdJobs(companyJobs.some(job => job.verifiedJob === 'approved'))
            console.log(approverdJobs)
        }
    }, [company, loading, companyJobs, jobsLoading]);

    useEffect(() => {
        company && setMyCompany(employerCompanies.some(item => item._id === company._id));
        company && setBadgeText(company.verifiedCompany)
    }, [employerCompanies, company])

    const companyVerification = async (verification) => {
        console.log(verification);
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/companies/${company._id}`;
            const response = await axios.patch(url, { verifiedCompany: verification === 'approve' ? 'approved' : 'rejected' }, { withCredentials: true });
            console.log("Company updated:", response);
            toast({
                description: `${response?.data?.data?.name} has ${verification === 'approve' ? 'approved' : 'rejected'} to publish`,
                style: { backgroundColor: '#90ee90', color: 'black' },
            });
            verification === 'approve' ? setBadgColor('bg-green-200 text-green-700') : setBadgColor('bg-red-200 text-red-600');
            verification === 'approve' ? setBadgeText('approved') : setBadgeText('rejected');
        } catch (error) {
            console.error(`Error ${verification === 'approve' ? 'approving' : 'rejecting'} company:`, error);
            toast({
                description: `Unable to ${verification === 'approve' ? 'approved' : 'rejected'}, please try again in a while`,
                style: { backgroundColor: '#ff5151', color: 'black' },
            });
        }
    }

    return (
        <div className="flex flex-col w-full h-full p-6">
            {loading !== false ?
                <div className="flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12">
                    <SkeletonCard />
                </div>
                :
                <div className=''>
                    <h1 className="text-2xl font-semibold text-center mb-6">{company.name}</h1>
                    <div className={`relative flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12 ${themeStyle}`}>
                        {user.userType === 'admin' && <span className={`absolute top-4 right-0 ${badgColor} text-xs font-semibold px-5 py-2 rounded-l`}>
                            {badgeText}
                        </span>}
                        {user.userType === 'employer' && myCompany && <span className={`absolute top-2 right-0 bg-gray-700 text-white text-xs font-semibold px-5 py-2 rounded-l`}>
                            {'Your Job'}
                        </span>}
                        <div className="flex flex-col items-center w-1/2">
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-52 h-52 rounded-full object-cover"
                            />
                            <h2 className="text-xl pt-3 font-medium mb-4">{company.name}</h2>
                            <p className="text-lg font-semibold text-gray-500">{company.industry}</p>
                            <p className="text-lg font-semibold text-gray-500">{company.location}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <div className="flex flex-col items-center text-center md:text-left  w-full border p-4 rounded-sm ">
                                <p className="text-lg font-semibold text-gray-500 pb-2 ">{company.description}</p>
                                <p className="text-lg font-semibold text-gray-500 underline self-start">{company.website}</p>
                                {
                                    user.userType === "employer" && myCompany && <Link to={`/employer/edit_company/${company._id}`} className='mt-4 self-start bg-blue-600 border mt-2 px-7 py-1 rounded' >edit</Link>
                                }
                            </div>
                            {user.userType === 'admin' &&
                                <div className='flex flex-row gap-3'>
                                    <button onClick={() => companyVerification("approve")} className="bg-green-200 w-20  hover:shadow-md rounded-l-full text-green-800 focus:shadow-inner border border-r-4 border-gray-800">approved</button>
                                    <button onClick={() => companyVerification("regect")} className="bg-red-200 w-20 hover:shadow-md rounded-r-full text-red-600 focus:shadow-inner border border-l-4 border-gray-800">regected</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            <div>
                <hr className={`my-5 ${themeStyle}`} />
                <h3 className='text-xl font-bold p-3 px-5 pb-8'>Company's listed Jobs</h3>
                <div className='flex flex-row justify-center items-center'>
                    <div className={`grid ${approverdJobs ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} grid-cols-1 gap-6 justify-items-center`}>
                        {companyJobs && companyJobs.some(job => job?.company?._id === company?._id) ?
                            companyJobs.map(job => job?.company?._id === company?._id && <CompnayJobCard key={job._id} job={job} />)
                            :
                            <div className="">
                                <p>not any approved jobs</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Company;