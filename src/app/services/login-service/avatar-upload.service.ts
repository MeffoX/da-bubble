import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarUploadService {

  constructor(private storage: Storage) { }

  uploadImageFromPath(imagePath: string, path: string): Observable<string> {
    return from(
      fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
          const storageRef = ref(this.storage, path);
          return uploadBytes(storageRef, blob);
        })
    ).pipe(
      switchMap(async (uploadTask) => uploadTask),
      switchMap(result => getDownloadURL(result.ref))
    );
  }
}