export type OSDUField = {
  /* Describes the property */
  description: string;
  /* Used as the form field label */
  title: string;
  /* Used to determine type of form field. */
  type: string;
  /* Used in validation. */
  pattern?: string;
  /* To aid the user in how th attribute is built. */
  example?: string;
  format?: string;
};
