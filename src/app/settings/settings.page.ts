import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HnSettings, HnSettingsService } from '../datastore/settings.service';
import { ThemeService } from '../theme.service';
import { ToastService } from '../toast/toast.service';

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
      tap(settings => this.settingsService.set(settings).subscribe(() => { })),
      tap(settings => this.themeService.setTheme(settings.theme))
    ).subscribe(() => this.presentSaveToast())
  }

  presentSaveToast() {
    this.toaster.present({
      duration: 1000,
      message: 'Saved Settings',
      position: 'middle',
      showCloseButton: true,
    })
  }
}
