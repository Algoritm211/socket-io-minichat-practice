import './App.css';
import socket from './api/socket-config'
import EntryForm from "./components/EntryForm/EntryForm";
import ChatContainer from "./components/ChatContainer/ChatContainer";

function App() {

  return (
    <div className="App">
      <ChatContainer />
    </div>
  );
}

export default App;
