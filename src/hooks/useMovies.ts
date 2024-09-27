// Axios es un cliente HTTP basado en promesas para el navegador y node.js
import Axios from "axios";
import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { Movie } from "../models/movieModel";
import { useParams } from "react-router";

export function useMovies() {

    const { id } = useParams<{ id: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [cargando, setCargando] = useState(true);

    // El setTimeOut lo he puesto para que tarde algo en cargan para implementar el cargando y los skeletons
    useEffect(() => {
        setTimeout(() => {
            Axios({
                url: "https://freetestapi.com/api/v1/movies",
            }).then((response) => {
                setMovies(response.data);
            }).catch((error) => {
                console.log(error);
            });
            setCargando(false);
        }, 2000);
    }, []);

    return { movies, cargando }

}
