import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { LucideAngularModule } from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(LucideAngularModule)],
}).catch(err => console.error(err));
