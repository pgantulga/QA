import { MdModule } from "./../shared/md.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { LayoutModule } from "../layout/layout.module";
import { SelectCategoryComponent } from "./select-category/select-category.component";
import { TagModule } from "../tag/tag.module";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { SharedModule } from "../shared/shared.module";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { EmailVerifyComponent } from "./email-verify/email-verify.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ProfileSettingsComponent,
    SelectCategoryComponent,
    NotificationsComponent,
    NotificationListComponent,
    PasswordResetComponent,
    EmailVerifyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MdModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    TagModule,
    SharedModule,
  ],
})
export class AuthModule {}
