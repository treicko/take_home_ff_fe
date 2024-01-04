import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import SignIn from './components/singin/singin';
import Navbar from './components/navbar/navbar';

type User = {
  avatar_url?: string;
  html_url?: string;
};

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({});
  const [githubUrl, setGithubUrl] = useState("");
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );
    axios
      .get("http://localhost:8080/user/data", {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
      const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:8080/oauth/redirect`;
      console.log("githubUrl: ", gitHubUrl);
      setGithubUrl(gitHubUrl);
  }, []);

  return (
    <div className="App text-center container-fluid">
      {!loggedIn ? (
        <SignIn githubUrl={githubUrl} />
      ) : (
        <Navbar githubUser={user} />
      )}
    </div>
  );
}

export default App;
