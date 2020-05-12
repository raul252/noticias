import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i:number;
  @Input() enFavoritos;
  
  constructor(private iab: InAppBrowser, private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    ) { }

  ngOnInit(

  ) {
    console.log(this.enFavoritos);
  }

  abrirNoticia() {
    
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
    if (this.enFavoritos) {
      //Borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia( this.noticia );
          console.log('Play clicked');
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favoritos',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia( this.noticia );
          console.log('Play clicked');
        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          ).then(() => {
            
          }).catch(() => {
            
          });
        }
      }, guardarBorrarBtn, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
