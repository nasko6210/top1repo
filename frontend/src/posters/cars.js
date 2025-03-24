import { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../components/AuthContext';

import axios from 'axios';
export const Cars = () => {
    const navigate=useNavigate()
    const { authState } = useContext(AuthContext);
    let [brand, setBrand] = useState(),
        [model, setModel] = useState(),
        [description, setDescription] = useState(),
        [price, setPrice] = useState(),
        [compartment, setCompartment] = useState("sedan"),
        [eurostandart, setEurostandart] = useState(1),
        [engine, setEngine] = useState("benzin"),
        [transmission, setTransmission] = useState("ruchna"),
        [manafacture, setManafacture] = useState(),
        [mileage, setMileage] = useState(),
        [power, setPower] = useState(),
        [doors, setDoors] = useState(),
        [phoneNumber, setPhoneNumber] = useState();

    
    const addCar = () => {

        axios.post("http://localhost:3001/cars", {
           username:authState.username, brand: brand, model: model, description: description, price: price,
            compartment: compartment, eurostandart: eurostandart, engine: engine, transmission: transmission,
            manafacture: manafacture, mileage: mileage, power: power, doors: doors, phoneNumber: phoneNumber,
            
        })


    }

    return (<div>

        <div>Марка*<input type="text" placeholder="Audi" onChange={(event) => { setBrand(event.target.value) }}></input></div>
        <p>Модел*<input type="text" placeholder='A7' onChange={(event) => { setModel(event.target.value) }} /></p>
        <textarea rows="5" placeholder='Кратко описание...' onChange={(event) => { setDescription(event.target.value) }} />
        <p>Цена: <input type="text" style={{ width: "60px" }} onChange={(e) => { setPrice(e.target.value) }} />лв.</p>


       

        <br />

        <select value={compartment} onChange={(e) => { setCompartment(e.target.value) }}>
            <option value="Седан">Седан</option>
            <option value="Хечбек">Хечбек</option>
            <option value="Комби">Комби</option>
            <option value="Кабрио">Кабрио</option>
            <option value="Джип">Джип</option>
            <option value="Пикап">Пикап</option>
            <option value="Ван">Ван</option>
        </select>
        <select value={eurostandart} onChange={(e) => { setEurostandart(e.target.value) }}>
            <option value="1">Евростандарт 1</option>
            <option value="2">Евростандарт 2</option>
            <option value="3">Евростандарт 3</option>
            <option value="4">Евростандарт 4</option>
            <option value="5">Евростандарт 5</option>
            <option value="6">Евростандарт 6</option>
        </select>

        <select value={engine} onChange={(e) => { setEngine(e.target.value) }}>
            <option value="benzin">Бензин</option>
            <option value="dizel">Дизел</option>
            <option value="gazbenzin">Газ/Бензин</option>
            <option value="metanbenzin">Метан/Бензин</option>
            <option value="metan">Метан</option>
            <option value="hibrid">Хибрид</option>
            <option value="elektrichestvo">Електричество</option>
        </select>
        <select value={transmission} onChange={(e) => { setTransmission(e.target.value) }}>
            <option value="ruchna">Ръчна кутия</option>
            <option value="avtomatichna">Автоматична кутия</option>
            <option value="poluavtomatichna">Полуавтоматична кутия</option>
        </select>
        <p>Година производство* <input type="number" placeholder='г.' onChange={(e) => { setManafacture(e.target.value) }} /></p>
        <p>Пробег*<input type="number" placeholder='км.' onChange={(e) => { setMileage(e.target.value) }} /></p>
        <p>Мощност (к.с)<input type="number" onChange={(e) => { setPower(e.target.value) }} /></p>
        <p>Брой врати*<input type="number" onChange={(e) => { setDoors(e.target.value) }} /></p>
        <p>Телефон за контакт: <input type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} /></p>
        <button onClick={addCar}>Добави обява</button>


    </div>)
}