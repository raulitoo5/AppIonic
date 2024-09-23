import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, images, square, film, logInOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import PageMovieDetails from './pages/PageMovieDetails';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import PageRegistro from './pages/PageRegistro';
import PageLoginExito from './pages/PageLoginExito';

setupIonicReact();

const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>

      {/* Define las rutas de las tabs */}
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1" component={Tab1} />
          <Route exact path="/tab2" component={Tab2} />
          <Route exact path="/tab3" component={Tab3} />
          <Route exact path="/Login" component={Tab3} />
          <Route exact path="/Registro" component={PageRegistro} />
        </IonRouterOutlet>

        {/* Barra de navegación para las tabs */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={film} />
            <IonLabel>Películas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={camera} />
            <IonLabel>Photos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={logInOutline} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      <Redirect exact path='' to="/tab1" />
      <Route exact path="/movieDetails/:idParam" component={PageMovieDetails} />
      <Route exact path="/LoginExito" component={PageLoginExito} />

    </IonReactRouter>
  </IonApp>
);


export default App;
