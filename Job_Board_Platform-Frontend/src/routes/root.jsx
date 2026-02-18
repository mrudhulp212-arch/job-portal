import { Outlet, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '@/myComponents/Header';
import Footer from '@/myComponents/Footer';
import axios from 'axios';
import { authenticatUser } from '@/redux/slices/userSlice';
import StorNSdata from '@/verified/storNSdata';

export async function loader() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/user/auth/verify`;
    let login = false;
    let userData = {};
    await axios.get(url, { withCredentials: true })
        .then(response => {
            userData = response?.data?.data || {}
            login = true;
        })
        .catch(error => console.log("error:", error?.response?.data?.message));
    return { userData, login };
}

function Root(props) {
    const loaderData = useLoaderData();
    const userData = loaderData?.userData || {};
    const login = loaderData?.login || false;

    const dispatch = useDispatch();

    if (login) dispatch(authenticatUser(userData))


    return (
        <div>
            <Header />
            <StorNSdata />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Root;
