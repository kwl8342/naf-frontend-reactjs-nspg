
const CardLoadingBlock = ({ minHeight }) => {
    return (
        <div className="card card-bordered card-full card-inner-flex blurry-text w-100" style={{ minHeight: minHeight }}>
            <div className="card-inner-group h-100">
                <div className="card-inner h-100 flex-center-vertically flex-center-horizontally">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardLoadingBlock;