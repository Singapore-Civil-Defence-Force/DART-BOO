import { SET_CURSOR_POSITION, SET_MOUSE_DOWN } from "./types";

//Basic syntax of a function.
export const setCursorPosition = (position) => {
  return {
    type: SET_CURSOR_POSITION,
    payload: position,
  };
};

export const setMouseDown = (bool) => {
  return {
    type: SET_MOUSE_DOWN,
    payload: bool,
  };
};
