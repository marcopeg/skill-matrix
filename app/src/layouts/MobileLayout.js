import React from "react";
import { Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";

import ProjectsList from "../views/ProjectsList";
import MobileProject from "./MobileProject";
import PageNotFoundView from "../views/PageNotFoundView";

const MobileLayout = () => (
  <IonRouterOutlet>
    <Route exact path="/" component={ProjectsList} />
    <Route path="/p/:projectId" component={MobileProject} />
    <Route path="" component={PageNotFoundView} />
  </IonRouterOutlet>
);

export default MobileLayout;
