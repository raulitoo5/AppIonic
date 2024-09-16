import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE='photos';

export function usePhotoGallery() {

    const[photos, setPhotos] = useState<UserPhoto[]>([]);

    // : Promise<UserPhoto> indica que l que devuelve la funcion es una promesa de tipo UserPhoto.
    // Una promesa es un objeto de JavaScript que representa si una operación asíncrona se ha realizado de forma correcta o incorrecta.

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        // Creamos una variable que puede ser de tipo string o de tipo blob.
        // Depende del entorno se almacenará como tipo string o como tipo blob.
        let base64Data: string | Blob;

        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
              path: photo.path!,
            });
            base64Data = file.data;
          } else {
            base64Data = await base64FromPath(photo.webPath!);
          }
        
          const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Data,
        });
    
        if (isPlatform('hybrid')) {
            return {
              filepath: savedFile.uri,
              webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
          } else {
            return {
              filepath: fileName,
              webviewPath: photo.webPath,
            };
          }
      };

      useEffect(() => {
        const loadSaved = async () => {
          const { value } = await Preferences.get({ key: PHOTO_STORAGE });

          // Si existe value lo convertimos de una cadena JSON a un array de objetos de tipo UserPhoto.
          // Value contiene un string con los datos de las fotos. Esto lo hemos hecho con
          // JSON.stringfy(newPhotos) al final de takePhoto 
          // Si no existe value usamos un array vacío.
          // Usamos "as UserPhoto" para indicar que photosInPreferences es de tipo UserPhoto
          const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];
      
          if(!isPlatform('hybrid')){
            for (let photo of photosInPreferences) {
                const file = await Filesystem.readFile({
                  path: photo.filepath,
                  directory: Directory.Data,
                });
                // Web platform only: Load the photo as base64 data
                // Actualizamos la propiedad webviewPath de cada foto asignando una cadena de datos en base64 
                // Con esto lo que hacemos es crear una URL de datos en base64 para la imagen y solo se podrá
                // mostrar en la web
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
              }
          }
          setPhotos(photosInPreferences);
        };
        loadSaved();
        // Una hook de tipo useEffect se va a ejecutar cada vez que se renderice esa pagina o componente
        // pero si le pasamos un argumento significa que este hook se va a ejecutar cuando cambie de valor
        // ese argumento. En nuestro caso al pasar un array vacio [], significa que solo se va a ejecutar 
        // una vez ya que este array no va a cambiar de valor.
      }, []);

      const takePhoto = async () => {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100,
        });
      
        const fileName = Date.now() + '.jpeg';
        const savedFileImage = await savePicture(photo, fileName);
        // Con esta línea creamos un nuevo array "newPhotos" que contiene la foto que hay en savedFileImage ( que es la foto tomada )
        // y la el array de fotos que ya teníamos
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);

        // Con esto lo que hacemos es que se guarde en el almacenamiento de fotos y no importa 
        // si el usuario cierra o cambia a una app diferente
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
      };

      const deletePhoto = async (photo: UserPhoto) => {
        // Creamos un nuevo array eliminando la foto que queremos
        // El metodo filter es un metodo de javaScript para los arrays que crea un nuevo array con todos los elementos
        // que cumplan la condicion que se especificia
        
        // La funcion filter se ejecuta para cada elemento (cada foto) del array photos
        // P hace referencia a cada foto en cada iteracion
        // Lo que hacemos es que si p.filepath, es decir, el path de la foto de esa iteracion
        // es distinto al photo.filepath, es decir, al path de la foto que queremos borrar
        // esa foto seguirá en nuestro array pero si es igual esa foto no estára en el nuevo array (newPhotos)
        const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);
      
        // Almacenamos el almacenamiento de preferencias con el nuevo array de fotos sin la eliminada
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
      
        // Eliminamos la foto del archivo
        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
          path: filename,
          directory: Directory.Data,
        });
        setPhotos(newPhotos);
      };

      return{
        photos,
        takePhoto,
        deletePhoto,
      }
    }
    
    
    export async function base64FromPath(path: string): Promise<string> {
      // Esta función se usa para realizar una solicitud de red para conseguir el recurso que está en la URL que le hemos pasado.
      const response = await fetch(path);
      // Convierte la respuesta en un objeto de tipo blob que es un objeto de datos binarios que representa datos como archivos e imágenes.
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        // Es un objeto de la API de archivos que proporciona métodos para leer archivos y datos en formato de texto o binario.
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject('method did not return a string');
          }
        };
        // Es una funcion que lee el blob como una URL de datos en formato base64. La URL de datos es una cadena que contiene el archivo codificado en base64.
        reader.readAsDataURL(blob);
      });
  }
  

  export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
  }
