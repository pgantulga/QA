import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject, ErrorHandler } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { ShellComponent } from './shell/shell.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAnalyticsModule, DEBUG_MODE, ScreenTrackingService } from '@angular/fire/analytics';
import { environment} from '../environments/environment';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AuthGuard} from './services/auth-guard.service';
import { SnackComponent } from './shared/components/snack/snack.component';
import { BottomSheetComponent } from './shared/bottom-sheet/bottom-sheet.component';
import { MdModule} from './shared/md.module';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {AdminGuard} from './admin/admin-guard.service';
import {PostGuardService} from './post/post-guard.service';
import {ModeratorGuard} from './moderator/moderator-guard.service';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AppErrorHandler} from './shared/app-error-handler';

@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        SnackComponent,
        ShellComponent,
        BottomSheetComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AppRoutingModule,
        LayoutModule,
        MdModule,
        FlexLayoutModule,
        AngularFireMessagingModule,
        HttpClientModule,
        QuillModule.forRoot({
            suppressGlobalRegisterWarning: true
        })
    ],
    providers: [
        ScreenTrackingService,
        MatIconRegistry,
        AdminGuard,
        AuthGuard,
        ModeratorGuard,
        PostGuardService,
        {provide: ErrorHandler, useClass: AppErrorHandler},
        {provide: DEBUG_MODE, useValue: true},
        {
            provide: 'windowObject',
            useFactory: () => {
                return window;
            }
        }
        // {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        // tslint:disable-next-line: ban-types
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string
      ) {
        const platform = isPlatformBrowser(platformId) ?
          'in the browser' : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
      }
}
