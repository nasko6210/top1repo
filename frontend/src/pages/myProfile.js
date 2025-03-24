import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState } from "react";
export function MyProfile() {
  
  const { authState,setAuthState } = useContext(AuthContext);
  let navigate = useNavigate()
  function dropMenuFunction() {
    document.getElementById("myDropdown").classList.toggle('show');
  }
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].classList.contains('show')) {
          dropdowns[i].classList.remove('show')
        }
      }      
    }
  }
  return (
    <div className="dropdown">
      <button onClick={dropMenuFunction} className="dropbtn">Моят Профил</button>
      <div id="myDropdown" className="dropdown-content">
        {!authState.status ? (
        <>
          <a onClick={() => { navigate("/login") }}>Вход в TOP1</a>
          <a onClick={() => { navigate("/register") }}>Нова регистрация</a>
        </>
        ) : (<button style={{cursor:"pointer"}} onClick={()=>{localStorage.clear(); 
            setAuthState({email:"",id:0,status:false}); 
            navigate("/")
       }}>Logout</button>)
      }
      </div>
    </div>
  )
}