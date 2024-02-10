
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import  HomeContainer  from './pages/Home/HomeContainer';

import Details from './pages/Productdetails/Details';
import { CartTwo } from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Protexted from './pages/Protextedrouter/Protexted';
import { Mycontext } from './Context/Context';
import { useContext } from 'react';
import { SignUpThree } from './pages/Login/Signup';

import Menuhomepage from './pages/Menupages/Menuhomepage';
import DashbordHome from './Dashbord/Pages/Home/DashbordHome';

import Dashbordcardhomepage from './Dashbord/Pages/Home/Dashbordcardhomepage';
import Menulist from './Dashbord/Pages/Menus/Menulist';
import Userlist from './Dashbord/Pages/Users/Userlist';
import Massage from './Dashbord/components/Massage';
import Layout from './pages/Layout/Layout';
import Orderslists from './Dashbord/Pages/Orders/Orderslist';
import OrderForm from './Dashbord/Pages/Menus/Menufrom';





function App() {
  
const {islogin}= useContext(Mycontext)
  
  const route  = createBrowserRouter(createRoutesFromElements(
    <>
     <Route path='/' element={<Layout></Layout>}>
   
    <Route  path='' element={<HomeContainer></HomeContainer>}>  </Route>

    <Route path='/menu' element={<Menuhomepage></Menuhomepage>}></Route>



    <Route path='/details/:name/:id' element={<Details></Details>}></Route>

        <Route path='/cart' element={<Protexted user={islogin}></Protexted>}>
          <Route path='' element={<CartTwo></CartTwo>}></Route>
        </Route>
    <Route path='/signup' element={<SignUpThree></SignUpThree>}></Route>
    <Route path='/login' element ={<Login></Login>}></Route>
   
   </Route>
    <Route path='/dashbord' element={<Protexted user={islogin}></Protexted>}>
    <Route path='' element={<DashbordHome />}>
    <Route index element={<Dashbordcardhomepage/>}></Route>


    <Route path='menu' element={<Menulist />} />
    <Route path='newmenu' element={<OrderForm />} />
    <Route path='order' element={<Orderslists></Orderslists>} />
    
    <Route path='users' element={<Userlist />} />
    <Route path='logout' element={<Massage />} />
  </Route>
</Route>




<Route path='*' element={<><div>error</div></>}></Route>

    
    </>





  )) 


  

  return (
<RouterProvider router={route}></RouterProvider>
  );
}

export default App;
