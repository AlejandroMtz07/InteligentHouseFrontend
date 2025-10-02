import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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
    console.log(data);
  }

  return (
    <div>
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
