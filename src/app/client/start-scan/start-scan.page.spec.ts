import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartScanPage } from './start-scan.page';

describe('StartScanPage', () => {
  let component: StartScanPage;
  let fixture: ComponentFixture<StartScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
