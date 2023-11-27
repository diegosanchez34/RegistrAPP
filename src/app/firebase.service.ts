import { Injectable, inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { usuario } from './models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore)

    // --------------- Autenticacion ---------------

  // Iniciar Sesion
  singIn(user: usuario){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crear Usuario
  singUp(user: usuario){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar nombre
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }

  // Actualizar nombre
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }


  // --------------- Base de Datos ---------------

  // Crear usuario 
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  // Obtener datos del usuario
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
