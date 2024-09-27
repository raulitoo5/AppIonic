import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './TodasPelisSkeleton.css';
import { useMovies } from '../hooks/useMovies';
import { useEffect, useState } from 'react';
import { Drivers, Storage } from '@ionic/storage';

const TodasPelisSkeleton: React.FC = () => {

  const [numFil, setNumFil] = useState(6);

  useEffect(() => {
    const calcularNumFil = () => {
      const alturaVentana = window.innerHeight;
      const alturaFila = 50;

      const filas = Math.ceil(alturaVentana / alturaFila);
      setNumFil(filas);
    };

    // Creo un evento de escucha para que se ejecute la función de calcular
    // las filas que caben cada vez que se redimensiona la pantalla
    calcularNumFil();
    window.addEventListener('resize', calcularNumFil);

    // Borro el evento de escucha cuando se desmonta el componente
    return () => {
      window.removeEventListener('resize', calcularNumFil);
    }
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {Array(numFil).fill('').map((_, index) => (
              <IonCol size="6" key={index} >
                <IonText className='peli-skeleton'>
                  Cargando película...
                </IonText>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TodasPelisSkeleton;
