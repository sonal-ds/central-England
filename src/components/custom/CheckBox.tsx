import {
  useSearchUtilities,
  DisplayableFacet,
  DisplayableFacetOption,
} from "@yext/search-headless-react";
import { useState } from "react";
import useCollapse from "react-collapsed";
import { useRef } from "react";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import renderCheckboxOption, {
  CheckboxOptionCssClasses,
} from "../utils/renderCheckboxOption";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import * as React from "react";

export type onFacetChangeFn = (
  fieldId: string,
  option: DisplayableFacetOption
) => void;

export interface FacetConfig {
  index?: Number;
  searchable?: boolean;
  placeholderText?: string;
  label?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface FacetProps extends FacetConfig {
  facet: DisplayableFacet;
  onToggle: onFacetChangeFn;
  customCssclasses?: FacetCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface FacetCssClasses extends CheckboxOptionCssClasses {
  label?: string;
  labelIcon?: string;
  labelContainer?: string;
  optionsContainer?: string;
  searchableInputElement?: string;
}

const builtInCssClasses: FacetCssClasses = {
  label: "text-black text-base font-light text-left",
  labelIcon: "",
  labelContainer: "w-full flex justify-between items-center",
  optionsContainer: "flex flex-col",
};

export default function CheckBox(props: FacetProps): JSX.Element {
  const {
    index,
    facet,
    onToggle,
    sellectAll,
    searchable,
    collapsible,
    defaultExpanded,
    label,
    placeholderText = "Search here...",
    customCssclasses,
    cssCompositionMethod,
    value,
    resetAll,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssclasses,
    cssCompositionMethod
  );
  const answersUtilities = useSearchUtilities();
  const hasSelectedFacet = !!facet.options.find((o) => o.selected);
  const [filterValue, setFilterValue] = useState("");
  const [sellectAllCheck, setSellectAllCheck] = useState(false);
  cssClasses.labelIcon = cssClasses.labelIcon ?? "";
  const facetOptions = searchable
    ? answersUtilities.searchThroughFacet(facet, filterValue).options
    : facet.options;
  let Collapsible = collapsible;

  const searchAction = useSearchActions();
  const selectAllCheckRef = useRef(sellectAllCheck);
  const [count, setCount] = useState(0);
  function changeref(VALUE: any) {
    props.value.current = VALUE.count;
  }
  function checkAll() {
    facetOptions, "facetOptions";
    facetOptions.map((option: any) => {
      if (sellectAllCheck) {
        setSellectAllCheck(false);
        selectAllCheckRef.current = false;

        searchAction.setFacetOption(facet.fieldId, option, false);
      } else {
        setSellectAllCheck(true);
        selectAllCheckRef.current = true;
        searchAction.setFacetOption(facet.fieldId, option, true);
      }

      changeref(option);
    });
  }

  function checkAllCheckBox(option: any) {
    var len = facetOptions.length;
    if (option.selected == false) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }

    if (count == len - 1) {
      setSellectAllCheck(false);
      selectAllCheckRef.current = false;
    }
  }

  return (
    <>
      <div className="select-all" id="select-all" onClick={() => checkAll()}>
        {/* <input type="text" className="!block" id="selectAll"
                    onChange={(e) => { checkAll(e) }}
                    checked={selectAllCheckRef.current}
                /> */}
        {"Select all"}
      </div>

      <div className={cssClasses.optionsContainer}>
        {facetOptions.map((option) => {
            console.log('facetOptions', facetOptions)
          return (
            <div
              className={cssClasses.option}
              key={option.displayName}
              id={facet.fieldId}
            >
              <input
                type="checkbox"
                id={option.displayName}
                checked={option.selected}
                className={cssClasses.optionInput}
                name="item"
                onChange={(evt) => {
                  onToggle(facet.fieldId, option);
                  changeref(option);
                  checkAllCheckBox(option);
                }}
              />
              <label
                className={cssClasses.optionLabel}
                htmlFor={option.displayName}
              >
                {option.displayName}
                <sup>{option.count}</sup>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
