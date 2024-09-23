import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './Tab1.css';
import { useMovies } from '../hooks/useMovies';
import { useEffect } from 'react';
import { Drivers, Storage } from '@ionic/storage';

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
