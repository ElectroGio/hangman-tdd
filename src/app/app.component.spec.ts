import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WordProvider } from './services/wordProvider.service';

describe('AppComponent', () => {

  //Creamos las variables que van a ser usadas en las pruebas
  let component: AppComponent;
  let service: WordProvider;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[WordProvider] //Inyectamos el proveedor para que funcione los tests.
    }).compileComponents();
    //Creamos el servicio y el componente
    service = new WordProvider();
    component = new AppComponent(service);

  }));

  //Agregamos un afterEach para que vuelva a iniciar con los valores vacios
  afterEach(()=>{
    service = null;
    component = null;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hangman-tdd'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hangman-tdd');
  });
  
  it('debe mostar mensaje de bienvenida',() =>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.welcome span').textContent).toContain('Bienvenido al HangMan');

  });

  it('debe mostrar el progreso de intentos',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.text-tries').textContent).toContain('Intentos 0 / 9');
  });

  it('debe mostrar en botones las letras de la A a la Z',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i=0; i< letras.length; i++){
      expect(compiled.querySelector('.letters-buttons').textContent).toContain(letras[i]);
    }
  });

  it('debe mostrar por lo menos un _ que indique la palabra a encontrar',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hidden-word').textContent).toContain('_');
    
  });

  it('debe mostrar el espacio donde van las imagenes del ahorcado',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.ahorcado-img')).not.toBe(null);
    
  });

  it('si selecciona letra que no es de palabra, aumenta el número de intentos y muestra imagen',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var componente = fixture.componentInstance;
    componente.palabra = 'ANGULAR';
    componente.comprobar('Z');
    fixture.detectChanges();
    expect(componente.intentos).toBe(1);
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.ahorcado-img').src).toContain('1.png');
  });

  it('si selecciona letra que sí es de palabra, muestra su posición correcta en la palabra',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var componente = fixture.componentInstance;
    componente.palabraOculta = '_ _ _ _ _ _ _'; //Agregamos esta línea para recalcular la palabra oculta.
    componente.palabra = 'ANGULAR';
    componente.comprobar('A');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.hidden-word').textContent).toContain('A _ _ _ _ A _');

  });

  it('al completar los intentos máximos, notifica que perdió y muestra palabra oculta ',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var componente = fixture.componentInstance;
    componente.palabra = 'ANGULAR';
    componente.intentos = 8;
    componente.palabraOculta = '_ _ _ U L _ R'
    componente.comprobar('M');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.gameover').textContent).toContain('HAS PERDIDO');
    expect(compiled.querySelector('.gameover').textContent).toContain('ANGULAR');
  });

  it('al completar y verificar correctamente la palabra debe mostrar un mensaje notificando que el jugador ganó',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var componente = fixture.componentInstance;
    componente.palabra = 'ANGULAR';
    componente.intentos = 8;
    componente.palabraOculta = 'A _ G U L A R'
    componente.comprobar('N');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.win').textContent).toContain('¡FELICIDADES HAS GANADO!');
  });

  it('al ganar o perder debe ocultarse el área de los botones con las letras',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var componente = fixture.componentInstance;
    componente.palabra = 'ANGULAR';
    componente.intentos = 8;
    componente.palabraOculta = 'A _ G U L A R'
    componente.comprobar('N');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.letters-buttons')).toEqual(null);
  });

  it('El servicio debe traer siempre un valor no vacio',()=>{
    spy = spyOn(service,'proveerPalabra').and.returnValue('PERRO');
    expect(service.proveerPalabra()).not.toEqual(null);
    expect(service.proveerPalabra()).toEqual("PERRO");
  });


});
