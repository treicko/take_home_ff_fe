
function SignIn({ githubUrl } : { githubUrl : string }) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in with GitHub
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">          
          <a
            href={githubUrl}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </a>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="https://github.com/join" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create a GitHub account
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn