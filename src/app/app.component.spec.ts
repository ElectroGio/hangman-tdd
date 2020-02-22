import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WordProvider } from './services/wordProvider.service';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, AuthService } from 'angularx-social-login';

describe('AppComponent', () => {
  // Creamos las variables que van a ser usadas en las pruebas
  let component: AppComponent;
  let service: WordProvider;
  let authService: AuthService;
  let spy: any;

  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('112469726860732')
    }
  ]);

  function provideConfig() {
    return config;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [WordProvider, AuthService,
        {
          provide: AuthServiceConfig,
          useFactory: provideConfig
        }] // Inyectamos el proveedor para que funcione los tests.
    }).compileComponents();
    // Creamos el servicio y el componente
    service = new WordProvider();
    component = new AppComponent(service, authService);
  }));

  // Agregamos un afterEach para que vuelva a iniciar con los valores vacios
  afterEach(() => {
    service = null;
    component = null;
    authService = null;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title \'hangman-tdd1\'', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hangman-tdd');
  });

  it('should show the welcome message', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.welcome span').textContent).toContain('Bienvenido al HangMan');
  });

  it('should show the tries', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.text-tries').textContent).toContain('Intentos 0 / 9');
  });

  it('should show buttons with the A-Z letters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'];

    for (const letter of letters) {
      expect(compiled.querySelector('.letters-buttons').textContent).toContain(letter);
    }
  });

  it('should show at least one _ indicating the word to find', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hidden-word').textContent).toContain('_');
  });

  it('should show the space where the hanged images go', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hangman-img')).not.toBe(null);
  });

  it('should increase the number of attempts and display image if a letter that is not in the word is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const actualComponent = fixture.componentInstance;
    actualComponent.word = 'ANGULAR';
    actualComponent.verify('Z');
    fixture.detectChanges();
    expect(actualComponent.tries).toBe(1);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hangman-img').src).toContain('1.png');
  });

  it('should show the letter in the correct position if the letter is in the word', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const actualComponent = fixture.componentInstance;
    actualComponent.hiddenWord = '_ _ _ _ _ _ _'; // Agregamos esta línea para recalcular la palabra oculta.
    actualComponent.word = 'ANGULAR';
    actualComponent.verify('A');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hidden-word').textContent).toContain('A _ _ _ _ A _');
  });

  it('should show a game over message and the correct word, if tries is at max', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const actualComponent = fixture.componentInstance;
    actualComponent.word = 'ANGULAR';
    actualComponent.tries = 8;
    actualComponent.hiddenWord = '_ _ _ U L _ R';
    actualComponent.verify('M');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.gameover').textContent).toContain('HAS PERDIDO');
    expect(compiled.querySelector('.gameover').textContent).toContain('ANGULAR');
  });

  it('should show a win message when the hidden word is equals to word', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const actualComponent = fixture.componentInstance;
    actualComponent.word = 'ANGULAR';
    actualComponent.tries = 8;
    actualComponent.hiddenWord = 'A _ G U L A R';
    actualComponent.verify('N');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.win').textContent).toContain('¡FELICIDADES HAS GANADO!');
  });

  it('should hide the buttons area if the user won or lost', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const actualComponent = fixture.componentInstance;
    actualComponent.word = 'ANGULAR';
    actualComponent.tries = 8;
    actualComponent.hiddenWord = 'A _ G U L A R';
    actualComponent.verify('N');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.letters-buttons')).toEqual(null);
  });

  it('should always get a value when the service is called', () => {
    spy = spyOn(service, 'getNewWord').and.returnValue('PERRO');
    expect(service.getNewWord()).not.toEqual(null);
    expect(service.getNewWord()).toEqual('PERRO');
  });
});
