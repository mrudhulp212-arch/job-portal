import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from 'react-router-dom';


function CompanyJobAddDropdown(props) {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className='text-2xl font-semibold px-3 rounded-full hover:bg-gray-100'><i className="ri-menu-add-line"></i></DropdownMenuTrigger>
            <DropdownMenuContent className="!bg-white !text-black !border-gray-300 !shadow-lg rounded-md">
                <DropdownMenuItem><Link to={'/employer/new_job_create'}>add job</Link></DropdownMenuItem>
                <DropdownMenuSeparator className="!bg-gray-300 !m-2" />
                <DropdownMenuItem><Link to={'/employer/company_create'}>add compnay</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export default CompanyJobAddDropdown;