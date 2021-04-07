import './App.css';
import socket from './api/socket-config'
import EntryForm from "./components/EntryForm/EntryForm";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import {observer} from "mobx-react-lite";
import chatStore from "./store/chatStore";

function App() {
  const {isAuth} = chatStore

  return (
    <div className="App">
      {!isAuth ? (
        <EntryForm />
      ) : (
        <ChatContainer/>)
      }
    </div>
  );
}

export default observer(App);
