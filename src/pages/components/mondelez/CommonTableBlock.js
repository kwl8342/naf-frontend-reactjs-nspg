import React from "react"

const CommonTableBlock = React.forwardRef(({ isModal, isCompliance, hideTable, component}, ref) => {
  return (
    <div className={`card ${isModal || isCompliance ? '' : 'card-bordered'}`} data-export-title="Export" style={{ display: `${hideTable ? 'none' : 'block'}`}}>
        {isModal ? '' : <div id="cover-spin"></div>}
      <div className={`${isModal || isCompliance ? 'card-inner-essw' : 'card-inner'}`}>
            <table ref={ref} className="table table-striped wrap hover">
                  {component}
            </table>
        </div>
    </div>
  )
});

export default CommonTableBlock;
