import React, { useContext } from "react";
import LocationList from "./LocationList";
import ViewMore from "./ViewMore";
import Facets from "../custom/Facets";
import AutoSuggestions from "../google-map/components/AutoSuggestions";
import { SearchContext } from "../google-map/SearchProvider";
import NoRecordFound from "./NoRecordFound";
import { SiteData, TemplateMeta } from "../../types";
import ResultCount from "./ResultCount";
import FoodFacets from "../custom/FoodFacets";
import { useSearchActions } from "@yext/search-headless-react";


interface ListLayoutProps {
    meta: TemplateMeta;
    message?: string;
    locale: string;
    showNoRecordMessage?: boolean;
    _site: SiteData;
}

function ListLayout({
    _site,
    meta,
    locale,
    message = "",
    showNoRecordMessage = false,
}: ListLayoutProps) {

    const { noRecordFound, showResultCount, inputValue } = useContext(SearchContext);
    const [isFoodServicesShow, setIsFoodServicesShow] = React.useState(false);
    const searchAction = useSearchActions();
const result = searchAction.state.vertical.results
    return (
        <div className="listing-block">
            <AutoSuggestions locale={locale} />
            <div className="filters-block">
                
                {/* Checkbox filters */}
                <Facets
                    inputvalue={inputValue}
                    searchOnChange={true}
                    searchable={false}
                    collapsible={true}
                    defaultExpanded={true}
                    onFilterSelect={ (fieldName, isChecked)=> { 
                        if(fieldName === 'food' && isChecked){
                            setIsFoodServicesShow(true)
                        }else if(fieldName === 'food' && (!isChecked)){
                            setIsFoodServicesShow(false)
                        }
                    } }
                />

                {/* Select box facets */}
                <div className={` ${ isFoodServicesShow ? '': 'hidden' } `}>
                    <FoodFacets
                        isVisiable={isFoodServicesShow}
                        inputvalue={inputValue}
                        searchOnChange={true}
                        searchable={false}
                        collapsible={true}
                        defaultExpanded={true}
                    />
                </div>
                
            </div>
{/* Use our locator to find Find a Location near you or browse our directory. */}
            {showNoRecordMessage && noRecordFound && (
                <NoRecordFound message={message} />
            )}
            
            {result?.length === undefined || 0?<p>Use our locator to find Find a Location near you or <a href="#">browse our directory.</a></p>: showResultCount && <ResultCount />}
            <LocationList meta={meta} _site={_site} />
            <ViewMore />
        </div>
    );
}

export default ListLayout;
