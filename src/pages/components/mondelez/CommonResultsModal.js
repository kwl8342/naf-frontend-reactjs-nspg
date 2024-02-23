
export const CommonResultsModal = (modalId, isLarge) => {
  return `
        <div class="modal fade" id="${modalId}">
            <div class="modal-dialog ${isLarge ? 'modal-grafana-iframe' : 'model-xl'}" role="document">
                <div class="modal-content">
                    <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                        <em class="icon ni ni-cross"></em>
                    </a>
                    <div class="modal-body">
                        <div class="mb-2">
                            <h5 class="modal-title" id="${modalId}-header"></h5>
                            <p class="d-none d-md-inline" id="${modalId}-sub-header"></p>
                        </div>
                        <div id="${modalId}-body"></div>
                    </div>
                </div>
            </div>
        </div>
  `
};
