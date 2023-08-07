import { Hours } from "@yext/search-headless-react";
import { DirectoryParent } from "./DirectoryParent";
import { Coordinate } from "../components/google-map/SearchProvider";
import { AddressType } from "@yext/pages/components";
import { DirectoryChild } from "./DirectoryChild";
import { E164Number } from "libphonenumber-js/types";

export type MapTypes = "google" | "mapbox";
export type AutocompleteTypes = "google" | "mapbox" | "yext";
export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
  url: string;
  alternateText?: string;
}
export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}
export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}


export interface SiteData {
  map(arg0: (e: HeaderNavigation, i: number) => JSX.Element): import("react").ReactNode;
  meta: EntityMeta;
  image: Image;
  c_logo: ComplexImage;
  c_footerIcons?: ComplexImage[];
  c_callUs: string;
  navLink: {
    map(arg0: (e: HeaderNavigation, i: number) => JSX.Element): import("react").ReactNode;
    uRL: string;
    label: string;
  };
  c_locationFood: {
    map(arg0: (e: HeaderNavigation, i: number) => JSX.Element): import("react").ReactNode;
    uRL: string;
    label: string;
  };
  c_locationFurnal: {
    map(arg0: (e: HeaderNavigation, i: number) => JSX.Element): import("react").ReactNode;
    uRL: string;
    label: string;
  };
  id: string;
  slug: string;
  name: string;
  c_navigationBar: HeaderNavigation[];
  c_helpLinks: {
    link?: URL;
    label: string;
  }[];
  c_helpTitle: string | undefined;
  c_servicesTitle: string | undefined;
  c_servicesList: string[];
  c_carouselForFood:string[];
}
export interface HeaderNavigation {
  uRL: string;
  link: string;
  label: string;
  description:string;
  cTA:string;
  plansImage:string;
  url:string;
  title:string;
}
[];
export interface TemplateMeta {
  mode: "development" | "production";
}

export interface EntityType {
  id: string;
}
export interface EntityMeta {
  id: string;
  entityType: EntityType;
  locale: string;
}

export interface CountryDocument {
  name: string;
  slug: string;
  meta: EntityMeta;
  _site: SiteData;
  dm_directoryChildren: DirectoryChild[];
  dm_directoryParents: DirectoryParent[];
}

export interface StateDocument {
  name: string;
  slug: string;
  meta: EntityMeta;
  _site: SiteData;
  dm_directoryChildren: DirectoryChild[];
}

export interface CityDocument {
  googlePlaceId(address: (address: any, googlePlaceId: any) => string, googlePlaceId: any): string;
  address(address: any, googlePlaceId: any): string;
  name: string;
  slug: string;
  meta: EntityMeta;
  _site: SiteData;
  dm_directoryChildren: LocationDocument[];
  dm_directoryParents: DirectoryParent[];
}
export type elementProps = {
  categoryURL: string;
  image: ComplexImage;
  categoryName: string;
};
export interface LocationDocument {
  paymentOptions: any;
  c_fAQ(c_fAQ: any, arg1: string): unknown;
  c_categories_heading: ReactNode;
  meta: EntityMeta;
  c_heroImage:ComplexImage;
  _site: SiteData;
  id: string;
  name: string;
  slug: string;
  address: AddressType;
  hours: Hours;
  additionalHoursText: string;
  yextDisplayCoordinate: Coordinate;
  googlePlaceId: string;
  mainPhone: E164Number;
  dm_directoryParents: DirectoryParent[];
  timezone: string;
  c_core:any;
  c_buttonText1: {
    map(arg0: (e: HeaderNavigation, i: number) => JSX.Element): import("react").ReactNode;
    Link: string;
    label: string;
  };
  c_sectionParagraph:string;
  c_sectionTitle:string;
  c_carouselForFood:any;


}

export interface LocationDocument1 {
  c_specificDay: { holidayDate?: Date | undefined; holidayName?: string | undefined; }[] | undefined;
  c_categoryNameAndImage: elementProps[];
  c_categories_heading: string;
  c_storeInformationTitle: string;
  c_store_hours_heading: string;


  c_about_section_CTA: LinkingProps;
  c_about_section_name: string;
  c_about_section_image: ComplexImage;
  c_about_section_description: string;
}

export interface LinkingProps {
  link: string;
  label?: React.ReactNode;
  linkType?: "OTHER" | "URL" | "PHONE" | "EMAIL";
}
