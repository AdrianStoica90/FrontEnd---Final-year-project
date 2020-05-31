import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinishScanPage } from './finish-scan.page';

describe('FinishScanPage', () => {
  let component: FinishScanPage;
  let fixture: ComponentFixture<FinishScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
