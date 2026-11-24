import { useEffect, useState } from "react";
import axios from 'axios';
import { Box, Chip, Typography, Paper } from "@mui/material";
import { BASE_URL } from "../constant-data/env";

export function AttributesList({ categoryId }) {
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        if (!categoryId) return;
        console.log("Fetching attributes for category: ", categoryId);

        axios.get(`${BASE_URL}/attributes/${categoryId}`).then((res)=>{
            console.log("attributes received: ",res.data);
            setAttributes(res.data);
        }).catch((err)=>console.error(""))

    }, [categoryId]);

    if(attributes.length===0){
        return(
            <Paper sx={{p:2, mb:2}}>
                <Typography variant="body2" color="text.secondary">
Няма намерени атрибути за тази категория.
                </Typography>
            </Paper>
        )
    }
    return(
        <Paper sx={{p:2, mb:2, borderRadius:3}}>
            <Typography variant="h6" sx={{mb:2}}>
            Филтри
            </Typography>
            <Box sx={{display:"flex", flexWrap:"wrap",gap:1}}>
        {attributes.map((attr)=>(
<Chip key={attr.id} label={attr.name} variant="outlined"/>
        ))}
            </Box>
        </Paper>
    )
}