import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { body, compassSharp, logInOutline } from 'ionicons/icons';
import { FormEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OverlayEventDetail } from '@ionic/core';
import { useJwt } from "react-jwt";
import apiClient from '../axiosConfig';

const Tab3: React.FC = () => {

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [correoRecuperacion, setCorreoRecuperacion] = useState('');

  const token = localStorage.getItem('token') || '';
  const { decodedToken, isExpired } = useJwt(token);

  // Aquí es donde verifico que el token no ha expirado
  useEffect(() => {
    const getToken = () => {

      if (token && !isExpired) {
        history.push('/LoginExito');
      }
    };

    getToken();
  }, [])

  /*   const login = async() => {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  
          username: correo,
          password: contraseña,
          expiresInMins: 1, // optional, defaults to 60
        }),
        //credentials: 'include' // Include cookies (e.g., accessToken) in the request
      })
        .then(res => res.json())
        .then(async data => {
          if (data.accessToken) {
            // Creamos el local Storage y guardamos la variable token
  
            localStorage.setItem('token',data.accessToken);
            console.log("la fecha de exp del token es: ", data.accessToken.exp);
            console.log('Inicio de sesión exitoso:', data);
            history.push({
              pathname: '/LoginExito',
            });
          }
        })
        .then(console.log);
    } */

        
  // Login usando el interceptor
  const login = async () => {
    try {
      const respuesta = await apiClient.post('/auth/login', {
        username: correo,
        password: contraseña,
        expiresInMins: 1, // optional, defaults to 60
      });

      if (respuesta.data.accessToken) {
        // Creamos el local Storage y guardamos la variable token

        localStorage.setItem('token', respuesta.data.accessToken);
        console.log("la fecha de exp del token es: ", respuesta.data.accessToken.exp);
        console.log('Inicio de sesión exitoso:', respuesta.data);
        history.push({
          pathname: '/LoginExito',
        });
      }
    } catch (error) {
      console.log('Error al iniciar sesión', error);
    }
  }

  // Con este método lo que hacemos es indicar que pasa cuando pinchamos en confirmar.
  // Usamos un CustumEvente que es un tipo de JavaScript para eventos personalizados
  // OverlayEventDetail es un tipo que se usa en JavaScript que describe los detalles del evento
  // cuando un modal se ha cerrado
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setCorreoRecuperacion(ev.detail.data);
    }
  }

  // Con este método estamos confirmando los datos y cerrando el modal
  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Inicio sesión</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonCol>
                      <IonRow>
                        <IonItem>
                          <IonInput
                            label="Correo electrónico: "
                            placeholder='Introduza su correo'
                            // Esto indica que e tiene un campo detail que dentro tiene un campo value que es de tipo SetStateAction<string> 
                            // Esto es necesario ya que typescript es un lenguaje fuertemente tipado y necesita conocer los tipos
                            // El tipo setStateAction<string> es un tipo de React e indica que es algo que puede actualizar el estado con un valor
                            // de tipo string
                            onIonChange={(e: { detail: { value: SetStateAction<string>; }; }) => setCorreo(e.detail.value)}
                          >

                          </IonInput>
                        </IonItem>
                      </IonRow>
                      <IonRow>
                        <IonItem>
                          <IonInput
                            label="Contraseña: "
                            type="password"
                            placeholder='Introduzca la contraseña'
                            onIonChange={(e: any) => setContraseña(e.target.value)}>
                          </IonInput>
                        </IonItem>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton onClick={login}> Iniciar sesión </IonButton>

                          <IonButton routerLink='Registro'>  Registrarme </IonButton>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        {/*                         IMPORTANTE PONER EL ID Y QUE COINCIDA CON EL TRIGGER DEL MODAL  */}
                        <IonItem button id="open-modal">
                          <IonLabel>
                            ¿Ha olvidado su contraseña?
                          </IonLabel>
                        </IonItem >
                      </IonRow>
                    </IonCol>
                    <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                      <IonHeader>
                        <IonToolbar>
                          <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancelar</IonButton>
                          </IonButtons>
                          <IonTitle>Recuperar contraseña</IonTitle>
                          <IonButtons slot="end">
                            <IonButton strong={true} onClick={() => confirm()}>
                              Recuperar
                            </IonButton>
                          </IonButtons>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent className="ion-padding">
                        <IonItem>
                          <IonInput
                            label="Introduce tu correo"
                            labelPlacement="stacked"
                            ref={input}
                            type="text"
                            placeholder="Correo"
                          />
                        </IonItem>
                      </IonContent>
                    </IonModal>
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

export default Tab3;
