import Image from "next/image";
import Link from "next/link";
import {MouseEvent, useState} from "react";
import { signIn } from "next-auth/react";
import { Github, Google, LoadingDots } from "@/components/shared/icons";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query as { callbackUrl?: string };
  const [checked, setChecked] = useState(false);
  const [showRed, setRed] = useState(false);
  const [googleClicked, setGoogleClicked] = useState(false);
  const [githubClicked, setGitHubClicked] = useState(false);

  const onCheckboxClick = (e: any) => {
    e.target.checked && setRed(false);
    setChecked(e.target.checked)
  }

  return (
    <div className="flex w-screen justify-center">
      <div className="z-10 h-fit w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-900 sm:rounded-2xl sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center dark:border-gray-700 dark:bg-gray-900 sm:px-16">
          <Link href="/">
            <Image
              src="/join/logo.png"
              alt="CYF logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Sign in to CYF</h3>
          <p className="text-sm text-gray-500">
            Only your email and profile picture will be stored.
          </p>
        </div>
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-16">
          <button
            disabled={googleClicked}
            className={`${
              googleClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-700"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-700"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              if (!checked) {
                setRed(true);
                return;
              }
              setGoogleClicked(true);
              signIn("google", {
                ...(callbackUrl ? { callbackUrl } : {}),
              }).finally(() => {
                setGoogleClicked(false);
              });
            }}
          >
            {googleClicked ? (
              <LoadingDots />
            ) : (
              <>
                <Google className="h-5 w-5" />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
          <button
            disabled={githubClicked}
            className={`${
              githubClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-700"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-700"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              if (!checked) {
                setRed(true);
                return;
              }
              setGitHubClicked(true);
              signIn("github", {
                ...(callbackUrl ? { callbackUrl } : {}),
              }).finally(() => {
                setGitHubClicked(false);
              });
            }}
          >
            {githubClicked ? (
              <LoadingDots />
            ) : (
              <>
                <Github className="h-5 w-5" />
                <p>Sign In with GitHub</p>
              </>
            )}
          </button>
        </div>
        <div className="flex flex-row items-start justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-2 text-center dark:border-gray-700 dark:bg-gray-900 sm:px-16">
          <input checked={checked} type="checkbox" onClick={onCheckboxClick} className={`w-4 h-4 mt-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${showRed ? "border-red-400 border-2" : ""}`} />
          <p className="text-sm text-gray-500 mt-3">
            I have carefully read and agreed to <Link className="text-blue-500" href="/legal/privacy">Privacy Policy</Link>
            {" "}and <Link className="text-blue-500" href="/legal/terms-of-use">Terms and Conditions</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
