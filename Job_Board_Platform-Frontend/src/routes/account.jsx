import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import useThemeStyle from '@/myHooks/useThemeStyle';
import axios from 'axios';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Account(props) {
    const navigate = useNavigate()
    const { user, isLoggedIn } = useSelector(state => state.user);
    const myUserType = user.userType

    const themeStyle = useThemeStyle();


    const [myAccountData, loading, error] = useFetchDataDetail(myUserType === 'employee' ? `users/${user.id}` : `employers/${user.id}`)

    const url = `${import.meta.env.VITE_API_BASE_URL}/user/auth/logout`;
    const handlLogout = async () => {
        await axios.get(url, { withCredentials: true })
            .then(response => {
                console.log(response);
                toast({
                    description: "Logout successful",
                    style: { backgroundColor: '#90ee90', color: 'black' },
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            })
            .catch(error => {
                console.log(error);
                toast({
                    description: "Logout faild",
                    style: { backgroundColor: '#ff5151', color: 'black' },
                });
            })
    }
    const handlEdit = () => navigate(`/${myUserType}/account_edit`)

    return (
        <div>
            <Toaster />
            <div className={`flex flex-col w-full h-full p-6`}>
                {/* Employee Information Heading */}
                <h1 className="text-2xl font-semibold text-center mb-6">Your Account Information</h1>

                {/* Employee Profile */}
                {loading ?
                    <div className={`flex flex-col md:flex-row items-center justify-center border p-6 rounded shadow-sm space-y-6 md:space-y-0 md:space-x-12  ${themeStyle}`}>
                        <SkeletonCard />
                    </div>
                    :
                    <div className={`flex flex-col md:flex-row items-center justify-center border p-6 rounded shadow-sm space-y-6 md:space-y-0 md:space-x-12  ${themeStyle}`}>
                        {/* Left side - Profile image, name, and contact info */}
                        <div className="flex flex-col items-center w-1/2 border-b md:border-b-0 md:border-r border-gray-400 py-5">
                            <img
                                src={myAccountData.profileImage}
                                alt={myAccountData.name}
                                className="w-52 h-52 rounded-full object-cover"
                            />
                            <h2 className="text-lg font-medium mb-4">{myAccountData.name}</h2>
                            <p className="text-sm font-semibold text-gray-500 tracking-wide">{myAccountData.email}</p>
                            <div className='flex flex-row justify-between gap-2 pt-3'>
                                {user.userType !== 'admin' && <button onClick={handlEdit} className=' px-7 border rounded-sm bg-blue-600 hover:bg-blend-lighten'>Edit</button>}
                                <button onClick={handlLogout} className=' px-5 border rounded-sm bg-red-500 hover:bg-blend-lighten'>Logout</button>
                            </div>
                        </div>

                        {/* Right side - Role and description */}
                        <div className={`flex flex-col items-center text-center md:text-left  w-2/2 md:w-1/2  ${themeStyle}`}>
                            <h3 className="text-lg font-semibold mb-2">{myAccountData.profession}</h3>
                            <p className="text-sm font-semibold text-gray-500 tracking-wide">{myAccountData.bio}</p>
                        </div>
                    </div>
                }
                <hr className='mt-5 border' />
                {myUserType === 'employee' ?
                    <div>
                        <div className={`flex flex-row justify-center items-center p-3 border-2 mt-4 rounded ${themeStyle}`}>
                            <p className='underline'><Link to={`/employee/saved_jobs`}>see your saved jobs</Link></p>
                        </div>
                        <div className={`flex flex-row justify-center items-center p-3 border-2 mt-4 rounded ${themeStyle}`}>
                            <p className='underline'><Link to={`/employee/applied_jobs`}>see applied jobs</Link></p>
                        </div>
                    </div>
                    :
                    <div>
                        {myUserType === 'employer' ?
                            <div>
                                <div className={`flex flex-row justify-center items-center p-3 border-2 mt-4 rounded ${themeStyle}`}>
                                    <p className='underline'><Link to={`/employer/employer_jobs_listed`}>see jobs listed by you</Link></p>
                                </div>
                                <div className={`flex flex-row justify-center items-center p-3 border-2 mt-4 rounded ${themeStyle}`}>
                                    <p className='underline'><Link to={`/employer/my_companies`}>see your compnaies</Link></p>
                                </div>
                            </div>
                            : ""
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Account;