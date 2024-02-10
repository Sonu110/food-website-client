import { useEffect, useState } from "react";
import { createContext } from "react";
import Appconfig from "../Config";

const Mycontext = createContext();

const MyProvider = ({ children }) => {
  const [name, setname] = useState("");
  const [ isuser ,setisuser] = useState(false)
  const [userdata, setuserdata] = useState({});
  const [pasword, setpassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [auth, setauth] = useState(true);
  const [restorents ,setrestorents ] =([])
  const [users, setUsers] = useState([]);
  const [islogin , setlogin] = useState(false)

  useEffect(() => {
    const checkProfile = async () => {
      const token = localStorage.getItem('token');
      console.log("the value of ", token);
  
      if (token) {
        try {
          const response = await fetch(`${Appconfig}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
         
  
          if (response.ok) {
            const data = await response.json();
            setlogin(true);
            setisuser(data.data.isAdmin);
            setuserdata(data);
          } else {
            localStorage.removeItem('token');
            setlogin(false);
            setisuser(false);
            setuserdata({});
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setlogin(false);
          setisuser(false);
          setuserdata({});
        } finally {
          setLoading(false); // Set loading to false after fetching user data
        }
      } else {
        setLoading(false); // Set loading to false if there is no token
      }
    };
  
    checkProfile();
  }, [islogin, isuser]);
  

  

const cartdata = JSON.parse (localStorage.getItem("cart"))||[]
const cartprotextion = localStorage.getItem('users')
  const [cart, setcart] = useState(cartdata); 

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...cart]));
    localStorage.setItem('users', auth);
  }, [cart,auth]);

  






  const remove = (productId) => {
    const updatedCart = cart.filter((item) => item[0] !== productId);
 
    setcart(updatedCart);
  };

  return (
    <Mycontext.Provider
      value={{ cart, setcart, remove, name, setname, pasword, setpassword, userdata, auth ,islogin ,users ,setauth,setrestorents,restorents ,setlogin}}
    >
       {!loading && children}
    </Mycontext.Provider>
  );
};

export { Mycontext, MyProvider };
