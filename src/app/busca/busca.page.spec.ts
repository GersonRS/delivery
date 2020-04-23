import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscaPage } from './busca.page';

describe('BuscaPage', () => {
  let component: BuscaPage;
  let fixture: ComponentFixture<BuscaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
