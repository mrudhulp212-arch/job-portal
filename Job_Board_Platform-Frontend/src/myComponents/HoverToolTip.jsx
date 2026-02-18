import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"

export function TooltipDemo({ add }) {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link
                     to={`/employer/${add === 'job' ? 'new_job_create' : 'company_create'}`}
                     className="py-1 px-2 border-2 rounded focus:shadow-xl"
                    >
                        <i className="ri-menu-add-line"></i>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {
                        add === 'job' ? <p>creat job</p> : <p>creat company</p>
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
