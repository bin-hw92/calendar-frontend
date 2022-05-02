

const AskModal = ({onClick, children }) => {

    return (
        <div className="todo-wrap" onClick={onClick}>
            <div className="todo-content">
                <button className="todo-close-btn" data-btn="N"></button>
                {children}
            </div>
        </div>
    );
};

export default AskModal;