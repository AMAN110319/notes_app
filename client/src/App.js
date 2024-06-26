import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Notes from './components/Notes';
function App() {
  const [isLogin,setIsLogin]=useState(false);
  useEffect(()=>{
    const checkLogin = async ()=>{
      // logic for maintaining the token and expiry session kind of thing
      const token =localStorage.getItem('Token');
      if(token){
        const verified = await axios.get('/users/verify',{
          headers : {Authorization :token}
        })
        // console.log(verified)
        setIsLogin(verified.data);
        if(verified.data === false) return localStorage.clear();

      }
      else{
        setIsLogin(false);
      }
    }
    checkLogin();
  },[]);

  return (
    <div className="App">
      {
        isLogin ? <Notes setIsLogin={setIsLogin}/>:<Login setIsLogin={setIsLogin}/>
      }
      {/* <Signup></Signup> */}
    </div>
  );
}

export default App;
