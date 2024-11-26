function Pokimon({ pokimon }) {
  return (
    <div className="pokimon">
      <img src={pokimon.imgUrl} alt="" />
      <div>{pokimon.name}</div>
    </div>
  );
}
