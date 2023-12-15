import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  checkFileSize(file: File): boolean {
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in Bytes
    return file.size <= maxFileSize;
  }

  async uploadFile(file: File): Promise<string | null> {
    if (!this.checkFileSize(file)) {
      window.alert('Datei ist zu groß. Maximale Dateigröße ist 2 MB.');
      return null;
    }

    const storage = getStorage();
    const storageRef = ref(storage, 'some-path/' + file.name);

    const uploadResult = await uploadBytes(storageRef, file);
    debugger;
    return getDownloadURL(uploadResult.ref);
  }
}
