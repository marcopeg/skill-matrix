import { PageWrapper } from "./PageWrapper";

export const layout = () => {
  return [
    {
      target: "$REACT_ROOT_WRAPPER",
      handler: { component: PageWrapper }
    }
  ];
};
