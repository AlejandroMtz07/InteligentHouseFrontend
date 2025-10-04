import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";
import style from './Login.module.css';

//Definition of the user schema
const UserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

//User type for get the data in the onSubmit function
type User = z.infer<typeof UserSchema>;

export default function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(UserSchema)
  });
  
  const onSubmit = (data:User)=>{
    axios.post(
      'http://localhost:8080/users/login/',
      {
        email: data.email,
        password: data.password
      },
    ).then((response)=>{
      console.log(response.data['token']);
      localStorage.setItem('token',response.data['token']);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className={style.login_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', {required: true})}/><br/>
        {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
        <input {...register('password',{required: true})}/><br/>
        {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
