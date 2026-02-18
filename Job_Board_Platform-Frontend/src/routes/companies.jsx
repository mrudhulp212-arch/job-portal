import React, { useEffect, useState } from 'react';
import CompanyCard from '@/myComponents/CompanyCard';
import { useFetchList } from '@/myHooks/fetchList';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useSelector } from 'react-redux';
import SearchBar from '@/myComponents/searchBar';

function Companies(props) {

    const { user, isLoggedIn } = useSelector(state => state.user);
    const myUserType = user.userType;
    const [urlParam, setUrlParam] = useState('')

    const bringData = async (companiesVerificaion) => {
        if (companiesVerificaion === 'approved') {
            setUrlParam("?verifiedCompany=approved");
        } else if (companiesVerificaion === 'pending') {
            setUrlParam("?verifiedCompany=pending");
        } else if (companiesVerificaion === 'rejected') {
            setUrlParam("?verifiedCompany=rejected");
        } else {
            setUrlParam("");
        }
    }


    const finalUrl = `${user.userType === 'admin' ? urlParam : `?verifiedCompany=approved${urlParam ? `&${urlParam.slice(1)}` : ''}`}`
    const [companies, loading, error] = useFetchList(`companies${finalUrl}`);


    useEffect(() => {
        console.log("urlParam: ", urlParam)
    }, [urlParam]);
    return (
        <div className="flex flex-col w-full h-full p-6">
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold p-3 sm:p-0">Listed Companies</h1>
                    <div>
                        <SearchBar field='Company' setUrlParam={setUrlParam} />
                    </div>
                </div>
                {myUserType === 'admin' && <div className='flex flex-row justify-center md:justify-end py-5'>
                    <button onClick={() => bringData("all")} className="bg-gray-200 w-20 hover:shadow-md rounded-l text-black">all</button>
                    <button onClick={() => bringData("approved")} className="bg-green-200 w-20 hover:shadow-md text-green-700">approved</button>
                    <button onClick={() => bringData("pending")} className="bg-yellow-200 w-20 hover:shadow-md text-yellow-600">pending</button>
                    <button onClick={() => bringData("rejected")} className="bg-red-200 w-20 hover:shadow-md rounded-r text-red-600">regected</button>
                </div>}
            </div>
            {loading === true ?
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))}
                </div>
                :
                <div>
                    {error === 'Jobs not found' ?
                        <div className='flex flex-col sm:flex-row justify-center items-center p-4'> not any companies </div>
                        :
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {companies.map((company, index) => (
                                <CompanyCard key={index} company={company} />
                            ))}
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Companies;