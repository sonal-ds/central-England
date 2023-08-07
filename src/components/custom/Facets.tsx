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
import FoodFacets from "./FoodFacets";

export type onFilterSelectProp = (
  fieldName: string,
  isChecked: boolean
) => void;

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
  onFilterSelect? : onFilterSelectProp
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

export default function Facets(props: FacetsProps): JSX.Element {
  const[foodactive,setFoodActive]=useState(false);
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
    onFilterSelect
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

  const servicesFilterOptions = [
    {
      key: "5614520",
      value: "Florist",
      translations: [],
    },
    {
      key: "5614518",
      value: "Food",
      translations: [],
    },
    {
      key: "5614519",
      value: "Funeral",
      translations: [],
    },
    
  ];
  let facetComponents;



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
  const {getSearchData,centerCoordinates, inputValue}=useContext(SearchContext)
  const executeSearch = () => {

    getSearchData(centerCoordinates,inputValue,0,[])
    // searchAction.setOffset(0);
    // searchAction.setVerticalLimit(YEXT_PUBLIC_PAGE_LIMIT);
    // searchAction.setLocationRadius(2500)


    if (searchAction.state.filters.static == undefined) {
      const locationFilter: SelectableFilter = {
        selected: true,
        fieldId: "builtin.location",
        value: {
          lat: latitude,
          lng: longitude,
          radius:2500,
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
    const optionsKeys: { displayName: string; value: string;  }[] = [];
    servicesFilterOptions.map((filterOption) => {

      
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
    option: DisplayableFacetOption,
    isChecked: boolean
  ) => {

    if(typeof onFilterSelect!=='undefined'){
      const fieldValue = option.value.toString().toLowerCase();
      onFilterSelect(fieldValue, isChecked);
    }

    if (
      typeof searchAction.state.filters.facets === "undefined" &&
      searchAction.state.filters.facets == undefined
    ) {
    }
   
    
    searchAction.setFacets(customFacetsObjects);

    searchAction.setFacetOption(fieldId, option, !option.selected);
    let resetCustomFacets: Array<any> = [];
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
    resetCustomFacets = [
      {
        fieldId: "c_storeTypeList",
        displayName: "Location Page Services",
        options: resetOptions,
      }
    ];
    
    setCustomFacetsObjects(resetCustomFacets );

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
    if (searchOnChange) {
      executeSearch();
    }
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
          <div key={facet.fieldId}>
            <Facet
              facet={facet}
              {...config}
              customCssclasses={cssClasses}
              onToggle={handleFacetOptionChange}
            />
            {}
            {!isLastFacet && (
              <Divider
                customCssClasses={{ divider: cssClasses.divider }}
                cssCompositionMethod="replace"
              />
            )}
          </div>
        );
      });
  }

  /**  On Page load */
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
      setOnLoadSetFacets(false  );
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
