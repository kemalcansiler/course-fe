import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { UserMenu } from './user-menu';
import { User } from '../../../core/models/user.model';

describe('UserMenu Component', () => {
  let component: UserMenu;
  let fixture: ComponentFixture<UserMenu>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profileImageUrl: 'avatar.jpg',
    dateOfBirth: null,
    bio: null,
    createdAt: new Date().toISOString()
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: new Subject()
    });
    routerSpy.createUrlTree.and.returnValue({} as any);
    routerSpy.serializeUrl.and.returnValue('/');

    await TestBed.configureTestingModule({
      imports: [
        UserMenu,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(UserMenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.user-menu-button');
    
    // Name should be in the button
    expect(button?.textContent).toContain('John');
    expect(button?.textContent).toContain('Doe');
    
    expect(component.user()).toEqual(mockUser);
  });

  it('should display user avatar', () => {
    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.user-avatar');
    
    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute('src')).toBe('avatar.jpg');
  });

  it('should use default avatar when no profile image', () => {
    const userWithoutAvatar: User = {
      ...mockUser,
      profileImageUrl: null
    };

    fixture.componentRef.setInput('user', userWithoutAvatar);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.user-avatar');
    
    expect(avatar.getAttribute('src')).toBe('default-avatar.svg');
  });

  it('should emit profile click and navigate', () => {
    spyOn(component.profileClick, 'emit');

    component.onProfileClick();

    expect(component.profileClick.emit).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should emit logout click', () => {
    spyOn(component.logoutClick, 'emit');

    component.onLogoutClick();

    expect(component.logoutClick.emit).toHaveBeenCalled();
  });

  it('should render menu items', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('mat-menu')).toBeTruthy();
  });
});

