import * as React from "react";
import { useRef, useEffect } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import  './style.css'

export default function SignupPage() {
  const appendTextboxObj = useRef(null);
  const iconTextboxObj = useRef(null);
  const prependTemplate = () => {
    return (
      <>
        <span className="e-icons e-user"></span>
        <span className="e-input-separator"></span>
      </>
    );
  };
  const appendTemplate = () => {
    const handleClick = (e) => {
      let textIcon = e.target;
      if (textIcon) {
        if (appendTextboxObj.current.type === "text") {
          appendTextboxObj.current.type = "Password";
          textIcon.className = "e-icons e-eye-slash";
        } else {
          appendTextboxObj.current.type = "text";
          textIcon.className = "e-icons e-eye";
        }
      }
    };
    return (
      <>
        <span className="e-input-separator"></span>
        <span
          id="text-icon"
          className="e-icons e-eye"
          onClick={handleClick}
        ></span>
      </>
    );
  };
  const prependIconTemplate = () => {
    return (
      <>
        <span className="e-icons e-people"></span>
        <span className="e-input-separator"></span>
      </>
    );
  };
  const appendIconTemplate = () => {
    const handleDeleteClick = () => {
      iconTextboxObj.current.value = "";
    };
    return (
      <>
        <span>.com</span>
        <span className="e-input-separator"></span>
        <span className="e-icons e-trash" onClick={handleDeleteClick}></span>
      </>
    );
  };
  return (
    <div className="control-pane">
      <div className="col-lg-12 control-section adornment-textbox">
        <div className="content-wrapper sample-icon">
          <div className="row">
            <TextBoxComponent
              placeholder="Enter your Name"
              cssClass="e-prepend-textbox"
              floatLabelType="Auto"
              prependTemplate={prependTemplate}
            />
          </div>
          <div className="row">
            <TextBoxComponent
              ref={appendTextboxObj}
              placeholder="Password"
              floatLabelType="Auto"
              cssClass="e-eye-icon"
              appendTemplate={appendTemplate}
            />
          </div>
          <div className="row custom-margin-row">
            <TextBoxComponent
              ref={iconTextboxObj}
              placeholder="Enter the Mail Address"
              cssClass="e-icon-textbox"
              floatLabelType="Auto"
              prependTemplate={prependIconTemplate}
              appendTemplate={appendIconTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
