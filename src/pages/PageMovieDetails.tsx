import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons, IonBackButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState } from 'react';
import './PageMovieDetails.css';
import {movieDetails} from '../components/movieDetail';
import { useParams } from 'react-router';

const PageMovieDetails: React.FC = () => {

    const {id} = useParams<{id:string}>();
    console.log("el id de la priemra pagina es", id)
    const {datos} = movieDetails();

    console.log("los datos de la pelicula son: ", datos);
    
    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
            {/** El operador ? o optinal chaining intenta acceder a la variable y en caso de ser
             * null o undefined no causa error y solo retorna undefined
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
                        Género: {datos?.genre}
                        <br />
                        Puntuación: {datos?.rating}
                        <br />
                        Idioma: {datos?.language}
                        <br/>
                        Actores: {datos?.actors}
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