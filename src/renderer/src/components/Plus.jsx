const Plus = ({ color, onClick }) => {
    return (
        <div
            className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
            style={{ backgroundColor: color.colorHeader }}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={color.colorText}
                viewBox="0 0 24 24"
                width="24"
                height="24"
            >
                <path d="M12 5v14m7-7H5" stroke={color.colorText} strokeWidth="2" />
            </svg>
        </div>
    );
};

export default Plus;