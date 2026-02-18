import { Skeleton } from "@/components/ui/skeleton" 
import { useTheme } from "next-themes"

export function SkeletonCard() {
  
  const {theme} = useTheme()

  const skeletonColor = theme === 'light' ? '!bg-gray-300':'!bg-gray-800'
  return (
    <div className="flex flex-col space-y-3 ">
      <Skeleton className={`h-[125px] w-[250px] rounded-xl  ${skeletonColor}`} />
      <div className="space-y-2">
        <Skeleton className={`h-4 w-[250px] ${skeletonColor}`} />
        <Skeleton className={`h-4 w-[200px] ${skeletonColor}`}/>
      </div>
    </div>
  )
}
