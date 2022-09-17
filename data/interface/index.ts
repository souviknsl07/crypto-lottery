export interface IRowStackProps {
  direction: "row" | "row-reverse" | "column" | "column-reverse" | undefined;
  alignItems?: string;
  justifyContent?: string;
}

export interface IRenderer {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
