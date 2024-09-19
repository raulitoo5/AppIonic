import Axios from "axios";
import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { Movie } from "../models/movieModel";
import { useParams } from "react-router";

export function movieDetails(id:string){

    const [datos, setDatos] = useState<Movie>();

    console.log("estoy en movieDetails con id", id);


        useEffect(() => {
            setTimeout(() => {
                Axios({
                    url: `https://freetestapi.com/api/v1/movies/${id}`,
                }).then((response) => {
                    setDatos(response.data);
                }).catch((error) => {
                    console.log(error);
                });
            },3000)
    
        }, []);

    

    return {
        datos
    }
}

