import React, { useEffect, useState } from "react"
import {
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
} from "../../../components/Component";
import CommonFilterDropDown from "./CommonFilterDropDown";
import DownloadNetworkReport from "./DownloadNetworkReport";


const DatatablePageHead = ({ title, description, historyUrl, returnUrl, showHistoryBtn }) => {
  const [sm, updateSm] = useState(false);
  const [enableBackBtn, setEnableBackBtn] = useState(false);
  const [enableHistoryBtn, setEnableHistoryBtn] = useState(showHistoryBtn ? showHistoryBtn : false);

  useEffect(() => {
    if (window.location.pathname.includes('history')) {
      setEnableBackBtn(true)
      setEnableHistoryBtn(false)
    }
  }, [enableBackBtn, enableHistoryBtn])

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
                {
                  historyUrl && enableHistoryBtn ?
                    <li>
                        <Button outline className="btn-dim btn-white" onClick={() => {
                          // setEnableHistoryBtn(!enableHistoryBtn)
                          // setEnableBackBtn(!enableBackBtn)
                          window.location.href = historyUrl
                        }}>
                          <Icon name="histroy"></Icon>
                          <span>History</span>
                        </Button>
                      {/* <Link to={`${historyUrl}`}>
                      </Link> */}
                    </li>
                    : ''
                }
                {
                  enableBackBtn ?
                    <li>
                        <Button outline className="btn-dim btn-white" onClick={() => {
                          // setEnableHistoryBtn(!enableHistoryBtn)
                          // setEnableBackBtn(!enableBackBtn)
                          window.location.href = returnUrl
                        }}>
                          <Icon name="arrow-left"></Icon>
                          <span>Back</span>
                        </Button>
                      {/* <Link to={`${returnUrl}`}>
                      </Link> */}
                    </li>
                    : ''
                }
                <li>
                  <CommonFilterDropDown />
                </li>
                <li>
                  <DownloadNetworkReport selectedReportId={18} selectedReportPublished={'Sep 19, 2022'} baseExportUrl={'/core/compliance/export'} />
                </li>
              </ul>
            </div>
          </div>
        </BlockHeadContent>
      </BlockBetween>
    </BlockHead>
  )
};

export default DatatablePageHead;
