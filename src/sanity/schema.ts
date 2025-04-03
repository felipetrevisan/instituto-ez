import { type SchemaTypeDefinition } from "sanity";

import testimonial from "./schemas/testimonials";
import workshop from "./schemas/workshops";
import training from "./schemas/training";
import services from "./schemas/services";
import immersion from "./schemas/immersion";
import mathematizer from "./schemas/mathematizer";
import lecture from "./schemas/lecture";
import advancedMentory from "./schemas/advanced-mentory";

import settings from "./schemas/settings";
import banner from "./schemas/banner";

import navigation from "./schemas/navigation";
import page from "./schemas/page";

import navigationItem from "./schemas/objects/navigation-item";
import navigationSubmenuItem from "./schemas/objects/navigation-submenu-item";
import socialNetworksItem from "./schemas/objects/social-networks-item";
import link from "./schemas/objects/link";
import pageSection from "./schemas/objects/page";
import button from "./schemas/objects/button";
import aboutCard from "./schemas/objects/about-card";
import ribbon from "./schemas/objects/ribbon";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settings,
    testimonial,
    workshop,
    training,
    services,
    immersion,
    advancedMentory,
    mathematizer,
    lecture,
    banner,

    page,

    navigation,
    navigationItem,
    navigationSubmenuItem,
    socialNetworksItem,
    link,
    button,
    ribbon,
    pageSection,
    aboutCard
  ],
};
