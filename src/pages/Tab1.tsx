import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import '../components/TodasPelisSkeleton.css';
import { useMovies } from '../hooks/useMovies';
import TodasPelisSkeleton from '../components/TodasPelisSkeleton'; 

const Tab1: React.FC = () => {

  const { movies, cargando } = useMovies();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {cargando && "Cargando lista de películas..."}
            {!cargando && "Películas"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {cargando && <TodasPelisSkeleton />}
        <IonGrid>
          <IonRow>
            {movies && movies.map((movie, index) => (
              <IonCol size="6" key={index} className='boton'>
                <IonItem routerLink={`movieDetails/${movie.id}`}>
                  <IonLabel>
                    Título: {movie.title}
                    <br />
                    Géneros: <IonText> {movie.genre.join(', ')}</IonText>
                  </IonLabel>
                </IonItem>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
