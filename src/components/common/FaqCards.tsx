import React, { useState } from 'react';
import RtfConverter from "@yext/rtf-converter";

const FaqAccordion = (props) => {
  const data = props.data
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {data.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
        >
          <div
            className="accordion-header"
            onClick={() => handleAccordionClick(index)}
          >
            {item.name}
          </div>
          {activeIndex === index && (
            <div className="accordion-content"
            dangerouslySetInnerHTML={{
              __html: RtfConverter.toHTML(item.answer),
            }}>
             
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
