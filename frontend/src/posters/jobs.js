import { useState, useContext } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { BASE_URL } from "../constant-data/env";

export const Jobs = () => {
    const [title, setTitle] = useState(),
        [textDescription, setTextDescription] = useState(),
        [phone, setPhone] = useState(),
        [salary, setSalary] = useState(),
        { authState } = useContext(AuthContext),
        [files, setFile] = useState([]),
        [location, setLocation] = useState('София'),
        [position, setPosition] = useState(''),
        [education, setEducation] = useState('Средно'),
        [employment, setEmployment] = useState('Постоянна работа'),
        [contractType, setContractType] = useState('Трудов договор');
    const sectorTypeArray = [];
    const navigate = useNavigate()


 
    const addJobPoster = async event => {
        event.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {

            formData.append("images", files[i]);
        }

        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                sectorTypeArray.push(checkbox.value)
            }
        })



        axios.post(`${BASE_URL}/upload`, formData, { headers: { 'Content-Type': "multipart/form-data" } })
            .then(response1 => {
                const imagesArray = response1.data
                console.log(imagesArray)

                axios.post(`${BASE_URL}/jobs`,
                    {
                        title: title, textDescription: textDescription,
                        salary: salary, phoneNumber: phone,
                        username: authState.email,
                        location: location, position: position,
                        education: education, employment: employment,
                        contractType: contractType, sectorType: sectorTypeArray,
                        image1: imagesArray[0], image2: imagesArray[1], image3: imagesArray[2], image4: imagesArray[3], image5: imagesArray[4]
                    }).then(response => {
                        const jobId = response.data.id
                        
                        axios.post(`${BASE_URL}/jobsSector`, {
                            jobSector: sectorTypeArray,
                            jobId: jobId
                        })
                    })
                
            })

        navigate('/')
    }

    return (<div>
        <div>Позиция* <input type="text" placeholder="Например: Водопроводчик" onChange={(event) => { setTitle(event.target.value) }}></input></div>
        <p>Описание на длъжността*<input type="text" rows="1" placeholder="Кратко описание..." onChange={(event) => { setTextDescription(event.target.value) }}></input></p>
        <div style={{ float: "left" }}>Заплата <input type="number" style={{ width: "30px", height: "12px" }}
            onChange={(event) => { setSalary(event.target.value) }} /> лв. </div>

        <div>Месторабота:<input type="text" placeholder="София-град" onChange={(e) => { setLocation(e.target.value) }} /></div>
        <div>Длъжност<input type="text" placeholder="продвач-консултант" onChange={(e) => { setPosition(e.target.value) }} /></div>
        <div>Образование <select value={education} onChange={(e) => { setEducation(e.target.value) }}>
            <option value="Средно">Средно</option>
            <option value="Средно специално">Средно специално</option>
            <option value="Полувисше">Полувисше</option>
            <option value="Висше">Висше</option>
            <option value="Няма значение">Няма значение</option>
        </select></div>
        <div>Заетост<select value={employment} onChange={(e) => { setEmployment(e.target.value) }}>
            <option value="Постоянна работа">Постоянна работа</option>
            <option value="Сезонна работа">Сезонна работа</option>
            <option value="Стаж">Стаж</option>
            <option value="Работа по проект">Работа по проект</option>
        </select></div>
        <div>Договор<select value={contractType} onChange={(e) => { setContractType(e.target.value) }}>
            <option value="Трудов договор">Трудов договор</option>
            <option value="Граждански договор">Граждански договор</option>
            <option value="Друг вид">Друг вид</option>
        </select>

        </div>
        <div>Телефон за контакт*<input type="number" style={{ width: "112px" }} onChange={(e) => { setPhone(e.target.value) }} />
            <form>
                <input onChange={(e) => { setFile(e.target.files) }} type="file" multiple accept="image/*" />
            </form>
            <button onClick={addJobPoster}>Добави обява</button></div>

        <input type="checkbox" id="checkbox1" value="администрация" />
        <label for="checkbox1">Администрация</label>

        <input type="checkbox" id="checkbox2" value="Градинарство,озеленяване" />
        <label for="checkbox2">Градинарство,озеленяване</label>

        <input type="checkbox" id="checkbox3" value="Грижи за деца и възрастни" />
        <label for="checkbox3">Грижи за деца и възрастни</label>

        <input type="checkbox" id="checkbox4" value="Дизайн, печат" />
        <label for="checkbox4">Дизайн, печат</label>

        <input type="checkbox" id="checkbox5" value="Дистрибуция и пласьори" />
        <label for="checkbox5">Дистрибуция и пласьори</label>

        <input type="checkbox" id="checkbox6" value="Електрониха, електротехника" />
        <label for="checkbox6">Електрониха, електротехника</label>

        <input type="checkbox" id="checkbox7" value="Застраховане" />
        <label for="checkbox7">Застраховане</label>

        <input type="checkbox" id="checkbox8" value="Здраве,спорт" />
        <label for="checkbox8">Здраве,спорт</label>

        <input type="checkbox" id="checkbox9" value="ИТ, Комуникации" />
        <label for="checkbox9">ИТ, Комуникации</label>

        <input type="checkbox" id="checkbox10" value="Изкуство и култура" />
        <label for="checkbox10">Изкуство и култура</label>

        <input type="checkbox" id="checkbox11" value="Маркетинг,реклама, ПР" />
        <label for="checkbox11">Маркетинг,реклама, ПР</label>

        <input type="checkbox" id="checkbox12" value="Медии" />
        <label for="checkbox12">Медии</label>

        <input type="checkbox" id="checkbox13" value="Медицина, Фармация" />
        <label for="checkbox13">Медицина, Фармация</label>

        <input type="checkbox" id="checkbox14" value="Мода, облекло" />
        <label for="checkbox14">Мода, облекло</label>

        <input type="checkbox" id="checkbox15" value="Морски специалности, Авиация" />
        <label for="checkbox15">Морски специалности, Авиация</label>

        <input type="checkbox" id="checkbox16" value="Недвижими имоти" />
        <label for="checkbox16">Недвижими имоти</label>

        <input type="checkbox" id="checkbox17" value="Нехранителна промишленост" />
        <label for="checkbox17">Нехранителна промишленост</label>

        <input type="checkbox" id="checkbox18" value="Образование" />
        <label for="checkbox18">Образование</label>

        <input type="checkbox" id="checkbox19" value="Охрана" />
        <label for="checkbox19">Охрана</label>

        <input type="checkbox" id="checkbox20" value="Право" />
        <label for="checkbox20">Право</label>

        <input type="checkbox" id="checkbox21" value="Преводи, легализация" />
        <label for="checkbox21">Преводи, легализация</label>

        <input type="checkbox" id="checkbox22" value="Ресторантьорство, Заведения" />
        <label for="checkbox22">Ресторантьорство, Заведения</label>

        <input type="checkbox" id="checkbox23" value="Салони за красота" />
        <label for="checkbox23">Салони за красота</label>

        <input type="checkbox" id="checkbox24" value="Селско стопанство" />
        <label for="checkbox24">Селско стопанство</label>

        <input type="checkbox" id="checkbox25" value="Строителство, Архитектура" />
        <label for="checkbox25">Строителство, Архитектура</label>

        <input type="checkbox" id="checkbox26" value="Счетоводство" />
        <label for="checkbox26">Счетоводство</label>

        <input type="checkbox" id="checkbox27" value="Транспорт,Автоуслуги" />
        <label for="checkbox27">Транспорт,Автоуслуги</label>

        <input type="checkbox" id="checkbox28" value="Туризъм,Хотели" />
        <label for="checkbox28">Туризъм,Хотели</label>

        <input type="checkbox" id="checkbox29" value="Търговия, Продажби" />
        <label for="checkbox29">Търговия, Продажби</label>

        <input type="checkbox" id="checkbox30" value="Финанси" />
        <label for="checkbox30">Финанси</label>

        <input type="checkbox" id="checkbox31" value="Хигиена" />
        <label for="checkbox31">Хигиена</label>

        <input type="checkbox" id="checkbox32" value="Хранителна промишленост" />
        <label for="checkbox32">Хранителна промишленост</label>

        <input type="checkbox" id="checkbox33" value="Шоубизнес" />
        <label for="checkbox33">Шоубизнес</label>

        <input type="checkbox" id="checkbox34" value="Друг" />
        <label for="checkbox34">Друг</label>

    </div>)
}
