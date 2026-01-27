import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonHeader, IonToolbar, IonButton, IonBadge, ViewDidEnter, IonPopover, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  planetOutline, rocketOutline, lockClosedOutline, arrowBack, 
  informationCircleOutline, codeWorkingOutline, 
  shieldCheckmarkOutline, medalOutline, personOutline, airplaneOutline,
  starOutline, arrowForwardOutline, chevronDownOutline,
  hardwareChipOutline, libraryOutline, pulseOutline, earOutline, bookOutline, micOutline, 
  createOutline, flameOutline, bulbOutline, volumeHighOutline, volumeMuteOutline,
  logoInstagram, logoFacebook, logoTiktok, checkmarkCircleOutline, trophyOutline, infiniteOutline, chevronForwardOutline 
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
  imports: [CommonModule, IonContent, IonIcon, IonHeader, IonToolbar, IonButton, IonBadge, IonPopover, IonList, IonItem, IonLabel], 
})
export class HomePage implements OnInit, OnDestroy, ViewDidEnter {
  protected readonly Math = Math;
  currentView: 'universe' | 'planet-view' = 'universe';
  selectedPlanet: Planet | null = null;

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('popover') popover: any; 
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D | null;
  private particles: any[] = [];
  private animationId!: number;
  private observer: IntersectionObserver | null = null;

  // --- DATOS ---
  planets: Planet[] = [
    {
      id: 'english', name: 'ENGLISH', type: 'Primary Core', status: 'active', color: '#00f3ff', 
      orbitDuration: '50s', size: 130, distance: 240, // Distancia equilibrada
      population: '1.5B Speakers',
      description: 'The dominant language for global business, technology, and science. Focus on professional fluency and technical lexicon.'
    },
    {
      id: 'spanish', name: 'SPANISH', type: 'Expansion World', status: 'locked', color: '#ff9d00', 
      orbitDuration: '80s', size: 100, distance: 380, // Distancia equilibrada
      population: '580M Speakers',
      description: 'Second most spoken native language worldwide. Focus on rapid conversation, diverse dialects, and cultural immersion.'
    }
  ];

  skillRegions: SkillRegion[] = [
    { title: 'Listening', description: 'Frequency Analysis', icon: 'ear-outline', color: '#00f3ff', glow: '#00f3ff' },
    { title: 'Reading', description: 'Data Decryption', icon: 'book-outline', color: '#bc13fe', glow: '#bc13fe' },
    { title: 'Speaking', description: 'Signal Broadcast', icon: 'mic-outline', color: '#00ff9d', glow: '#00ff9d' },
    { title: 'Writing', description: 'Code Encoding', icon: 'create-outline', color: '#3273ff', glow: '#3273ff' },
    { title: 'Vocabulary', description: 'Database Expansion', icon: 'flame-outline', color: '#ff2a6d', glow: '#ff2a6d' },
    { title: 'Grammar', description: 'System Architecture', icon: 'bulb-outline', color: '#ffd800', glow: '#ffd800' },
  ];

  benefits = [
    { title: 'Immersive Learning', desc: 'Forget static text. Learn by navigating a living ecosystem.', icon: 'infinite-outline' },
    { title: 'Gamified Progress', desc: 'Earn ranks and unlock regions as you master new skills.', icon: 'trophy-outline' },
    { title: 'Native Context', desc: 'Real-world scenarios designed for immediate application.', icon: 'checkmark-circle-outline' }
  ];

  socialLinks = [
    { name: 'Instagram', handle: '@AetherLexics', icon: 'logo-instagram', color: '#E1306C', url: '#' },
    { name: 'Facebook', handle: 'Aether Lexics Official', icon: 'logo-facebook', color: '#1877F2', url: '#' },
    { name: 'TikTok', handle: '@Aether_Lexics', icon: 'logo-tiktok', color: '#00f2ea', url: '#' }
  ];

  currentYear = new Date().getFullYear();

  constructor(private router: Router) {
    addIcons({planetOutline,chevronDownOutline,arrowForwardOutline,lockClosedOutline,arrowBack,chevronForwardOutline,rocketOutline,informationCircleOutline,codeWorkingOutline,shieldCheckmarkOutline,medalOutline,personOutline,airplaneOutline,starOutline,hardwareChipOutline,libraryOutline,pulseOutline,earOutline,bookOutline,micOutline,createOutline,flameOutline,bulbOutline,volumeHighOutline,volumeMuteOutline,logoInstagram,logoFacebook,logoTiktok,checkmarkCircleOutline,trophyOutline,infiniteOutline});
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

  navigateToPlanetFromMenu(planet: Planet) {
    if (planet.status === 'locked') return; 
    this.popover.dismiss(); 
    this.selectedPlanet = planet;
    this.currentView = 'planet-view';
    this.content?.scrollToTop(0);
  }

  scrollToSection(sectionId: string) {
    const performScroll = () => {
      const target = document.getElementById(sectionId);
      if (target && this.content) {
        const y = target.offsetTop - 80;
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
    for (let i = 0; i < 120; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
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
      this.ctx!.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
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