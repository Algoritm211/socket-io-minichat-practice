import './App.css';
import socket from './socket/socket-config'
import EntryForm from "./components/EntryForm/EntryForm";

function App() {

  return (
    <div className="App">
      <EntryForm />
    </div>
  );
}

export default App;
