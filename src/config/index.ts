import { Gradient } from "@motion-canvas/2d";

export const colors = {
  primary: "#12C2E9",
  secondary: "#C471ED",
  tertiary: "#F64F59",

  base: "#222222",
  surface: "#282828",
  overlay: "#323232",

  text_base: "#555555",
  text_surface: "#999999",
  text_overlay: "#cccccc",
  text_white: "#ffffff",
};

export const sizes = {
  sm: 24,
  md: 30,
  lg: 36,
  xl: 40,
  "2xl": 48,
  "3xl": 64,
  ul: 96,
};

export const gradient = new Gradient({
  from: -360,
  to: 360,
  stops: [
    { offset: 0, color: colors["primary"] },
    { offset: 0.5, color: colors["secondary"] },
    { offset: 1, color: colors["tertiary"] },
  ],
});

export const primaryFadeGradient = new Gradient({
  from: -360,
  to: 360,
  stops: [
    { offset: 0, color: colors["primary"] },
    { offset: 0.7, color: "#00000000" },
  ],
});
