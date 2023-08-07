import React, { useContext, useEffect, useState } from "react";
import {
  useSearchState,
  useSearchActions,
  DisplayableFacetOption,
  SelectableFilter,
  Matcher,
} from "@yext/search-headless-react";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import Facet, { FacetConfig, FacetCssClasses } from "./Facet";
import { Divider } from "./StaticFilters";
import { addFilterParams } from "../../config/GlobalFunctions";
import { SearchContext } from "../google-map/SearchProvider";
import FoodFacet from "./FoodFacet";

interface FacetsProps {
  searchOnChange?: boolean;
  searchable?: boolean;
  inputvalue?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  facetConfigs?: Record<string, FacetConfig>;
  customCssClasses?: FacetsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  handleCloseModal?: any;
  isVisiable?: boolean
}

interface FacetsCssClasses extends FacetCssClasses {
  container?: string;
  divider?: string;
  buttonsContainer?: string;
  button?: string;
}

interface ServicesFilterOption {
  key: string;
  value: string;
  translations: any[]; // Adjust the type of translations if needed
}

const builtInCssClasses: FacetsCssClasses = {
  searchableInputElement: "filter-popup",
  container: "md:w-full",
  buttonsContainer: "",
  button: " Link btn",
  divider: "w-full h-px bg-gray-200 my-4",
};

