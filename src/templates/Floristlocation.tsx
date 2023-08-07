import * as React from "react";
import {
	Template,
	GetPath,
	TemplateConfig,
	TemplateProps,
	TemplateRenderProps,
	GetHeadConfig,
	HeadConfig,
	TransformProps,
} from "@yext/pages";
import favicon from "../assets/images/favicondemy.png";
import ogimage from "../assets/images/ogimage.jpeg";
import { HeaderNavigation, LocationDocument, TemplateMeta } from "../types";
import PageLayout from "../components/layout/PageLayout";
import Breadcrumbs, { BreadcrumbItem } from "../components/common/Breadcrumbs";
import {
	AnalyticsProvider,
	AnalyticsScopeProvider,
} from "@yext/pages/components";
import Information from "../components/location/Information";
import NearByLocation from "../components/location/NearByLocation";
import "../index.css";
import "../assets/css/location.css";
import {
	entityTypes,
	getBreadcrumb,
	getBreadcrumbSchema,
	getLink,
	getMetaTags,
	getOgTags,
	getTwitterTags,
	savedFilterIds,
} from "../config/GlobalFunctions";
import { NearByLocationResult } from "../types/Locator";
import AboutSection from "../components/location/AboutSection";
import Catagories from "../components/location/Catagories";
import { DirectoryParent } from "../types/DirectoryParent";
import { Image, Link } from "@yext/pages/components";
import Carousel from "../components/location/Carousel";
import Gallery from "../components/location/Carousel";
import CarouselComponent from "../components/location/Carousel";
import Carousels from "../components/location/Carousel";

export const config: TemplateConfig = {
	stream: {
		$id: "Floristlocation",
		filter: {
			entityTypes: [entityTypes],
			entityIds: ["520275"]
		},
		fields: [
			"id",
			"uid",
			"meta",
			"name",
			"slug",
			"address",
			"timezone",
			"hours",
			"mainPhone",
			"c_heroImage",
			"additionalHoursText",
			"googlePlaceId",
			// "c_carouselForFood",
			"c_buttonText1",
			"c_core",
			"c_sectionTitle",
			"c_sectionParagraph",
			"yextDisplayCoordinate",
			"paymentOptions",
			"c_lists",
            "c_storeType"
            // "dm_directoryParents.name",
			// "dm_directoryParents.slug",
			// "dm_directoryParents.meta.entityType",
			// "dm_directoryParents.dm_directoryParents.name",
			// "dm_directoryParents.dm_directoryParents.slug",
			// "dm_directoryParents.dm_directoryParents.meta.entityType",
			// "dm_directoryParents.dm_directoryParents.dm_directoryParents.name",
			// "dm_directoryParents.dm_directoryParents.dm_directoryParents.slug",
			// "dm_directoryParents.dm_directoryParents.dm_directoryParents.meta.entityType",
		],
		localization: {
			locales: ["en_GB"],
			primary: false,
		},
	},
};

export const getPath: GetPath<TemplateProps> = ({ document, __meta }) => {
	if (__meta.mode === "production") {
		return document.slug;
	} else {
		return getLink(document, __meta, false, 0, true);
	}
};

// export const getPath: GetPath<TemplateProps> = ({ document }) => {
//   return `${document.slug.toString()}.html`;
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
	document,
	path
}): HeadConfig => {
	const metaTags = getMetaTags(
		document?.c_metaTitle ? document?.c_metaTitle : "",
		document?.c_metaDescription ? document?.c_metaDescription : "",
		document?.c_robotsTag ? document?.c_robotsTag : "",
		`${YEXT_PUBLIC_BASEURL}/${path}`,
		favicon
	);
	const ogTags = getOgTags(
		document?.c_metaTitle ? document?.c_metaTitle : "",
		document?.c_metaDescription ? document?.c_metaDescription : "",
		`${YEXT_PUBLIC_BASEURL}/${path}`,
		ogimage

	);

	const twitterTags = getTwitterTags(
		document?.c_metaTitle ? document?.c_metaTitle : "",
		document?.c_metaDescription ? document?.c_metaDescription : "",
		ogimage
	);
	return {
		title: `${document?.c_metaTitle ? document?.c_metaTitle : ""}`,
		charset: "UTF-8",
		viewport:
			"width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
		tags: [...metaTags, ...ogTags, ...twitterTags]
	};
};

type TransformData = TemplateRenderProps & {
	externalApiData: NearByLocationResult[];
	breadcrumbs: BreadcrumbItem[];
};
export const transformProps: TransformProps<TransformData> = async (data) => {
	const document = data.document as LocationDocument;
	const directoryParents = document.dm_directoryParents || [];
	const breadcrumbs = getBreadcrumb<DirectoryParent, LocationDocument>(
		directoryParents,
		document,
		data.__meta
	);
	return { ...data, breadcrumbs };
};

interface LocationTemplateProps extends TransformData {
	__meta: TemplateMeta;
	document: LocationDocument;
}

const Foodlocation: Template<LocationTemplateProps> = ({
	document,
	__meta,
	breadcrumbs,
}: LocationTemplateProps) => {
	const { meta, _site, slug } = document;
	const [nearByLocations, setNearByLocations] = React.useState([]);
    // console.log(document.c_storeType,"c_storeTypeList")
	return (
		<div id="main">
			<AnalyticsProvider
				templateData={{ document, __meta }}
				enableDebugging={YEXT_PUBLIC_ANALYTICS_ENABLE_DEBUGGING}
				enableTrackingCookie={YEXT_PUBLIC_ANALYTICS_ENABLE_TRACKING_COOKIE}
			>
				<AnalyticsScopeProvider name={document.name}>
					<PageLayout
						navLink={_site?.c_locationFood}
						navLogo={_site.c_logo}
						navNumber={_site.c_callUs}
						meta={__meta}
						template="location"
						locale={meta.locale}
						devLink={slug}
					>
						<img src={document.c_heroImage.url} />
						<h1>{document.name}</h1>
						{
							document?.c_buttonText1?.map((e: HeaderNavigation, i: number) => {
								return (
									<Link
										className="button link"
										target="_blank"
										rel="noopener noreferrer"
										href={e.link}
									>
										{e.label}
									</Link>);
							}
							)}

						<Breadcrumbs
							baseUrl=""
							breadcrumbs={breadcrumbs}
						/>
						<Information document={document} _site={_site} nearByLocations={nearByLocations} />
						{/* Payment Options */}
						<div>
                            { document.paymentOptions && 
						<div>Payment OPtions</div> }
                            <ul>
							{document.paymentOptions?.map((option) => (
								<li key={option}>{option}</li>
							))}
						</ul></div>

						{/* SErvices Options */}
						<div>
                            {document.c_lists && 
							<div>Services</div>}
							<ul>
							{document.c_lists?.map((option) => (
								<><li key={option}><img src={option.icon1?.url}/><div>{option.service1}</div></li></>
							))}
						</ul></div>
						{/* {document && (
							<>
								<AboutSection document={document} />
							</>
						)} */}

						{/* <Carousels c_carouselForFood={document} /> */}
						{/* <Catagories document={document} /> */}
						<NearByLocation
							apiKey={YEXT_PUBLIC_ANSWER_SEARCH_API_KEY}
							coordinate={document.yextDisplayCoordinate}
							id={document.id}
							meta={__meta}
							_site={_site}
							setNearByLocations={setNearByLocations}
						/>
					</PageLayout>
				</AnalyticsScopeProvider>
			</AnalyticsProvider>
		</div>
	);
};
export default Foodlocation;
