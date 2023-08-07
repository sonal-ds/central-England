import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { HeaderNavigation, ImageThumbnail, SiteData, TemplateMeta } from "../../types";

export interface PageLayoutProps {
  children?: React.ReactNode;
  meta: TemplateMeta;
  template?: string;
  devLink?: string;
  locale?: string;
  navLink?:SiteData;
  navLogo?:ImageThumbnail;
  navNumber?:string;
}

const PageLayout = ({
  children,
  navLink,
  navLogo,
  navNumber,
  meta,
  template,
  devLink,
  locale,
}: PageLayoutProps) => {
  return (
    <div className="page-wrapper">
      <Header
       navLink={navLink}
       navLogo={navLogo}
       navNumber={navNumber}
        meta={meta}
        template={template}
        locale={locale}
        devLink={devLink}
      />
      {children}
      {/* <Footer
        _site={_site}
        meta={meta}
        template={template}
        locale={locale}
        devLink={devLink}
      /> */}
    </div>
  );
};

export default PageLayout;
