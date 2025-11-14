// Module Federation type declarations for UI remote
declare module "ui/styles" {
  interface UITheme {
    primary: string;
    dangerColor: string;
    textPrimary: string;
    borderColor: string;
    white: string;
  }

  interface UIStyles {
    theme: UITheme;
    loaded: boolean;
  }

  const styles: UIStyles;
  export const theme: UITheme;
  export default styles;
}

declare module "ui/LookInput" {
  import React from "react";
  const LookInput: React.ComponentType<Record<string, unknown>>;
  export default LookInput;
}

declare module "ui/LookSelect" {
  import React from "react";
  const LookSelect: React.ComponentType<Record<string, unknown>>;
  export default LookSelect;
}

declare module "ui/Button" {
  import React from "react";
  const Button: React.ComponentType<Record<string, unknown>>;
  export default Button;
}
