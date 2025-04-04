interface Props {
    onCancel: () => void;
    onSave: () => void;
}

const SaveCancelButtons = ({ onCancel, onSave }: Props) => {
    return (
        <>
            <button
                onClick={onCancel}
                className="cursor-pointer m-1 px-4 py-2 border border-[#C7823F] rounded-md text-[#C6813E] font-medium"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="cursor-pointer m-1 px-4 py-2 bg-[#BE7A37] text-white rounded-md font-bold"
            >
                Save
            </button>
        </>
    );
};

export default SaveCancelButtons;
