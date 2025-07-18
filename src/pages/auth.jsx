import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Login from "@/components/login";
import Signup from "@/components/signup";
import { UrlState } from "@/context";
import { useEffect } from "react";
const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew")
  const navigate = useNavigate();
 const {isAuthenticated, loading} =UrlState()

 useEffect(()=> {
  if(isAuthenticated && !loading ){
    navigate(`/dashboard? ${longLink ? `createNew= ${longLink}` : ""}`)}
  }, [isAuthenticated, loading])
  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
       
        {longLink? "Hold up! Let's login first.."
          : "Login / Signup"} 
        </h1>
        <Tabs defaultValue="Login" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="Login">Login</TabsTrigger>
    <TabsTrigger value="Signup">Signup</TabsTrigger>
  </TabsList>
  <TabsContent value="Login">
    <Login />
    </TabsContent>
  <TabsContent value="Signup">
    <Signup />
    </TabsContent>
</Tabs>
    </div>
  )
}

export default Auth
