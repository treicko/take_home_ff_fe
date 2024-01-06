import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type CommitParams = {
  accessData: string  
}

type Commit = {
  sha: string;
  message: string;
}

export default function Commits({ accessData }: CommitParams) {

  let { owner, repo } = useParams();
  const [commitList, setCommitList] = useState<Commit[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/commits/${owner}/${repo}`, {
        headers: {
          Authorization: "token " + accessData,
        },
      })
      .then((res) => {
        setCommitList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessData, owner, repo]);

  return (
    <ul className="ml-2 divide-y divide-gray-100">
      {commitList.map((commit) => (
        <li key={commit.sha} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {commit.message}
              </p>
            </div>
          </div>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{commit.sha}</p>
        </li>
      ))}
    </ul>
  )
}
