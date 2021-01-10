import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { AngularFireModule} from '@angular/fire';
import { environment} from '../environments/environment';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AuthGuard} from './services/auth-guard.service';
import { SnackComponent } from './shared/components/snack/snack.component';
import { MdModule} from './shared/md.module';
import { ShellComponent } from './shell/shell.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AdminGuard} from './admin/admin-guard.service';
import {ModeratorGuard} from "./moderator/moderator-guard.service";
@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        SnackComponent,
        ShellComponent,
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
    ],
    providers: [AdminGuard, AuthGuard, ModeratorGuard],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
