import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "./ui/button";
import {useNavigate, useSearchParams} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login, signup } from "@/db/apiAuth";
import { UrlState } from "@/context";
import { Input } from "./ui/input";
// import {UrlState} from "@/context";

const Signup = () => {
   const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatars: null
  });
 
  let [searchParams] = useSearchParams();
  let  longLink = searchParams.get("createNew");


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:files?files[0] : value,
    }));
  };
    const{data, error, loading, fn: fnSignup} = useFetch(signup, formData)
  //  const {fetchUser} = UrlState();

    useEffect(()=>{
if( error === null && data){
navigate(`/dashboard? ${longLink ? `createNew= ${longLink}` : ""}`)
// fetchUser();
}
    }, [error,loading])

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name : Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
        avatars: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false }); //validating our form
     await fnSignup();
      //validation logic
    } catch (e) {
      const newErrors = {};
      if(e?.inner){
        e?.inner?.forEach((err) => {
        //Yup returns all validation errors in a list called e.inner.
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({api: error.message});
    }}
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
       Create a new account if you haven't already
        </CardDescription>
         {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
          {errors.name && <Error message={errors.name} />}
        
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        
        <div className="space-y-1">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
  
        <div className="space-y-1">
          <input
            type="file"
            name="avatars"
            accept="image/&"
            onChange={handleInputChange}
          />
        </div>
          {errors.avatars && <Error message={errors.avatars} />}
        </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? (
           <BeatLoader size={10} color="#36d7b7" /> 
          ): (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
