import Image from "next/image";
import Link from "next/link";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="max-w-container mx-auto mt-32 mb-10 w-full px-4 sm:px-6 lg:px-8">
      <hr className="my-10 border-t border-gray-200 dark:border-gray-800" />
      <div className=" flex items-center justify-center space-x-3">
        <Image src="/logo.png" alt="EncuestApp" width={30} height={30} />
        <p className="text-sm font-semibold leading-6 text-slate-700 dark:text-gray-400">
          EncuestApp
        </p>
      </div>
      <p className="mt-5 text-center text-sm leading-6 text-slate-500 dark:text-gray-400">
        © {new Date().getFullYear()} EncuestApp. Todos los derechos reservados.
      </p>
      <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700 dark:text-gray-400">
        <Link href="/politica-de-privacidad">
          <button className="hover:underline" type="button">
            Política de Privacidad
          </button>
        </Link>
        <div className="h-4 w-px bg-slate-500/20"></div>
        <Link href="/documentacion">
          <button className="hover:underline" type="button">
            Documentación
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
