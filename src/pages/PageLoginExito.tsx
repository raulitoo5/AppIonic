import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons, IonBackButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './PageMovieDetails.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Drivers, Storage } from '@ionic/storage';

/* const token = await storage.get('token');
 */
interface respuestaDatos{
  firstName:string;
  lastName:string;
  message:string;
}

const PageLoginExito: React.FC = () => {

  const [datos,setDatos] = useState<respuestaDatos>();
  const [store, setStore] = useState<Storage | null>(null);
  const [tokenR, setToken] = useState('');

  useEffect(() => {
    const crearStorage = async () => {
      const storeInstance = new Storage({
        name: '__mydb',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      });
      await storeInstance.create(); // Inicializa el almacenamiento
      setStore(storeInstance); // Guarda la instancia del almacenamiento en el estado
    };

    crearStorage(); // Llama a la función para inicializar el almacenamiento
  }, []);

  useEffect(() => {
    const getToken = async() => {
      const tokenRecu = await store?.get('token');
      setToken(tokenRecu);
    };

    getToken();
  })

  const mostrarDatos = () => {
    /* providing token in bearer */
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
  }

  return (
    <IonPage className='pantallaPrincipal'>
      <IonHeader className='pantallaPrincipal'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
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