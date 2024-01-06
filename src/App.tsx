import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import SignIn from './components/singin/singin';
import Navbar from './components/navbar/navbar';
import Repositories from "./components/repositories";
import Branches from "./components/branch-list";
import Commits from "./components/commit-list";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

type User = {
  avatar_url?: string;
  html_url?: string;
  login?: string;
};

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({});
  const [githubUrl, setGithubUrl] = useState("");
  const [accessData, setAccessData] = useState("");
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
        setAccessData(token || "");
      })
      .catch((error) => {
        console.log(error);
      });
      const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:8080/oauth/redirect`;
      console.log("githubUrl: ", gitHubUrl);
      setGithubUrl(gitHubUrl);
  }, []);

  return (
    <>
      <BrowserRouter>
        {!loggedIn ? (
          <div className="App text-center container-fluid">
            <SignIn githubUrl={githubUrl} />
            </div>
        ) : (
          <>
            <div className="min-h-full">
              <Navbar githubUser={user} />
              <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
              </header>
              <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                  {/* Your content */}
                  {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                  <Routes>
                    <Route path="/" element={<Repositories owner={user.login || ""} accessData={accessData}/>} />
                    <Route path="/repositories/:owner" element={<Repositories owner={user.login || ""} accessData={accessData} />} />
                    <Route path="/branches/:owner/:repo" element={<Branches accessData={accessData}/>} />
                    <Route path="/commits/:owner/:repo" element={<Commits accessData={accessData}/>} />
                  </Routes>
                </div>
              </main>
            </div>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
