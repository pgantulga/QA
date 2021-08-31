import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
