declare module '*.svg' {

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}
