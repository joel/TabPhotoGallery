import { useState } from 'react';
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource, CameraPhoto, FilesystemDirectory } from "@capacitor/core";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const { writeFile } = useFilesystem();
  const { getPhoto } = useCamera();

  const [photos, setPhotos] = useState<Photo[]>([]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fileName = new Date().getTime() + '.jpeg';

    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];

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