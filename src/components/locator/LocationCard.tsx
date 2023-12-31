import * as React from "react";
import { SearchContext } from "../google-map/SearchProvider";
import { Address, Link } from "@yext/pages/components";
import { LocationResult, RawData } from "../../types/Locator";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getDirectionUrl, getLink } from "../../config/GlobalFunctions";
import { SiteData, TemplateMeta } from "../../types";
import Phone from "../common/Phone";
import OpenCloseStatus from "../common/OpenCloseStatus";

type LocationCardProps = {
  location: LocationResult;
  meta: TemplateMeta;
  setActiveClass: React.Dispatch<React.SetStateAction<string | null>>;
  activeClass: string | null;
  _site : SiteData;
};
const LocationCard = ({
  _site,
  location,
  meta,
}: LocationCardProps) => {
  const {
    setInfoWindowContent,
    infoWindowContent,
    setHoveredLocation,
    hoveredLocation,
  } = React.useContext(SearchContext);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const url = getLink<RawData>(location.rawData, meta, false, 0, true, true);
  const scrollIntoView = (element: HTMLDivElement, offset: number) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };
  React.useEffect(() => {
    if (
      infoWindowContent &&
      infoWindowContent.id === location.id &&
      cardRef.current
    ) {
      scrollIntoView(cardRef.current, 80);
    }
  }, [infoWindowContent]);
  // const services = location.rawData.services
  // const servicesCommaSeparated = services.join(", ");

  return (
    <div
      ref={cardRef}
      className={`location-card ${
        hoveredLocation === location.id ||
        (infoWindowContent && infoWindowContent.id === location.id)
          ? "active"
          : ""
      }`}
      // onClick={() => {
      //   setInfoWindowContent(location);
      // }}
      onClick={(e) => {
        if (
          e.nativeEvent.target &&
          !(e.nativeEvent.target as HTMLElement).classList.contains(
            "onhighLight"
          )
        ) {
          setInfoWindowContent(location);
        }
      }}
      onMouseOver={() => setHoveredLocation(location.id)}
      onMouseOut={() => {
        if (hoveredLocation === location.id) {
          setHoveredLocation(null);
        }
      }}
    >
      <div>
      {metersToMiles(location?.distance)}
      </div>
      <div className="icon-row">
        <div className="icon addressIcon"></div>
        <Link className="location-name" href={`${url}`}>
          <h2>{location.rawData.name}</h2>
        </Link>
        <Address address={location.rawData.address} />
      </div>
      {location.rawData.hours && (
        <div className="icon-row">
          <div className="icon clockIcon"></div>
          <OpenCloseStatus
           site={_site}
            hours={location.rawData.hours}
            timezone={location.rawData.timezone}
          />
        </div>
      )}
      <Phone phone={location.rawData.mainPhone} />

     
{/* <div>Services:-{servicesCommaSeparated}</div> */}
    
      <div className="button-bx-detail">
        <Link className="button link" href={`${url}`}>
          View Details
        </Link>
        <Link
          className="button link"
          target="_blank"
          rel="noopener noreferrer"
          href={getDirectionUrl(
            location.rawData.address,
            location.rawData.googlePlaceId
          )}
        >
          Get Direction
        </Link>
      </div>
    </div>
  );
};

export const LocationCardLoader = () => {
  return (
    <div className="location-card">
      <Skeleton height={25} enableAnimation />
      <Skeleton count={3} width={"50%"} enableAnimation />
      <Skeleton
        enableAnimation
        width={140}
        height={40}
        style={{ paddingTop: 20, borderRadius: 0 }}
      />
    </div>
  );
};
export default LocationCard;
