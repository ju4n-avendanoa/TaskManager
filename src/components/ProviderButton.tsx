import { useErrorStore } from "@/store/errorStore";
import { signIn } from "next-auth/react";
import Image from "next/image";

function ProviderButton({
  provider,
  imagesrc,
}: {
  provider: string;
  imagesrc: string;
}) {
  const formatedProvider = provider.toLowerCase();

  const { setError, setErrorMessage } = useErrorStore();

  const handleLogin = async () => {
    try {
      setError(false);
      const res = await signIn(formatedProvider, {
        callbackUrl: "/",
      });

      if (res?.ok) {
        setError(true);
        setErrorMessage(res.error!);
        return;
      }
    } catch (error: any) {
      console.error({ message: error });
    }
  };

  return (
    <button
      className="flex bg-zinc-500 text-white font-semibold items-center gap-4 px-4 py-3 rounded-lg hover:bg-zinc-600 transition active:scale-95 duration-150"
      onClick={() => handleLogin()}
    >
      <Image
        src={imagesrc}
        alt="logo"
        width={30}
        height={30}
        className="bg-white p-1 rounded-full"
      />
      <span>Continue with {provider}</span>
    </button>
  );
}

export default ProviderButton;
