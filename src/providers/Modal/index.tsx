import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";
import './Modal.css';

interface ModalData {
    text: string
}

interface ModalValue {
    openModal: (modalData:ModalData) => void
}

const ModalContext = createContext<ModalValue | undefined>(undefined);

const useModalContext = ():ModalValue => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModalContext must be used within React component.');
    return context;
}


interface Props {
    children: ReactNode
}

const ModalProvider:FC<Props> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const openModal = (modalData: ModalData) => {
        const { text } = modalData;
        setText(text);
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
        setText('');
    }

    const modalValue = useMemo(() => {
        return {
            openModal,
        }
    }, [visible]);
    
    return <ModalContext.Provider value={modalValue}>
        {children}
        {visible && <div className="modal-bg">
            <div className="modal-content">
                <div className="modal-close">
                    <button onClick={() => closeModal()}>&#10005;</button>
                </div>
                <div className="modal-text">
                    {text}
                </div>
            </div>
        </div>}
    </ModalContext.Provider>
}

export { ModalProvider, useModalContext };
