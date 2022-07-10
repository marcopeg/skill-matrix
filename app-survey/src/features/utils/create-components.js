import { createElement } from "react";

// TODO: wrap with error boundry?
// TODO: what if it's an element?
export const createComponents = (items) =>
  items
    ? items.map((item, key) =>
        createElement(item.component, {
          ...item.props,
          key
        })
      )
    : null;
