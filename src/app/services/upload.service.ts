import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  async uploadFile(file: File): Promise<string> {
    const storage = getStorage();
    // Erstellen Sie eine Referenz zum Firebase Storage-Pfad, wo die Datei gespeichert werden soll
    const storageRef = ref(storage, 'some-path/' + file.name);

    try {
      // Laden Sie die Datei hoch
      const uploadResult = await uploadBytes(storageRef, file);
      // Holen Sie die Download-URL der hochgeladenen Datei
      return getDownloadURL(uploadResult.ref);
    } catch (error) {
      console.error('Fehler beim Hochladen der Datei: ', error);
      throw error;
    }
  }
}
