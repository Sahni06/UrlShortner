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
import { login } from "@/db/apiAuth";
import { UrlState } from "@/context";
// import {UrlState} from "@/context";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let  longLink = searchParams.get("createNew");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
    const{data, error, loading, fn: fnLogin} = useFetch(login, formData)
   const {fetchUser} = UrlState();
    useEffect(()=>{
if( error === null && data){
navigate(`/dashboard? ${longLink ? `createNew= ${longLink}` : ""}`)
fetchUser();
}
    }, [data,error])
  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });
      await schema.validate(formData, { abortEarly: false }); //validating our form
     await fnLogin();
      //validation logic
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        //Yup returns all validation errors in a list called e.inner.
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already ghave one
        </CardDescription>
         {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <input
            type="email"
            name="email"
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
