import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer Component', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer content', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('footer')).toBeTruthy();
  });

  it('should display copyright text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('©');
    expect(compiled.textContent).toContain('Course App');
  });
});

