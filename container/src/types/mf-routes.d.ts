declare module "dashboard/AppRoutesAsChild" {
  interface AppProps {
    standalone?: boolean;
  }
  const component: React.ComponentType<AppProps>;
  export default component;
}

declare module "cart/AppRoutesAsChild" {
  interface AppProps {
    standalone?: boolean;
  }
  const component: React.ComponentType<AppProps>;
  export default component;
}
