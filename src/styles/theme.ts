const color = {
  black: "#000000",
  white: "#ffffff",
};

const seatBackgroundColor = {
  general: "#12a89b",
  handicap: "#07c400",
  sale: "#e30101",
  disabled: "#d3d3d3;",
  clicked: "#0091ff",
};

export const theme = {
  color,
  seatBackgroundColor,
};

export type Theme = typeof theme;
