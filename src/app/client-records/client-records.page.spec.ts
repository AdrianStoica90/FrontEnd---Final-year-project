import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientRecordsPage } from './client-records.page';

describe('ClientRecordsPage', () => {
  let component: ClientRecordsPage;
  let fixture: ComponentFixture<ClientRecordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRecordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
