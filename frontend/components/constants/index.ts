import tailwindDefaultTheme from 'tailwindcss/defaultTheme';
export const RouteEnum = {
  HOME: '/',
  DASHBOARD: '/appmain',
  DOCUMENTATION: '/',
};

export const DateFormatEnum = {
  FORMAT: "dd-MM-yyyy",
  SPACE_dd_MMM_yyyy: "dd MMMM yyyy",
  HYPHEN_dd_MM_yyyy: "dd-MM-yyyy",
  HYPHEN_MM_dd_yyyy: "MM-ddd-yyyy",
};

export const DateLocaleEnum = {
  LOCALE: "en",
};

export const buildString = (start: string, spread: string, repeat: number) => {
  return `${start}${spread.repeat(repeat)}`;
}

export const MediaQueryBreakpointEnum = {
  '2xl': `(min-width: ${tailwindDefaultTheme.screens['2xl']})`,
  lg: `(min-width: ${tailwindDefaultTheme.screens.lg})`,
  md: `(min-width: ${tailwindDefaultTheme.screens.md})`,
  sm: `(min-width: ${tailwindDefaultTheme.screens.sm})`,
  xl: `(min-width: ${tailwindDefaultTheme.screens.xl})`,
};

export const DrawerStateEnum = {
  EDIT: 'EDIT',
  ADD: 'ADD',
  PREVIEW: 'PREVIEW',
};

export const defaultGlobalConfirmDialogOptions = {
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  confirmButtonProps: {
    color: 'inherit',
  },
  cancelButtonProps: {
    color: 'error',
    autoFocus: true,
  },
};

export const APP_SIDE_MENU_WIDTH = 270;
export const CATEGORIES = [
  'DESIGN',
  'FRONTEND',
  'BACKEND',
  'CONTENT',
  'MODERATOR',
  'AMBASSADOR',
  'HEALTH',
  'ART',
  'COPYWRITING',
  'EDITING',
  'PHOTOSHOP',
  'ADOBE',
  'WEB3',
  'SMARTCONTRACTS',
  'INSTRUCTOR',
  'BUSINESS',
  'FINANCE',
]

export function capitalize(s: string | any[]) {
  return s && s[0].toUpperCase() + s.slice(1);
}

