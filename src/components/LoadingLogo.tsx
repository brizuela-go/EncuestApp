import React from "react";

import Image from "next/image";

type Props = {};

const LoadingLogo: React.FC<Props> = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image
          src="/logo.png"
          alt="EncuestApp"
          width={100}
          height={100}
          priority={true}
          className="rounded-full"
        />
        <h1 className="animate-pulse text-2xl font-bold text-gray-800 dark:text-gray-100">
          Cargando...
        </h1>
      </div>
    </div>
  );
};

export default LoadingLogo;
