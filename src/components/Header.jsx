import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/context'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'
import useFetch from '@/hooks/use-fetch'


const Header = () => {
  const navigate =  useNavigate();
  
  const {user, fetchUser} = UrlState()
  const {loading, fn: fnLogout} = useFetch(logout)
// console.log(user?.user_metadata)

  return (
    <>
   <nav className='py-4 px-8 flex justify-between items-center'>
<Link to ="/">
<img src="/logo.png" alt="strim logo" className='h-16 '/>
</Link>

<div className='flex gap-4'>
   { !user? (
    <Button onClick={()=> navigate("/auth")}>Login</Button>
  ) : (
    <DropdownMenu>
  <DropdownMenuTrigger className ="w-8 rounded-full overflow-hidden">
    <Avatar>
  <AvatarImage src={user?.user_metadata?.avatars} className="object-contain"/>
  <AvatarFallback>SK</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
       <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
      </DropdownMenuItem>
    <DropdownMenuItem
    onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
                  className="text-red-400"
    >
        <LogOut className='mr-2 h-4 w-4'/>
       <span>
        Logout
       </span>
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
   )} 
</div>
   </nav>
{loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
  </>
  )
}

export default Header
