import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardResellerComponent } from './board-reseller.component';

describe('BoardResellerComponent', () => {
  let component: BoardResellerComponent;
  let fixture: ComponentFixture<BoardResellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardResellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
