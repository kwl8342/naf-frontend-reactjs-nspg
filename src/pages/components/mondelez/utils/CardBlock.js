import React from 'react'

const CardBlock = (
    {
        title,
        cardTools,
        cardBody,
        options = {
            addCardBorder: Boolean,
            isInTabPane: Boolean,
        }
    }
) => {
    return (
        <div className={`card ${options.addCardBorder === true ? 'card-bordered' : ''} ${options.isInTabPane === true ? 'card-border-bottom' : ''
            } card-full`}>
            <div className="card-inner-group">
                <div className={`card-inner pb-3 ${options.isInTabPane === true ? 'pt-0' : 'pt-3'}`}>
                    <div className="card-title-group">
                        <div className="card-title">
                            <h6 className="title">{title}</h6>
                        </div>
                        <div className="card-tools">
                            {cardTools}
                        </div>
                    </div>
                </div>
                <div className="card-inner card-inner-md">
                    {cardBody}
                </div>
            </div>
        </div>
    )
};

export default CardBlock;