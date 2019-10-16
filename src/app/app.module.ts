import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectModule } from 'ng-select';
import { TagInputModule } from 'ngx-chips';

import { reducer } from './store/root.reducer';
import { routing } from './app.routing';

// Effects
import { SpinnerEffects } from './components/shared/spinner/spinner.effects';
import { LoginEffects } from './components/auth/login/login.effects';
import { HomeEffects } from './components/home/home.effects';
import { HomeAddEffects } from './components/home/home-add-popup/home-add-popup.effects';
import { ItemEffects } from './components/item/item.effects';
import { ItemAddEffects } from './components/item/item-add-popup/item-add-popup.effects';
import { ExpressionEffects } from './components/expression/expression.effects';
import { ExpressionAddEffects } from './components/expression/expression-add-popup/expression-add-popup.effects';

// Guards
import { AuthenticatedUserGuard } from './guards/authenticated-user';

// Directives
import { AutofocusDirective } from './directives/autofocus.directive';

// Services
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ItemService } from './services/item.service';
import { ExpressionService } from './services/expression.service';
import { SynonymService } from './services/synonym.service';

// Components
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { HomeDeleteConfirmComponent } from './components/home/home-delete-confirm/home-delete-confirm.component';
import { HomeAddPopupComponent } from './components/home/home-add-popup/home-add-popup.component';
import { ItemComponent } from './components/item/item.component';
import { ItemDeleteConfirmComponent } from './components/item/item-delete-confirm/item-delete-confirm.component';
import { ItemAddPopupComponent } from './components/item/item-add-popup/item-add-popup.component';
import { ExpressionComponent } from './components/expression/expression.component';
import { ExpressionDeleteConfirmComponent } from './components/expression/expression-delete-confirm/expression-delete-confirm.component';
import { ExpressionAddPopupComponent } from './components/expression/expression-add-popup/expression-add-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    HomeDeleteConfirmComponent,
    HomeAddPopupComponent,
    AutofocusDirective,
    ItemComponent,
    ItemDeleteConfirmComponent,
    ItemAddPopupComponent,
    ExpressionComponent,
    ExpressionDeleteConfirmComponent,
    ExpressionAddPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    routing,
    BrowserAnimationsModule,
    TagInputModule,
    BusyModule,
    Ng2PageScrollModule,
    HttpInterceptorModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    EffectsModule.run(SpinnerEffects),
    EffectsModule.run(LoginEffects),
    EffectsModule.run(HomeEffects),
    EffectsModule.run(HomeAddEffects),
    EffectsModule.run(ItemEffects),
    EffectsModule.run(ItemAddEffects),
    EffectsModule.run(ExpressionEffects),
    EffectsModule.run(ExpressionAddEffects),
  ],
  providers: [
    AuthService,
    AuthenticatedUserGuard,
    CategoryService,
    ItemService,
    ExpressionService,
    SynonymService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
