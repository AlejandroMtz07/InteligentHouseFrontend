import z from 'zod';
import style from './Register.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});
type User = z.infer<typeof UserSchema>;

export const Register = () => {

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const navigate = useNavigate();

  const onsubmit = (data: User) => {

    axios.post(
      `https://ih-backend.mnz.dom.my.id/users/register`,
      {
        email: data.email,
        password: data.password
      }
    ).then((response)=>{
      if(response.data.msg === "User registered"){
        navigate('/');
      }
    }).catch((error: any)=>{
      setError('email',{message: error.response?.data.msg},{shouldFocus: true});
    })
  }

  return (
    <div className={style.register_container}>
      <form className={style.register_form} onSubmit={handleSubmit(onsubmit)}>
        <div className={style.input_container}>
          <label htmlFor="email">Email</label>
          <input {...register('email', { required: true })} className={style.register_input} id="email" />
          {errors.email && <p className={style.register_error}>{errors.email.message}</p>}
        </div>
        <div className={style.input_container}>
          <label htmlFor="password">Password</label>
          <input {...register('password', { required: true })} className={style.register_input} id="password" />
          {errors.password && <p className={style.register_error}>{errors.password.message}</p>}
        </div>
        <button type='submit' className={style.register_button}>
          Register
        </button>
      </form>
    </div>
  )
}
