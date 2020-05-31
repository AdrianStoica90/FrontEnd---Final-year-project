import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanReportsPage } from './scan-reports.page';

describe('ScanReportsPage', () => {
  let component: ScanReportsPage;
  let fixture: ComponentFixture<ScanReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
