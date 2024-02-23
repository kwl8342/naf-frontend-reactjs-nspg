import React, { useEffect, useState, useRef } from "react"
import {
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
} from "../../../components/Component";
import { Dropdown } from "react-bootstrap";

const MoreTools = ({ moreTools }) => {
  const dropdownRef = useRef()

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef])

  return (
    <Dropdown direction="left" autoClose="outside" show={isShown} ref={dropdownRef}>
      <Dropdown.Toggle id="dropdown-autoclose-false" className="btn btn-icon" onClick={() => setIsShown(!isShown)}>
        <Icon name="plus" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu" >
        <ul className="link-list-opt no-bdr">
          {moreTools}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  )
}


const PageHeader = ({ title, description, tools, moreTools }) => {
  const [sm, updateSm] = useState(false);

  return (
    <BlockHead size="sm">
      <BlockBetween>
        <BlockHeadContent>
          <BlockTitle page>{title}</BlockTitle>
          <BlockDes className="text-soft">
            <p>{description}</p>
          </BlockDes>
        </BlockHeadContent>
        <BlockHeadContent>
          <div className="toggle-wrap nk-block-tools-toggle">
            <Button
              className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="more-v"></Icon>
            </Button>
            <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
              <ul className="nk-block-tools g-3">
                {tools}
                <li>
                  <MoreTools moreTools={moreTools} />
                </li>
              </ul>
            </div>
          </div>
        </BlockHeadContent>
      </BlockBetween>
    </BlockHead>
  )
};

export default PageHeader;
