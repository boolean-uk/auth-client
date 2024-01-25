export default function Output({ regRes, loginRes }) {
  return (
    <div className="output-container ">
      <h2>Output: </h2>

      {regRes && <p>{regRes}</p>}

      {loginRes && <p>{loginRes}</p>}
    </div>
  );
}
