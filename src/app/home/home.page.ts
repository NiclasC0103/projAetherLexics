import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// IMPORTANTE: Importamos IonContent para poder controlar el scroll
import { IonContent, IonIcon, IonHeader, IonToolbar, IonButton, IonBadge, ViewDidEnter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  sparklesOutline, chevronForwardOutline, chevronDownOutline, globeOutline, mailOutline, locationOutline,
  flashOutline, trophyOutline, earOutline, bookOutline, micOutline,
  createOutline, flameOutline, bulbOutline, trendingUpOutline, planetOutline, 
  rocketOutline, lockClosedOutline, arrowBack, statsChartOutline, pulseOutline, libraryOutline,
  playOutline, informationCircleOutline, scanOutline, codeWorkingOutline, 
  shieldCheckmarkOutline, stopwatchOutline, repeatOutline, hardwareChipOutline,
  peopleOutline, personOutline, airplaneOutline, // <--- ¡AGREGADO! Faltaba este import
  starOutline, analyticsOutline, medalOutline, ribbonOutline, diamondOutline, arrowForwardOutline
} from 'ionicons/icons';

interface Planet {
  id: string; name: string; type: string; status: 'active' | 'locked' | 'coming_soon';
  color: string; orbitDuration: string; size: number; distance: number; description: string; population: string;
}

interface SkillRegion {
  title: string; description: string; icon: string; color: string; glow: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonHeader, IonToolbar, IonButton, IonBadge], 
})
export class HomePage implements OnInit, OnDestroy, ViewDidEnter {
  protected readonly Math = Math;
  currentView: 'universe' | 'planet-view' = 'universe';
  selectedPlanet: Planet | null = null;

  // Referencia al Scroll de Ionic
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  private particles: any[] = [];
  private animationId!: number;
  private observer: IntersectionObserver | null = null;

  // --- DATOS DEL SISTEMA ---
  planets: Planet[] = [
    {
      id: 'english', name: 'Terra Anglica', type: 'Core World', status: 'active', color: '#00f3ff',
      orbitDuration: '35s', size: 90, distance: 160, population: '1.5B Units',
      description: 'The central hub. Home to universal archives of Syntax and Lexicon.'
    },
    {
      id: 'spanish', name: 'Hispania Sol', type: 'Desert World', status: 'locked', color: '#ff9d00',
      orbitDuration: '50s', size: 70, distance: 260, population: '580M Units',
      description: 'A vibrant world rich in history and rapid-fire communication protocols.'
    },
    {
      id: 'italian', name: 'Venetia IV', type: 'Oceanic', status: 'locked', color: '#00ff9d',
      orbitDuration: '70s', size: 60, distance: 340, population: '68M Units',
      description: 'The planet of arts. Language here flows like water.'
    },
    {
      id: 'chinese', name: 'Shenzhou X', type: 'Gas Giant', status: 'locked', color: '#ff0055',
      orbitDuration: '100s', size: 120, distance: 450, population: '1.1B Units',
      description: 'An ancient giant containing complex tonal structures.'
    }
  ];

  skillRegions: SkillRegion[] = [
    { title: 'Listening', description: 'Frequency Analysis', icon: 'ear-outline', color: 'linear-gradient(135deg, #00f3ff, transparent)', glow: '#00f3ff' },
    { title: 'Reading', description: 'Data Decryption', icon: 'book-outline', color: 'linear-gradient(135deg, #bc13fe, transparent)', glow: '#bc13fe' },
    { title: 'Speaking', description: 'Signal Broadcast', icon: 'mic-outline', color: 'linear-gradient(135deg, #00ff9d, transparent)', glow: '#00ff9d' },
    { title: 'Writing', description: 'Code Encoding', icon: 'create-outline', color: 'linear-gradient(135deg, #3273ff, transparent)', glow: '#3273ff' },
    { title: 'Vocabulary', description: 'Database Expansion', icon: 'flame-outline', color: 'linear-gradient(135deg, #ff2a6d, transparent)', glow: '#ff2a6d' },
    { title: 'Grammar', description: 'System Architecture', icon: 'bulb-outline', color: 'linear-gradient(135deg, #ffd800, transparent)', glow: '#ffd800' },
  ];

  techSpecs = [
    { title: 'Neural Engine', desc: 'AI that evolves with your retention speed.', icon: 'hardware-chip-outline' },
    { title: 'Live Sync', desc: 'Real-time syntax correction protocol.', icon: 'pulse-outline' },
    { title: 'Archives', desc: 'Access over 50,000 lexicon entries.', icon: 'library-outline' }
  ];

  masteryTiers = [
    { title: 'Ground Unit', level: 'Level A1 - A2', icon: 'person-outline', color: '#00f3ff', desc: 'Beginner access. You navigate the surface on foot, learning basic survival syntax.' },
    { title: 'Star Fighter', level: 'Level B1 - B2', icon: 'airplane-outline', color: '#bc13fe', desc: 'Intermediate access. You pilot your own vessel, capable of interplanetary travel and trade.' },
    { title: 'Mothership', level: 'Level C1 - C2', icon: 'star-outline', color: '#ffd700', desc: 'Supreme command. You control the central station and oversee the entire linguistic system.' }
  ];

  currentYear = new Date().getFullYear();

  constructor(private router: Router) {
    addIcons({planetOutline,arrowForwardOutline,chevronDownOutline,lockClosedOutline,arrowBack,chevronForwardOutline,rocketOutline,informationCircleOutline,codeWorkingOutline,shieldCheckmarkOutline,medalOutline,personOutline,airplaneOutline,starOutline,hardwareChipOutline,libraryOutline,pulseOutline,earOutline,bookOutline,micOutline,createOutline,flameOutline,bulbOutline});
  }

  ngOnInit() {
    this.initCanvas();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', this.handleResize);
  }

  ionViewDidEnter() {
    this.initScrollObserver();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.observer) this.observer.disconnect();
  }

  initScrollObserver() {
    if (this.observer) this.observer.disconnect();
    const options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, options);

    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(el => this.observer?.observe(el));
    }, 200);
  }

  // --- SOLUCIÓN DE SCROLL PARA IONIC ---
  scrollToSection(sectionId: string) {
    const performScroll = () => {
      const target = document.getElementById(sectionId);
      if (target && this.content) {
        // Obtenemos la posición Y del elemento
        const y = target.offsetTop - 80; // Restamos 80px para el header
        // Usamos el método nativo de Ionic para scroll suave
        this.content.scrollToPoint(0, y, 800);
      }
    };

    if (this.currentView !== 'universe') {
      this.returnToUniverse();
      setTimeout(performScroll, 300);
    } else {
      performScroll();
    }
  }

  selectPlanet(planet: Planet) {
    if (planet.status === 'locked') return;
    this.selectedPlanet = planet;
    this.currentView = 'planet-view';
    // Scroll al top usando Ionic
    this.content?.scrollToTop(500);
  }

  returnToUniverse() {
    this.currentView = 'universe';
    setTimeout(() => { 
      this.selectedPlanet = null; 
      setTimeout(() => this.initScrollObserver(), 100);
    }, 100);
  }

  enterRegion(region: SkillRegion) {
    if (region.title === 'Grammar') this.router.navigate(['/grammar']);
  }

  private initCanvas() {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.handleResize();
  }

  private createParticles() {
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  private animate = () => {
    if (!this.ctx || !this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = `rgba(200, 230, 255, ${p.opacity})`;
      this.ctx!.fill();
    });
    this.animationId = requestAnimationFrame(this.animate);
  };

  private handleResize = () => {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
}