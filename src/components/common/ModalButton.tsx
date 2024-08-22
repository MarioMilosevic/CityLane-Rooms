const ModalButton = ({ options }) => {
  const proba = (e) => {
    e.stopPropagation();
    console.log('event')
  };

  return (
    <button
      className="bg-neutral-50 z-20 absolute top-10 right-0 flex flex-col rounded-md"
      onClick={proba}
    >
      {options.map((option, index) => (
        <span
          key={index}
          className="flex items-center justify-between gap-4 px-4 py-1"
        >
          <option.icon />
          <p>{option.text}</p>
        </span>
      ))}
    </button>
  );
};

export default ModalButton;
