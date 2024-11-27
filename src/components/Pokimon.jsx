import "/src/styles/Pokimon.css";

function Pokimon({ pokimon, onClick }) {
  return (
    <div className="pokimon" onClick={() => onClick(pokimon.key)}>
      <img src={pokimon.imgUrl} alt="pokimon pitcure" />
      <div>{pokimon.name}</div>
    </div>
  );
}

export default Pokimon;
