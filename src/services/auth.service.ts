import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable ()

export class AuthService {
    private user: firebase.User;

    constructor (public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        })
    }

    signInWithEmail(credenciais) {
        console.log("Entre com seu e-mail");
        return this.afAuth.auth.signInWithEmailAndPassword(credenciais.email,credenciais.senha);
    }

    cadastro(credenciais) {
      return this.afAuth.auth.createUserWithEmailAndPassword(credenciais.email, credenciais.senha);
    }

    get autenticado(): boolean {
        return this.user !== null;
    }

    getEmail() {
        return this.user && this.user.email;
    }

    signInWithGoogle(){
        console.log("Cadastro com o Google");
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }

    private oauthSignIn(provider: AuthProvider) {
        if(!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider)
            .then(() => {
                return this.afAuth.auth.getRedirectResult().then( result => {
                    //let token = result.credential.accessToken;

                    let user = result.user;
                    console.log(user);
                }).catch(function(error){
                    alert(error.message);
                });
            });
        }
    }
}
