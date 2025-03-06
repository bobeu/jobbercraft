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


// export function debounce<C>(callback: C, wait: number = 0): C & { flush: Function; cancel: Function; } {
//   let debounceTimer: string | number | NodeJS.Timeout | undefined;
//   let triggerArgs: any[];
//   let triggerThis: any;

//   function trigger(...arg: any[]) {
//     triggerArgs = arg;
//     triggerThis = this;
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(() => {
//       callback.apply(triggerThis, triggerArgs);
//     }, wait);
//   }

//   trigger.cancel = () => clearTimeout(debounceTimer);
//   trigger.flush = () => {
//     clearTimeout(debounceTimer);
//     callback.apply(triggerThis, triggerArgs);
//   };

//   return trigger;
// }

// export function throttle(callback: { apply: (arg0: any, arg1: any) => void; }, wait = 0) {
//   let throttleTimer: number | boolean | undefined;
//   let triggerArgs: IArguments;
//   let triggerThis: any;
//   function trigger(this: any) {
//     triggerArgs = arguments;
//     triggerThis = this;
//     if (throttleTimer) return;
//     throttleTimer = true;
//     setTimeout(() => {
//       callback.apply(triggerThis, triggerArgs);
//       throttleTimer = false;
//     }, wait);
//   }

//   trigger.cancel = () => clearTimeout(throttleTimer);
//   trigger.flush = () => {
//     clearTimeout(throttleTimer);
//     callback.apply(triggerThis, triggerArgs);
//   };

//   return trigger;
// }

export function capitalize(s: string | any[]) {
  return s && s[0].toUpperCase() + s.slice(1);
}

