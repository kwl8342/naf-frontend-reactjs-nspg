import React from "react"
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from "reactstrap";
import { Icon } from "../../../components/Component";
import CustomModalHeader from "./CustomModalHeader";

const ResultsModal = ({ useModalHeader, modalId, isOpen, toggleModal, bodyComponent, modalTitle, modalSubtitle, modalFooter, className, style }) => {

    return (
        <Modal fade={true} size="xl" isOpen={isOpen} toggle={toggleModal} id={modalId} className={className} style={style}>
            {
                useModalHeader ?
                    <ModalHeader
                        toggle={toggleModal}
                        close={
                            <button className="close" onClick={toggleModal}>
                                <Icon name="cross" />
                            </button>
                        }>
                        <span style={{ fontWeight: "1.7em" }}>{modalTitle}</span>

                    </ModalHeader>
                    :
                    ''
            }
            <ModalBody className="modal-body-md">
                {
                    !useModalHeader ?
                        <>
                            <CustomModalHeader
                                toggle={toggleModal}
                                close={
                                    <button className="close" onClick={toggleModal}>
                                        <Icon name="cross" />
                                    </button>
                                }>
                            </CustomModalHeader>
                            <div className="mb-2">
                                <h4 style={{ fontWeight: "1.7em" }}>{modalTitle}</h4>
                                <p className="d-none d-md-inline">{modalSubtitle}</p>
                            </div>
                        </>
                        :
                        ''
                }
                {bodyComponent}
            </ModalBody>
            {
                modalFooter ?
                    <ModalFooter>
                        <span className="sub-text">{modalFooter}</span>
                    </ModalFooter>
                    :
                    ''
            }
        </Modal>
    )
};

export default ResultsModal;
