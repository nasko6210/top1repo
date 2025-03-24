import { useEffect,useState } from "react";
import { Jobs } from "./jobs";
import {Cars } from "./cars";
import { Electronics } from "./electronics";

export function Poster(){
    const [category,setCategory]=useState("jobs")

    const [carsContentVisible, setCarsContentVisible]=useState(false);
    const [jobsContentVisible, setJobsContentVisible]=useState(false);
    const [electronicsContentVisible,setEelectronicsContentVisible]=useState(false);
 useEffect(()=>{
    switch(category){
        case 'cars':setCarsContentVisible(true);setJobsContentVisible(false);setEelectronicsContentVisible(false);break;
        case 'jobs':setJobsContentVisible(true);setCarsContentVisible(false);setEelectronicsContentVisible(false);break;
        case 'electronics':setEelectronicsContentVisible(true);setJobsContentVisible(false);setCarsContentVisible(false);break;
        default:console.log("no category")
    }
 },[category])
return(
    <div>
        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="jobs">Работа</option>
            <option value="cars">Автомобили</option>
            <option value="electronics">Електроника</option>
        </select>
        {carsContentVisible && <Cars/>}
        {jobsContentVisible && <Jobs/>}
        {electronicsContentVisible && <Electronics/>}
    </div>
)
}