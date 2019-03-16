import { Component } from '@angular/core';
import { ThemeDefault, ThemeService } from '../theme.service';

const themes = {
  'dark': {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  'light': ThemeDefault
};

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {

  currTheme: string;

  constructor(
    private theme: ThemeService
  ) {

    if (!this.currTheme) this.currTheme = 'light';

  }

  onThemeChange(event) {
    console.log(event.target.value);
    this.theme.setTheme(themes[event.target.value]);
  }
}
