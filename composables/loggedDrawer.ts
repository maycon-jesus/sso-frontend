export const useLoggedDrawer = () =>
  useState("loggedDrawer", () => ({
    open: false,
  }));
