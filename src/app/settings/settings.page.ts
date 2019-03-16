import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HnSettings, HnSettingsService } from '../datastore/settings.service';
import { ThemeDefault, ThemeService } from '../theme.service';
import { ToastService } from '../toast/toast.service';

const themes = {
  dark: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  light: ThemeDefault
};

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {

  settings$: Observable<HnSettings>

  constructor(
    private themeService: ThemeService,
    private settingsService: HnSettingsService,
    private toaster: ToastService
  ) {
  }

  ngOnInit() {
    this.settings$ = this.settingsService.get();
  }
  
  onThemeChange(event) {
    this.settings$.pipe(
      map(settings => {
        settings.theme = event.target.value;
        return settings;
      }),
      tap(settings => this.settingsService.set(settings)),
      tap(settings => this.themeService.setTheme(themes[settings.theme]))
    ).subscribe(() => this.presentSaveToast())
  }

  presentSaveToast() {
    this.toaster.present({
      message: 'Saved',
      duration: 1000,
      showCloseButton: true
    })
  }
}
