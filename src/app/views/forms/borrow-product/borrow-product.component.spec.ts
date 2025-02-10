import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowProductComponent } from './borrow-product.component';

describe('BorrowProductComponent', () => {
  let component: BorrowProductComponent;
  let fixture: ComponentFixture<BorrowProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
