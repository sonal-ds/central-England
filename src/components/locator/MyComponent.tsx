import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://cdn.yextapis.com/v2/accounts/me/answers/vertical/query?experienceKey=CECoop_answers_experience&api_key=aa41207f4da0b3fc80322ff52c7316bb&v=20220511&version=STAGING&locale=en_GB&verticalKey=locations&limit=50&offset=0&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=false&sortBys=[]&source=STANDARD')
      .then(response => response.json())
      .then(data => {
        // Assuming facets are available in the 'facets' property of the response
        if (data && data.response.facets) {
          // Set 'selected' property to false for all options initially
          const updatedFacets = data.response.facets.map(facet => ({
            ...facet,
            options: facet.options.map(option => ({
              ...option,
              selected: false,
            })),
          }));
          setFilterData(updatedFacets);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckboxChange = (facetId, optionId) => {
    const updatedFacets = filterData.map(facet => {
      if (facet.fieldId === facetId) {
        const updatedOptions = facet.options.map(option => {
          if (option.displayName === optionId) {
            return { ...option, selected: !option.selected };
          }
          return option;
        });
        return { ...facet, options: updatedOptions };
      }
      return facet;
    });
    setFilterData(updatedFacets);
  };

  // Render filter data
const foodServices =()=>{
return(
    filterData.map(facet => (
        <li key={facet.fieldId}>
          {/* <strong>{facet.displayName}</strong> */}
          <ul>
            {facet.options.map(option => (
                
              <li key={option.displayName}>
                  {facet.fieldId == "c_servicesForFood " ? console.log(option.displayName,"option.displayName")
                  : ""}
                {/* 
                <input type="checkbox"
                  value={option.displayName}
                  checked={option.selected} 
                  onChange={() => handleCheckboxChange(facet.fieldId, option.displayName)}> {option.displayName} ({option.count}) </input> 
                */}
              </li>
            ))}
          </ul>
        </li>
      ))
)
} 
// console.log(foodServices,'foodServices')
  return (
    <div>
      <h1>Filter Data:</h1>
   
         

      <ul>
        {filterData.map(facet => (
          <li key={facet.fieldId}>
            {/* <strong>{facet.displayName}</strong> */}
            <ul>
              {facet.options.map(option => (
                <li key={option.displayName}>
                    {facet.fieldId == "c_storeTypeList" ? <button >{option.displayName}</button> : ""}
                  
                  <input
                    type="checkbox"
                    value={option.displayName}
                    checked={option.selected}
                    onChange={() => handleCheckboxChange(facet.fieldId, option.displayName)} />
                  {option.displayName} ({option.count}) 
                 
                </li>
                
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {foodServices}
    </div>
  );
};

export default MyComponent;
