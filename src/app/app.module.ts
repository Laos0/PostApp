import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { TestComponent } from './views/testViews/test/test.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/mains/home/home.component';
import { ErrorComponent } from './views/errorViews/error/error.component';
import { CommonModule } from '@angular/common';
import { PostComponent } from './views/mains/post/post.component';
import { PostDetailsComponent } from './views/mains/post-details/post-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ComfirmDeleteComponent } from './views/dialogs/comfirm-delete/comfirm-delete.component';
import { EditPostComponent } from './views/mains/edit-post/edit-post.component';
import {MatSelectModule} from '@angular/material/select';
import { GuardLogin } from './libs/guard-login';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ErrorComponent,
    PostComponent,
    PostDetailsComponent,
    ComfirmDeleteComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [GuardLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
