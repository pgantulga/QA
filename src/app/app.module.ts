import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { AngularFireModule} from '@angular/fire';
import { environment} from '../environments/environment';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AdminGuard} from './services/auth-guard.service';
import { SnackComponent } from './shared/components/snack/snack.component';
import { MdModule} from './shared/md.module';
import { ShellComponent } from './shell/shell.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        // AdminComponent,
        // HeaderComponent,
        // PostAddComponent,
        SnackComponent,
        // PostDetailComponent,
        // CommentAddComponent,
        // AnswerAddComponent,
        // AnswerListComponent,
        // VoteButtonComponent,
        // UserProfileComponent,
        ShellComponent,
        // TagAddComponent,
        // TagsComponent,
        // PostListSidenavComponent,
        // TagItemComponent,
        // TopBannerComponent,
        // FooterComponent,
        // TagSelectComponent,
        // TagDetailComponent,
        // DetailHeaderComponent,
        // PostListGhostComponent,
        // TagUpdateComponent,
        // RegisterComponent,
        // LayoutOneComponent,
        // LayoutTwoComponent,
        // LayoutThreeComponent,
        // ProfileHeaderComponent,
        // UserDetailComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        LayoutModule,
        MatSnackBarModule,
        MatSidenavModule,
        MdModule,
        FlexLayoutModule,
        // ReactiveFormsModule,
        // QuillModule.forRoot(),
        // MatTableModule,
        // MatSelectModule,
        // MatGridListModule,
        // MatPaginatorModule,
        // MatProgressSpinnerModule,
        // MatAutocompleteModule,
    ],
    providers: [AdminGuard],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
