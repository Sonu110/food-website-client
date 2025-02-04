import { useContext, useState } from "react"
import { Mycontext } from "../../Context/Context";
import { Navigate, useNavigate } from "react-router-dom";
import Appconfig from "../../Config";

export default function Login() {


 const {setauth ,setlogin }= useContext(Mycontext);
 const [email, setEmail] = useState("");
 const [passwords, setPasswords] = useState("");
 const [message, setMessage] = useState('');
 const [Loading , setLoading] = useState(false)
const navigate = useNavigate()
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`${Appconfig}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        passwords,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.success) {
        localStorage.setItem('token', data.token);
        if (data.isAdmin) {
          alert('Welcome admin');
          setauth(true);
          setlogin(true)
         
          navigate('/dashbord')
        } else {
          alert("user is vaild")
          setauth(false);
          setlogin(true)
          navigate('/')
          setMessage(`Welcome ${data.data['Name']}! Successful login`);
        }
      } else {
        setMessage(`Login failed: ${data.message}`);
      }
    } else {
      setMessage(`Login failed: ${data.message || 'Something went wrong'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    setMessage('An error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};



    return (
      <>
      
        <div className="flex min-h-screen items-center justify-center flex-1 flex-col  px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="text"
              autoComplete="current-password"
              required
              value={passwords}
              onChange={(e) => setPasswords(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           {Loading ? "Login..........." : "Login"} 
          </button>
        </div>
      </form>
<span>{message}</span>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have account goto{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                /Signup 
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  