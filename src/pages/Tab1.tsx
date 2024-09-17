import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonBadge } from '@ionic/react';
import { Link } from 'react-router-dom';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './Tab1.css';
import { useMovies } from '../hooks/useMovies';

const Tab1: React.FC = () => {

  const { movies } = useMovies();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Películas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {movies && movies.map((movie, index) => (
              <IonCol size="6" key={index} className='boton'>
                <IonItem routerLink={`/movieDetails/${movie.id}`}>
                  Título: {movie.title}
                  <br />
                  Género: {movie.genre}
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
