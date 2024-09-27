import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons, IonBackButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './DetallePeliSkeleton.css';

const DetallePelisSkeleton: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className='cardSkeleton'>
                <IonCardHeader>
                  <IonCardTitle>Cargando datos película...</IonCardTitle>

                </IonCardHeader>

                <IonCardContent>
   
                  <IonCol size="6" className='poster'>
                    <img />
                  </IonCol>

                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" className='frameSkeleton' >
              <iframe srcdoc="<p> Cargando trailer... </p>">

              </iframe>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>



  );
};

export default DetallePelisSkeleton;