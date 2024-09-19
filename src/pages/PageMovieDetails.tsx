import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons, IonBackButton, IonText } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState,useEffect } from 'react';
import Axios from "axios";
import './PageMovieDetails.css';
import {movieDetails} from '../components/movieDetail';
import { useParams } from 'react-router';
import { Movie } from '../models/movieModel';



const PageMovieDetails: React.FC = () => {

    const { idParam } = useParams<{ idParam:string }>();

    console.log("el parametro es: ", idParam);
   
    const [datos, setDatos] = useState<Movie>();
    const [id, setId] = useState<string>();
 
/*     const {datos} = movieDetails(id);
 */



useEffect(() => {
      Axios({
          url: `https://freetestapi.com/api/v1/movies/${idParam}`,
      }).then((response) => {
          setDatos(response.data);
      }).catch((error) => {
          console.log(error);
      });
}, [id]);

    console.log("los datos de la pelicula son: ", datos);
    
    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/tab1' />
          </IonButtons>
            {/** El operador ? o optinal chaining intenta acceder a la variable y en caso de ser
             * null o undefined no causa error y solo retorna undefined. Esto lo hacemos para que si es 
             * undefined o null no de errores
             */}
            <IonTitle className='tituloCentro'>Película: {datos?.title} </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        Año de lanzamiento: {datos?.year}
                        <br />
                        Géneros: <IonText> {datos?.genre.join(', ')}</IonText>
                        <br />
                        Puntuación: {datos?.rating}
                        <br />
                        Idioma: {datos?.language}
                        <br/>
                        Actores: <IonText>{datos?.actors.join(', ')}</IonText>
                        <br />
                        <a href={datos?.website}> Página web </a>
                        <br />
                        <img
                            src={datos?.poster}
                            alt={`Poster de ${datos?.title}`}
                        />
                        <br />
                        <iframe
                            width={560}
                            height={560}
                            src={datos?.trailer}
                            title={`Trailer de ${datos?.title}`}
                        />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
      </IonPage>



    );
};

export default PageMovieDetails;