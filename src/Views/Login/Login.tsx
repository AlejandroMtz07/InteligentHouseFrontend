import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";
import style from './Login.module.css';
import { useNavigate } from "react-router-dom";

//Definition of the user schema
const UserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

//User type for get the data in the onSubmit function
type User = z.infer<typeof UserSchema>;

export default function Login() {

  const {register, handleSubmit, formState: {errors}, setError} = useForm({
    resolver: zodResolver(UserSchema)
  });
  const navigate = useNavigate();
  
  const onSubmit = (data:User)=>{

    const direction = '192.168.0.93:8080';

    axios.post(
      //If you want to use from the phone 192.168.0.93:5173 instead localhost
      `http://${direction}/users/login/`,
      {
        email: data.email,
        password: data.password
      },
    ).then((response)=>{
      if(response.data.msg === 'Login success'){
        localStorage.setItem('token',response.data['token']);
        localStorage.setItem('isLoged','true');
        navigate('/home');
      }
    }).catch((e:any)=>{
      setError('password',{message: e.response?.data.msg})
    })
  }
  const handleRegisterClick = ()=>{
    navigate('/register');
  }

  return (
    <div className={style.login_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.login_form}>
        <div className={style.input_container}>
          <label htmlFor="email">Email</label>
          <input {...register('email', {required: true})} className={style.login_input} id="email"/>
          {errors.email && <p className={style.login_error}>{errors.email.message}</p>}
        </div>
        <div className={style.input_container}>
          <label htmlFor="password">Password</label>
          <input {...register('password',{required: true})} className={style.login_input} id="password" type="password"/>
          {errors.password && <p className={style.login_error}>{errors.password.message}</p>}
        </div>
        <div className={style.register_link}>
          <a onClick={handleRegisterClick}>Dont have an account yet?</a>
        </div>
        <button type="submit" className={style.login_button}>
          Login
        </button>
      </form>
    </div>
  )
}
