import "/src/styles/Pokimon.css";

function Pokimon({ pokimon }) {
  return (
    <div className="pokimon">
      <img src={pokimon.imgUrl} alt="pokimon pitcure" />
      <div>{pokimon.name}</div>
    </div>
  );
}

export default Pokimon;