export default function FoodFacets(props: FacetsProps): JSX.Element {
  const [foodactive, setFoodActive] = useState(false);
  const {
    searchOnChange,
    searchable,
    collapsible,
    defaultExpanded,
    facetConfigs = {},
    customCssClasses,
    cssCompositionMethod,
    handleCloseModal,
    inputvalue,
    isVisiable // check if filters are visiable or not
  } = props;

  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

  const servicesFilterOptions = [
    {
      key: "5614489",
      value: "ATM",
      translations: [],
    },
    {
      key: "5614486",
      value: "Bakery",
      translations: [],
    },
    {
      key: "5614492",
      value: "Café",
      translations: [],
    },
    {
      key: "5614488",
      value: "Click & Collect",
      translations: [],
    },
    {
      key: "5614490",
      value: "Coffee Vending Machine",
      translations: [],
    },
    {
      key: "5614491",
      value: "Defibrillator",
      translations: [],
    },
    {
      key: "5614487",
      value: "Food to go",
      translations: [],
    },
    {
      key: "5614485",
      value: "Money Ordering Service",
      translations: [],
    },
    {
      key: "5626916",
      value: "Petrol Station",
      translations: [],
    },
    



  ];
  let facetComponents;


  //  console.log("isVisiable", isVisiable)


  const [customFacetsObjects, setCustomFacetsObjects] = React.useState<
    { fieldId: string; displayName: string; options: any[] }[]
  >([]);
  const [customOptionsKeys, setCustomOptionsKeys] = React.useState<
    { displayName: string; value: string }[]
  >([]);
  const [onLoadSetFacets, setOnLoadSetFacets] = React.useState(false);

  const latitude =
    useSearchState((state) => state.location.userLocation?.latitude) || 0;
  const longitude =
    useSearchState((state) => state.location.userLocation?.longitude) || 0;

  const searchAction = useSearchActions();
  const { getSearchData, centerCoordinates } = useContext(SearchContext)
  const executeSearch = () => {
    getSearchData(centerCoordinates, inputvalue!, 0, [])



    if (searchAction.state.filters.static == undefined) {
      const locationFilter: SelectableFilter = {
        selected: true,
        fieldId: "builtin.location",
        value: {
          lat: latitude,
          lng: longitude,
          radius: 2500,
        },
        matcher: Matcher.Near,
      };
      searchAction.setStaticFilters([locationFilter]);
    }
    customFacetsObjects.map((facetOptions: any) => {
      facetOptions.options.map((facetOption: any) => {
        if (facetOption.selected) {
          customOptionsKeys.map((option: any) => {
            if (facetOption.displayName == option.displayName) {
              addFilterParams(option.value);
            }
          });
        }
      });
    });

    searchAction.executeVerticalQuery();
    // handleCloseModal();
  };


  let customFacets: { fieldId: string; displayName: string; options: any[] }[] =
    [];

  if (typeof servicesFilterOptions != "undefined") {
    const options: {
      displayName: string;
      count: number;
      selected: boolean;
      matcher: string;
      value: string;
    }[] = [];
    const optionsKeys: { displayName: string; value: string; }[] = [];
    servicesFilterOptions.map((filterOption) => {

      // console.log(filterOption,'filterOption');

      if (
        filterOption.value != "Vegetarian Friendly" &&
        filterOption.value != "Gluten Friendly"
      ) {
        options.push({
          displayName: filterOption.value,
          count: 0,
          selected: false,
          matcher: "$eq",
          value: filterOption.value,
        });
        optionsKeys.push({
          displayName: filterOption.value,
          value: filterOption.key,
        });

      }

    });
    if (options.length > 0) {
      // console.log(options,"options");

      const optionsSort = options.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
      customFacets = [
        {
          fieldId: "c_storeTypeList",
          displayName: "Location Page Services",
          options: optionsSort,
        },
      ];

    }

    if (customFacetsObjects.length <= 0) {
      setCustomFacetsObjects(customFacets);
      setCustomOptionsKeys(optionsKeys);
      searchAction.setFacets(customFacets);
     
    }
  }

  const handleFacetOptionChange = (
    fieldId: string,
    option: DisplayableFacetOption
  ) => {
    if (
      typeof searchAction.state.filters.facets === "undefined" &&
      searchAction.state.filters.facets == undefined
    ) {
    }


    searchAction.setFacets(customFacetsObjects);

    searchAction.setFacetOption(fieldId, option, !option.selected);
    let resetCustomFacets: Array<any> = [];
    let foodoption: Array<any> = [];
    const resetOptions: Array<any> = [];

    customFacetsObjects.map(
      (facetOptions: {
        fieldId: string;
        displayName: string;
        options: {
          displayName: string;
          count: number;
          selected: boolean;
          matcher: string;
          value: string;
        }[];
      }) => {
        facetOptions.options.map(
          (facetOption: { displayName: string; value: string }) => {
            if (facetOption.displayName === option.displayName) {
              resetOptions.push({
                displayName: facetOption.value,
                count: option.count,
                selected: !option.selected,
                matcher: "$eq",
                value: facetOption.value,
              });
            } else {
              resetOptions.push(facetOption);
            }
          }
        );
      }
    );

    foodoption = [
      {
        fieldId: "c_servicesForFood",
        displayName: "Food Services",
        options: resetOptions,
      }
    ];
    setCustomFacetsObjects(foodoption);

    let checkedValue = false;
    const inputElements: HTMLCollectionOf<HTMLInputElement> =
      document.getElementsByClassName(
        "form-checkbox"
      ) as HTMLCollectionOf<HTMLInputElement>;

    for (let i = 0; i < inputElements.length; i++) {
      if (inputElements[i].checked) {
        checkedValue = true;
        break;
      }
    }
   
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const facets = customFacetsObjects;
  if (facets.length > 0) {
    facetComponents = facets
      .filter((facet) => facet.options?.length > 0)
      .map((facet, index: number, facetArray) => {
        const isLastFacet = index === facetArray.length - 1;
        const overrideConfig = facetConfigs?.[facet.fieldId] ?? {};
        const config = {
          searchable,
          collapsible,
          defaultExpanded,
          ...overrideConfig,
        };
        return (
          <><button onClick={toggleDropdown}>Select Options</button>
 {showDropdown && (
            <><div key={facet.fieldId}>
                <FoodFacet
                  facet={facet}
                  {...config}
                  customCssclasses={cssClasses}
                  onToggle={handleFacetOptionChange} />
                {!isLastFacet && (
                  <Divider
                    customCssClasses={{ divider: cssClasses.divider }}
                    cssCompositionMethod="replace" />
                )}

              </div>
              <button onClick={executeSearch}>Apply</button></>
 )}
          </>
        );
      });
  }

  useEffect(() => {
    if (!onLoadSetFacets) {
      if (
        typeof searchAction.state.filters.facets === "undefined" &&
        searchAction.state.filters.facets == undefined
      ) {
        searchAction.setFacets(customFacetsObjects);
        const urlParams = new URLSearchParams(window.location.search);
        const searchFeatures = urlParams.getAll("features");
        if (searchFeatures.length > 0) {
          servicesFilterOptions.map(
            (servicesFilterOption: ServicesFilterOption) => {
              if (searchFeatures.includes(servicesFilterOption.key)) {
                const option = {
                  displayName: servicesFilterOption.value,
                  count: 10,
                  selected: true,
                  matcher: Matcher.Equals,
                  value: servicesFilterOption.value,
                };
                searchAction.setFacetOption("c_storeTypeList", option, true);
              }
            }
          );
        }
      }
      setOnLoadSetFacets(false);
    }
  }, []);

  return (
    <div className={cssClasses.container + " filter-items"}>
      <div>{facetComponents}</div>
      {/* <div className={cssClasses.buttonsContainer + " filterButtons button-bx"}>
        <button onClick={handleResetFacets} className={cssClasses.button}>
          Reset all
        </button>
        {!searchOnChange && (
          <button
            onClick={executeSearch}
            className={cssClasses.button}
            disabled={applyButtonStatus}
          >
            Apply
          </button>
        )}
      </div> */}
    </div>
  );
}
