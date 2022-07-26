import React from "react";
import "./cardPoke.css";
const CardPoke = ({ data = {}, design = 1, ...others }) => {
  // console.log(data)
  let styleCommon = {
    borderRadius: "10px",
    padding: "2px 10px",
    color: "#ffffff",
    lineHeight: "1.3",
    fontWeight: "600",
  };
  let styleTypes = [
    {
      typePoke: "grass",
      style: { background: "#21b49c", ...styleCommon },
    },
    {
      typePoke: "fire",
      style: { background: "#cd3939", ...styleCommon },
    },
    {
      typePoke: "water",
      style: { background: "#73a0e6", ...styleCommon },
    },
    {
      typePoke: "poison",
      style: { background: "#673ab7", ...styleCommon },
    },
    {
      typePoke: "flying",
      style: { background: "#95b1c9", ...styleCommon },
    },
    {
      typePoke: "bug",
      style: { background: "#3c9950", ...styleCommon },
    },
    {
      typePoke: "normal",
      style: { background: "#ca98a8", ...styleCommon },
    },
    {
      typePoke: "electric",
      style: { background: "#f9fa6f", ...styleCommon, color: "#444444" },
    },
    {
      typePoke: "ground",
      style: { background: "#6f481f", ...styleCommon },
    },
    {
      typePoke: "fairy",
      style: { background: "#ed1467", ...styleCommon },
    },
    {
      typePoke: "fighting",
      style: { background: "#fb6637", ...styleCommon },
    },
    {
      typePoke: "psychic",
      style: { background: "#fd1a94", ...styleCommon },
    },
    {
      typePoke: "rock",
      style: { background: "#904021", ...styleCommon },
    },
    {
      typePoke: "steel",
      style: { background: "#41c79a", ...styleCommon },
    },
    {
      typePoke: "ice",
      style: { background: "#d8f8fb", ...styleCommon, color: "#444444" },
    },
    {
      typePoke: "ghost",
      style: { background: "#946998", ...styleCommon },
    },
    {
      typePoke: "dragon",
      style: { background: "#5ed5e8", ...styleCommon },
    },
    {
      typePoke: "dark",
      style: { background: "#5b597d", ...styleCommon },
    },
  ];
  let isvoid = Object.entries(data).length === 0;
  let colorback =
    !isvoid &&
    styleTypes.find((st) => st.typePoke === data.types[0].type.name)?.style
      ?.background;
  // console.log(colorback)
  return (
    <div className="cardPoke" {...others}>
      <div
        className={design === 1 ? "cardPoke-back" : "cardPoke-back2"}
        style={{ background: colorback }}
      ></div>
      <div className="cardPoke-container">
        <img src={data?.sprites?.front_default} alt="" />
        <div className="cardPoke-name">{data.name}</div>

        <div className="cardPoke-types">
          {!isvoid &&
            data.types.map((typePoke) => {
              return (
                <span
                  key={typePoke.type.name}
                  style={
                    styleTypes.find((st) => st.typePoke === typePoke.type.name)
                      ?.style
                  }
                >
                  {typePoke.type.name}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CardPoke;
