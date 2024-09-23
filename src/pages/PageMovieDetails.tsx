import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons, IonBackButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState, useEffect } from 'react';
import Axios from "axios";
import './PageMovieDetails.css';
import { useParams } from 'react-router';
import { Movie } from '../models/movieModel';


const PageMovieDetails: React.FC = () => {

  const { idParam } = useParams<{ idParam: string }>();
  const [datos, setDatos] = useState<Movie>();

  useEffect(() => {
    Axios({
      url: `https://freetestapi.com/api/v1/movies/${idParam}`,
    }).then((response) => {
      setDatos(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [idParam]);

  // La inicialización solo ocurre la primera vez cuando se crea
  const [urlPoster, setUrlPoster] = useState(datos?.poster);
  const [urlTrailer, setUrlTrailer] = useState(datos?.trailer);

  useEffect(() => {
    if (datos?.id === 1) {
      setUrlPoster("https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg");
    }else{
      setUrlPoster(datos?.poster);
    }
  }); // El useEffect sin dependencias se ejecuta cada vez que se renderiza en la página
      // Si le pongo el array vacio [] como dependencia solo se va a ejecutar una vez, es decir, cuando se monte. Después en cada renderización no se va a volver a ejecutar.

  useEffect(() => {
    if (datos?.id === 1) {
      setUrlTrailer("https://www.youtube.com/embed/NmzuHjWmXOc");
    }else{
      setUrlTrailer(datos?.trailer);
    }
  })

  console.log("")

  return (
    <IonPage className='pantallaPrincipal'>
      <IonHeader className='pantallaPrincipal'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          {/** El operador ? o optinal chaining intenta acceder a la variable y en caso de ser
             * null o undefined no causa error y solo retorna undefined. Esto lo hacemos para que si es 
             * undefined o null no de errores
             */}
          <IonTitle className='tituloCentro'>Película: {datos?.title} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='pantallaPrincipal'>
        <IonGrid>
          <IonRow>
            <IonCol size="6" className='contenedorColumna'>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Datos</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <div className='textoExplicativo'> Año de lanzamiento:  </div> {datos?.year}
                  <br />
                  <div className='textoExplicativo'> Géneros: </div> <IonText> {datos?.genre.join(', ')}</IonText>
                  <br />
                  <div className='textoExplicativo'> Puntuación: </div> {datos?.rating}
                  <br />
                  <div className='textoExplicativo'> Idioma: </div> {datos?.language}
                  <br />
                  <div className='textoExplicativo'> Actores:</div> <IonText>{datos?.actors.join(', ')}</IonText>
                  <br />
                  <a href={datos?.website}> Página web </a>
                  <IonCol size="6" className='poster'>
                    <img
                      src={urlPoster}
                      alt={`Poster de ${datos?.title}`}
                      style={{ width: '100%', height: 'auto' }}

                    />
                    <br />
                  </IonCol>

                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" className='frame'>
              <iframe className='frame'
                width={560}
                height={560}
                src={urlTrailer}
                title={`Trailer de ${datos?.title}`}
                allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy = "strict-origin-when-cross-origin" 
                allowFullScreen>
                </iframe>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>



  );
};

export default PageMovieDetails;