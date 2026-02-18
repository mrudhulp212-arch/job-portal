import React from 'react';
import { Link } from 'react-router-dom';
import ThemeColor from './icon/ThemeColor';
import { useSelector } from 'react-redux';

function Header(props) {
    const { user, isLoggedIn } = useSelector(state => state.user);

    return (
        <div>
            <header className='bg-blue-400 text-white fixed w-full z-50 shadow-md hover:shadow-2xl ease-in-out duration-500'>
                <div className=' container mx-auto flex flex-row justify-between items-center py-5 px-5 sm:px-3'>
                    <div>
                        <h2 className='font-bold text-xl'><Link to={'/'}>Hired</Link></h2>
                    </div>
                    <div>
                        <ul className='flex flex-row justify-between items-center gap-3'>

                            {
                                isLoggedIn ? <li> <ThemeColor /> </li> : ""
                            }
                            <li><Link to={'/'}>jobs</Link></li>
                            {
                                isLoggedIn ? <li><Link to={`/${user?.userType}/companies`}>companies</Link></li> : <li><Link to={'/login'}>login</Link></li>
                            }
                            {
                                isLoggedIn ? <li>{user?.userType === 'employer' && <Link to={`/${user?.userType}/employees`}>employees</Link>}</li> : ""
                            }
                            {
                                isLoggedIn ? <li><Link to={`/${user?.userType}/account`}><div className='w-10 h-10 bg-white text-black rounded-full flex justify-center items-center'>{user?.name?.charAt(0).toUpperCase()}</div></Link></li> : ""
                            }
                            {
                                isLoggedIn ? "" : <li> <ThemeColor /> </li>
                            }
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;