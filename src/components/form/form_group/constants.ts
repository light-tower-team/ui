import { Ref } from "vue";

export const FORM_GROUP_SYMBOL = Symbol("form_group_symbol");

export interface FormGroup {
  inputId?: string | undefined;
  descId?: string | undefined;
  optional?: Readonly<Ref<boolean>>;
  invalid?: Readonly<Ref<boolean>>;
}
