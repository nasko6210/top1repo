import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
export const Electronics = () => {
   const { authState } = useContext(AuthContext);
    const [title, setTitle] = useState(),
        [subCategory, setSubCategory] = useState("computers"),
        [description, setDescription] = useState(),
        [price, setPrice] = useState(),
        [phoneNumber, setPhoneNumber] = useState();
     const [file,setFile]=useState("");

const addElectronic=()=>{
    axios.post("http://localhost:3001/electronics",{username:authState.username,title:title,subCategory:subCategory,description:description,
    price:price, phoneNumber:phoneNumber}).then(()=>{
        console.log("added electronic")
    })
}

const submit=async event=>{
    event.preventDefault();
    const formData=new FormData();

    formData.append("image",file)
    await axios.post("http://localhost:3001/electronics/upload",formData,{headers: {'Content-Type': 'multipart/form-data'}})
}
    return (<div>
        <p>Заглавие* <input type="text" placeholder="Например iPhone 11 с гаранция" onChange={(e) => { setTitle(e.target.value) }} /></p>
        <select value={subCategory} onChange={(e) => { setSubCategory(e.target.value) }}>
            <option value="computers">Компютри</option>
            <option value="computersParts">Компютърни аксесоари,части</option>
            <option value="tablets">Таблети,четци</option>
            <option value="phones">Телефони</option>
            <option value="phoneParts">Аксесоари,части за телефони</option>
            <option value="tvs">Телевизори</option>
            <option value="audio">Аудио техника</option>
            <option value="household">Домакински уреди</option>
            <option value="airconditioning">Климатици</option>
            <option value="photo">Фото,видео</option>
            <option value="navigation">Навигация</option>
            <option value="other">Друго</option>
        </select>
        <textarea rows="5" placeholder="Кратко описание..." onChange={(e) => { setDescription(e.target.value) }} />
        <p>Цена:<input style={{width:"40px"}}type="number" onChange={(e) => { setPrice(e.target.value) }} />лв.</p>
        <p>Телефон за контакт: <input type="number" onChange={(e)=>{setPhoneNumber(e.target.value)}}/></p>
        <button onClick={addElectronic}>Добави обява</button>

<form onSubmit={submit}>
        <input onChange={e=>setFile(e.target.files[0])} type="file" accept="image/*"/>
        <button type="submit">Submit</button>
</form>

    </div>)
}