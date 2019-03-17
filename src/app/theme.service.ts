import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as Color from 'color';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Override all global variables with a new theme
  setTheme(theme: Themes) {
    // console.log('setting theme', theme);
    const cssText = CSSTextGenerator(themes[theme]);
    this.document.documentElement.style.cssText = cssText;
  }
}

export type Themes = "light" | "dark" | "sepia" | "solarized_dark" | "solarized_light";

const defaultTheme = {
  primary: '#c7c7c7',
  secondary: '#B9BCBF',
  tertiary: '#DEE0E1',
  dark: '#c7c7c7',
  medium: '#ffffff',
  light: '#61676C'
};




const themes = {
  light: defaultTheme,
  dark: {
    primary: '#a9a9a9',
    secondary: '#ebebeb',
    tertiary: '#c0c0c0',
    dark: '#000000',
    medium: '#0F1419',
    light: '#BFBAB0'
  },
  // https://github.com/gerardbm/sublime-atomic-scheme
  sepia: {
    primary: '#13AFAF',
    secondary: '#8d815c',
    tertiary: '#D3CDBB',
    dark: '#ccc4ad',
    medium: '#EFE6C9',
    light: '#554D37'
  },
  // https://github.com/braver/Solarized
  solarized_dark: {
    secondary: '#586e75',
    tertiary: '#657b83',
    dark: '#002b36',
    medium: '#002b36',
    light: '#839496'
  },
  solarized_light: {
    primary: '#93a1a1',
    secondary: '#eee8d5',
    tertiary: '#fdf6e3',
    dark: '#657b83',
    medium: '#fdf6e3',
    light: '#839496'
  },
};

function CSSTextGenerator(colors) {
  colors = { ...defaultTheme, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
    --ion-color-base: ${medium};
    --ion-color-contrast: ${dark};
    --ion-background-color: ${medium};
    --ion-text-color: ${light};
    --ion-toolbar-background-color: ${contrast(medium, 0.1)};
    --ion-toolbar-text-color: ${contrast(light, 0.1)};
    --ion-item-background-color: ${contrast(medium, 0.3)};
    --ion-item-text-color: ${contrast(dark, 0.3)};

    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 56,128,255;
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: 255,255,255;
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
    --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};

    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: 12,209,232;
    --ion-color-secondary-contrast: ${contrast(secondary)};
    --ion-color-secondary-contrast-rgb: 255,255,255;
    --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
    --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};

    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: 112,68,255;
    --ion-color-tertiary-contrast: ${contrast(tertiary)};
    --ion-color-tertiary-contrast-rgb: 255,255,255;
    --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
    --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};

    --ion-color-success: ${success};
    --ion-color-success-rgb: 16,220,96;
    --ion-color-success-contrast: ${contrast(success)};
    --ion-color-success-contrast-rgb: 255,255,255;
    --ion-color-success-shade: ${Color(success).darken(shadeRatio)};
    --ion-color-success-tint: ${Color(success).lighten(tintRatio)};

    --ion-color-warning: ${warning};
    --ion-color-warning-rgb: 255,206,0;
    --ion-color-warning-contrast: ${contrast(warning)};
    --ion-color-warning-contrast-rgb: 255,255,255;
    --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
    --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};

    --ion-color-danger: ${danger};
    --ion-color-danger-rgb: 245,61,61;
    --ion-color-danger-contrast: ${contrast(danger)};
    --ion-color-danger-contrast-rgb: 255,255,255;
    --ion-color-danger-shade: ${Color(danger).darken(shadeRatio)};
    --ion-color-danger-tint: ${Color(danger).lighten(tintRatio)};

    --ion-color-dark: ${dark};
    --ion-color-dark-rgb: 34,34,34;
    --ion-color-dark-contrast: ${contrast(dark)};
    --ion-color-dark-contrast-rgb: 255,255,255;
    --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
    --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};

    --ion-color-medium: ${medium};
    --ion-color-medium-rgb: 152,154,162;
    --ion-color-medium-contrast: ${contrast(medium)};
    --ion-color-medium-contrast-rgb: 255,255,255;
    --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
    --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};

    --ion-color-light: ${light};
    --ion-color-light-rgb: 244,244,244;
    --ion-color-light-contrast: $${contrast(light)};
    --ion-color-light-contrast-rgb: 0,0,0;
    --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
    --ion-color-light-tint: ${Color(light).lighten(tintRatio)};`;
}

function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}
