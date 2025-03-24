import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../constant-data/env";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../components/Carousel";

export function SinglePost() {
        const [slides,setSlides]=useState([{}])
       
            const navigate = useNavigate();
            let id = 11;
        
            const [phoneNumber, setPhoneNumber] = useState(''),
                [salary, setSalary] = useState(''),
                [textDescription, setTextDescription] = useState(''),
                [title, setTitle] = useState(''),
                [username, setUsername] = useState('');
                
            const getPost = async ({ id }) => {
                axios.get(`${BASE_URL}/jobs/${id}`).then((response ) => {
                    

                  setSlides([{url: `/pictures/${response.data.image1}`},
                    {url: `/pictures/${response.data.image2}`},
                    {url: `/pictures/${response.data.image3}`},
                    {url: `/pictures/${response.data.image4}`},
                    {url: `/pictures/${response.data.image5}`}
                  ]);
                 console.log(slides[1].url,slides[0].url)
                setTextDescription(response.data.textDescription)
                    setSalary(response.data.salary)
                    setUsername(response.data.username)
                    setPhoneNumber(response.data.phoneNumber)
        
                })
               
            }
            const deletePostClicked = async ({ id }) => {
                    await axios.delete(`${BASE_URL}/upload/${id}`)
                    .then((response) => console.log(response));
                navigate('/')
            }
            return (
                <div style={{ background: "rgb(240, 240, 240)" }}>
                    <div style={{ display: "flex" }}>
                    <div style={{ width: "35%", padding: "5px" }} >{<Carousel slides={slides}/>}</div>
                        <div style={{ background: "rgb(222,222,222)", width: "60%", padding: '5px', borderRadius: "10px", marginTop: "5px" }}>
                            <div style={{ display: "flex", fontSize: "22px", padding: "10px" }} ><div style={{ fontWeight: "bold" }}>{title}</div></div>
                            <div style={{ display: "flex", fontStyle: "italic", padding: "10px" }}>Описание на длъжността:  <div style={{ fontWeight: "bold" }}>{textDescription}</div></div>
                            <div style={{ display: "flex", fontStyle: "italic", padding: "10px" }}>Заплата: <div style={{ fontWeight: "bold" }}>{salary} evro</div></div>
                            <div style={{ display: "flex", fontStyle: "italic", padding: "10px" }}>Добавено от: <div style={{ fontWeight: "bold" }}>{username}</div></div>
                            <div style={{ display: "flex", fontStyle: "italic", padding: "10px" }}>Телефон: <div style={{ fontWeight: "bold" }}>{phoneNumber}</div></div>
                        </div>
                    </div>    
                    <div >
                        <button onClick={() => getPost({ id })}>Get Post</button>
                        <button onClick={() => deletePostClicked({ id })}>DeletePost</button>
                    </div>
                   
                </div>
        
            )  
    
        }
       