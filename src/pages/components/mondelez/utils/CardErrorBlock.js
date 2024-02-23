const CardServerErrorBlock = ({ minHeight }) => {
    return (
        <div className="card card-bordered card-full card-inner-flex w-100" style={{ minHeight: minHeight }}>
            <div className="card-inner-group h-100">
                <div className="card-inner card-inner-flex-title">
                    <div className="text-center">
                        <em className="nk-modal-icon icon icon-circle icon-circle-lg ni ni-report-fill bg-danger"></em>
                        <h5 className="py-2">Server Error !</h5>
                        <div className="pb-3">
                            <p className="text p-0">Please try reloading after sometimes.</p>
                            <p className="text">Or Contact <a href="mailto:network-devops@mdlz.com">Administrator</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardServerErrorBlock;
