import Greet from "./components/greet";
import Person from "./components/person";
import PersonList from "./components/personList";
function App() {
  const personName = {
    first: "Baobao",
    last: "Hu",
  };
  const personList = [
    { first: "Lvcha", last: "Hu" },
    { first: "Pengpeng", last: "zhang" },
  ];
  return (
    <div className="App">
      <Greet name="baobao" messageCount={10} isLoggedIn={false} />
      <Person name={personName} />
      <PersonList names={personList} />
    </div>
  );
}
export default App;
