import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { logInOutline } from 'ionicons/icons';
import { useState } from 'react';

const PageRegistro: React.FC = () => {

  const [nombre, setNombre] = useState('');
  const [correo,setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Formulario de registro</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonCol>
                    <IonRow>
                        <IonItem>
                          <IonInput label="Nombre:" placeholder='Escriba aquí su nombre'></IonInput>
                        </IonItem>
                      </IonRow>
                      <IonRow>
                        <IonItem>
                          <IonInput label="Correo electrónico:" placeholder='Escriba aquí su correo'></IonInput>
                        </IonItem>
                      </IonRow>
                      <IonRow>
                        <IonItem>
                          <IonInput label="Contraseña:" placeholder='Escriba aquí su contraseña'></IonInput>
                        </IonItem>
                      </IonRow>
                      <IonRow>
                        <IonItem>
                          <IonInput label="Repita la contraseña:" placeholder='Repita la contraseña'></IonInput>
                        </IonItem>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonButton routerLink='/Login'> Iniciar sesión </IonButton>
                          
                          <IonButton> Registrarme </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default PageRegistro;
