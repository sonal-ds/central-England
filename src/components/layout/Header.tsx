import * as React from "react";
import { Image, Link } from "@yext/pages/components";
import { HeaderNavigation, ImageThumbnail, SiteData, TemplateMeta } from "../../types";
import "../../assets/css/base.css";
import "../../assets/css/header.css";
import Phone from "../common/Phone";

// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "#" },
// ];

interface HeaderProps {
  navLink?:SiteData;
  navLogo?:ImageThumbnail;
  navNumber?:string;
  meta: TemplateMeta;
  template?: string;
  devLink?: string;
  locale?: string;
}

const Header = (props: HeaderProps) => {
  const { meta } = props;
  console.log(
    "first",
    props.navLink
  
  );
  return (
    <header className={`site-header ${meta.mode}`}>
      <div className="container">
        <div className="row">

          <div className="header-menu">
            <ul className="text-lg font-semibold">
              {props?.navLink && props?.navLink?.map(
                (e: HeaderNavigation, i: number) => {
                  return (
                    <li key={i}>
                      {e?.uRL && e?.label && (
                        <Link href={e.uRL} className="">
                          {e.label}
                        </Link>
                      )}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <br></br>
        
        </div>
      </div>
      <div className="logo">
            <a href="#">
              {props?.navLogo &&
              <Image
                image={props?.navLogo}
                layout="aspect"
                aspectRatio={
                  props?.navLogo?.image?.width /
                  props?.navLogo?.image?.height
                }
              />
            }
            </a>
          </div>
          {props?.navNumber && 
          <div>
            
         call us: <a href={`tel:${props?.navNumber}`}>{props?.navNumber}</a>
          </div>}
    </header>
  );
};
export default Header;
