import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private storage: Storage, private toastController: ToastController) {
    this.cargarFavoritos();
   }

   async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  guardarNoticia(noticia: Article) {
    const exist = this.noticias.find(n=>n.title === noticia.title);

    if (!exist) {
    this.noticias.unshift(noticia);
    this.storage.set('favoritos', this.noticias);
    this.presentToast("Agregado a favoritos");
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    console.log('favoritos', favoritos);
    if (favoritos) {
      this.noticias = favoritos;
    }
  }
  
borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(n => n.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast("Elemento borrado");
  }
}
