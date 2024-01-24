import './App.css';

export default function App() {


  return (
    <div className="App">
      <form>
        <label> username:
          <input type="text"/>
        </label>
        <label> password:
          <input type="text"/>
        </label>
      </form>
      <div>
        <h2>username</h2>
        <p></p>
      </div>
      <div>
        <h2>password</h2>
        <p></p>
      </div>
    </div>
  );
}
