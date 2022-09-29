import { HTMLAttributes } from ".";

export interface LabelHTMLAttributes extends HTMLAttributes {
  form?: string | undefined;
  for?: string | undefined;

  /// TODO: for React
  /// htmlFor?: string | undefined;
}
