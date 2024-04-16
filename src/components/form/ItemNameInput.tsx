type ItemNameInputProps = {
  inputName: string;
  value: string;
};

const ItemNameInput = ({ inputName, value }: ItemNameInputProps) => {
  return (
    <div>
        <input name={inputName} type="text" value={value} autoFocus className="item-name-input" />
    </div>
  );
};

export default ItemNameInput;
