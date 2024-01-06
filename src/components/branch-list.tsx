import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type BranchParams = {
  accessData: string  
}

type Commit = {
  sha: string;
  url: string;
}

type Branch = {
  name: string;
  commit: Commit;
  protected: boolean;
};

export default function Branches({ accessData }: BranchParams) {

  let { owner, repo } = useParams();
  const [branchList, setBranchList] = useState<Branch[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/branches/${owner}/${repo}`, {
        headers: {
          Authorization: "token " + accessData,
        },
      })
      .then((res) => {
        setBranchList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessData, owner, repo]);

  return (
    <ul className="ml-2 divide-y divide-gray-100">
      {branchList.map((brach) => (
        <li key={brach.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {brach.name}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Last commit: {brach.commit.sha}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
