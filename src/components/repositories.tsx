import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import axios from "axios";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

declare module 'dayjs' {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string
  }
}

type RepositoryParams = {
  owner: string;
  accessData: string;
}

type Repository = {
  name: string;
  updated_at: string;
  visibility: string;
  description?: string;
  language?: string;
  watchers?: number;
};

export default function Repositories({ owner, accessData }: RepositoryParams) {

  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/repositories", {
        headers: {
          Authorization: "token " + accessData,
        },
      })
      .then((res) => {
        setRepositories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessData]);

  return (
    <ul className="ml-2 divide-y divide-gray-100">
      {repositories.map((repository) => (
        <li key={repository.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <Link to={`/branches/${owner}/${repository.name}`}>
                  {repository.name}
                </Link>
                <span className="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {repository.visibility}
                </span>
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{repository.description}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{repository.language}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last updated <time dateTime={repository.updated_at}>{dayjs(repository.updated_at).fromNow()}</time>
              </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
