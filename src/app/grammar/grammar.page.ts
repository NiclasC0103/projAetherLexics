import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { 
  IonContent, IonHeader, IonToolbar, IonIcon, IonButtons, IonButton, 
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonCard, IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  globeOutline, arrowBack, chevronDown, alertCircleOutline, 
  schoolOutline, cubeOutline, chatbubblesOutline, timeOutline,
  constructOutline, flashOutline, helpCircleOutline, mapOutline, lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.page.html',
  styleUrls: ['./grammar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, 
    IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    CommonModule, FormsModule
  ]
})
export class GrammarPage implements OnInit {

  // Controla qué nivel se está visualizando. Null = Menú Principal.
  selectedLevel: string | null = null;

  // Configuración de los niveles (RPG Style)
  levels = [
    { code: 'A1', rank: 'Rookie', tier: 'tier-a', locked: false, progress: '10%' },
    { code: 'A2', rank: 'Cadet', tier: 'tier-a', locked: true, progress: '0%' },
    { code: 'B1', rank: 'Pilot', tier: 'tier-b', locked: true, progress: '0%' },
    { code: 'B2', rank: 'Captain', tier: 'tier-b', locked: true, progress: '0%' },
    { code: 'C1', rank: 'Commander', tier: 'tier-c', locked: true, progress: '0%' },
    { code: 'C2', rank: 'Legend', tier: 'tier-c', locked: true, progress: '0%' }
  ];

  constructor(private router: Router) {
    // Registramos todos los iconos necesarios
    addIcons({ 
      globeOutline, arrowBack, chevronDown, alertCircleOutline, 
      schoolOutline, cubeOutline, chatbubblesOutline, timeOutline,
      constructOutline, flashOutline, helpCircleOutline, mapOutline, lockClosedOutline
    });
  }

  ngOnInit() {}

  // Entrar a un nivel específico
  selectLevel(levelCode: string) {
    if (levelCode === 'A1') {
      this.selectedLevel = levelCode;
    } else {
      console.log('Access Denied: Level Locked');
      // Aquí podrías poner un Toast
    }
  }

  // Lógica del botón Atrás (Nivel -> Menú -> Home)
  handleBack() {
    if (this.selectedLevel) {
      this.selectedLevel = null; // Volver al menú de niveles
    } else {
      this.router.navigate(['/home']); // Volver al Home
    }
  }
}