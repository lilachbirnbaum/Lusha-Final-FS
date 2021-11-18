const ComboBox = ({ list, onSelected, type, placeHolder }) => {
  return (
    <div>
      <select onChange={(e) => onSelected(e.target.value)}>
        <option value="" selected disabled hidden>
          {placeHolder}
        </option>
        {!type &&
          list.map((p, i) => (
            <option key={`opt${i}`} value={p.name}>
              {p.name}
            </option>
          ))}
        {type === "customer" &&
          list.map((c, i) => (
            <option key={`opt${i}`} value={c.id}>
              {`${c.first_name} ${c.last_name}`}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ComboBox;
