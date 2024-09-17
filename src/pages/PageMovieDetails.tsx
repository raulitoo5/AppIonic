import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonBadge } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState } from 'react';
import './PageMovieDetails.css';
import {movieDetails} from '../components/movieDetail';

const PageMovieDetails: React.FC = () => {

    const {datos} = movieDetails();
    
    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>zc</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            {datos && datos.title}
        </IonContent>
      </IonPage>



    );
};

export default PageMovieDetails;