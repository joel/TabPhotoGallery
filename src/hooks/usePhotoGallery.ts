import { useState, useEffect } from 'react';
import { useCamera } from '@ionic/react-hooks/camera';
import { useStorage } from '@ionic/react-hooks/storage';
import { CameraResultType, CameraSource, CameraPhoto, FilesystemDirectory } from "@capacitor/core";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
export interface Photo {
  filepath: string;
  webviewPath?: string;
}

const PHOTO_STORAGE = "photos";
export function usePhotoGallery() {
  const { readFile, writeFile } = useFilesystem();
  const { getPhoto } = useCamera();
  const { get, set } = useStorage();

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = await get(PHOTO_STORAGE);
      const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
      for (let photo of photos) {
        const file = await readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
      setPhotos(photos);
    };
    loadSaved();
  }, [get, readFile]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fileName = new Date().getTime() + '.jpeg';

    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];

    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    setPhotos(newPhotos)
  };

  const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  };

  return {
    photos,
    takePhoto
  };
}