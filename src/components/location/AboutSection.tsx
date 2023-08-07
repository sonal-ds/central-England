import * as React from "react";
import { LocationDocument } from "../../types";
import RtfConverter from "@yext/rtf-converter";
import { Link } from "@yext/pages/components";

type AboutSectionProps = {
  document: LocationDocument;
};

const AboutSection = ({ document }: AboutSectionProps) => {
  return (
    <>
      {document.c_sectionTitle && (
        <div className="about-sec">
          <div className="container">
            <h2 className="sec-title block lg:hidden text-center">
              {document.c_sectionTitle}
            </h2>
            <div className="row">
            
              <div className="about-sec-content w-full lg:w-1/2 px-4 mt-6 lg:mt-0 only:w-full only:mt-0">

                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: document.c_sectionParagraph ? document.c_sectionParagraph : "" }}
                ></div>
            
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
