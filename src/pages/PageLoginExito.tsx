import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons, IonBackButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './PageMovieDetails.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import apiClient from '../axiosConfig';

/* const token = await storage.get('token');
 */
interface respuestaDatos{
  firstName:string;
  lastName:string;
  message:string;
}

const PageLoginExito: React.FC = () => {

  const [datos,setDatos] = useState<respuestaDatos>();
  const history = useHistory();

  const tokenR = localStorage.getItem('token') || '';

  // Métodos de la biblioteca "react-jwt"
  const { decodedToken, isExpired, reEvaluateToken } = useJwt(tokenR);

  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nuevoToken = localStorage.getItem('token') || '';
      reEvaluateToken(nuevoToken);
      console.log("compruebo expiracion", isExpired);
    }, 5000);

    return() => clearInterval(intervalId);
  },[]);

  useEffect(() => {
    if(isExpired){
      cerrarSesion();
    }
  },[isExpired]);

  // Función para mostrar los datos de la persona
  
 /*   const mostrarDatos = () => {
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenR} `, // Pass JWT via Authorization header
      },
      //credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
      .then(res => res.json())
      .then(data => {
        setDatos(data);
        console.log("los datos son: ", data);
      })
      .then(console.log);
  }  */

  const mostrarDatos = async() => {
    try{
      const respuesta = await apiClient.get('auth/me');

      if(respuesta){
        setDatos(respuesta.data);
      }
    } catch(error){
      console.log("Error en mostar datos de PageLoginExito: ", error);
    }
  } 
 
    const cerrarSesion = async() => {
      await localStorage.removeItem('token');
      history.push('/Login');
    }

  return (
    <IonPage className='pantallaPrincipal'>
      <IonHeader className='pantallaPrincipal'>
        <IonToolbar>
          { !tokenR && <IonButtons slot="start" onClick={cerrarSesion}>
            <IonBackButton defaultHref="/tab1"/>
          </IonButtons>} 
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='pantallaPrincipal'>
        <IonGrid>
          <IonRow>
            <IonCol size="6" className='contenedorColumna'>
              <IonText> Login exitoso</IonText>
              <IonButton onClick={mostrarDatos}>
                Mostrar datos
              </IonButton>
              <IonButton onClick={cerrarSesion}>
                Cerrar sesión
              </IonButton>
            </IonCol>
          </IonRow>
          {datos && datos.message !== '' && datos.message !== "Invalid/Expired Token!" &&(
            <IonRow>
              <IonCol>
                <IonText>
                  Nombre: {datos.firstName}
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  Apellidos: {datos.lastName}
                </IonText>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

export default PageLoginExito;