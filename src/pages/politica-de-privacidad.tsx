import { NextPage } from "next";
import Link from "next/link";

import { FaWhatsapp } from "react-icons/fa";
import { Layout } from "../components";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";

type Props = {};

const PrivacyPolicy: NextPage<Props> = () => {
  const AuthUser = useAuthUser();
  return (
    <>
      <Layout
        title="Política de Privacidad"
        description="Política de Privacidad de EncuestApp"
        AuthUser={AuthUser}
      >
        <div className="background-svg absolute inset-x-0 -top-40   transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4BC5E3" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)]   transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4BC5E3" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute inset-x-0  top-[calc(100%+50rem)] transform-gpu overflow-hidden blur-3xl  sm:top-[calc(100%+14rem)] ">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4BC5E3" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%+120rem)]  transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%+60rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4BC5E3" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <section className="entrance relative mt-24 overflow-hidden ">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-[37.5rem] pt-20 pb-24 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                Política de Privacidad
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                Última actualización: 19 de marzo de 2023
              </p>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="prose-sm prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 justify-small-devices prose mx-auto max-w-[40rem] space-y-10">
              <p className=" text-sm">
                En EncuestApp, estamos comprometidos a proteger su privacidad y
                garantizar la seguridad de su información personal. Esta
                Política de privacidad describe la información que recopilamos,
                cómo la usamos y cómo la protegemos. Al utilizar nuestros
                servicios, usted acepta que recopilemos y usemos su información
                de acuerdo con esta Política de privacidad.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Información que recopilamos
              </h2>
              <p className=" text-sm">
                Recopilamos información personal, como su nombre, dirección de
                correo electrónico y/o proveedor (Google, Facebook o Github),
                cuando se registra en nuestros servicios. También podemos
                recopilar información adicional propiciada en la creación y
                consumo de encuestas. Sólo utilizaremos su información personal
                para los fines para los que fue recopilada y no la compartiremos
                con terceros sin su consentimiento, ni mucho menos la
                venderemos. Cabe destacar que no almacenamos ninguna información
                de pago, ni contraseñas en nuestra base de datos.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Recopilación de información no personal
              </h2>
              <p className=" text-sm">
                Podemos recopilar información no personal, como su dirección IP,
                el tipo de navegador y el tipo de dispositivo que utiliza, para
                ayudarnos a mejorar nuestros servicios y brindar una mejor
                experiencia de usuario.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Compras y Suscripciones
              </h2>
              <div className=" text-sm">
                EncuestApp utiliza{" "}
                <Link
                  href="https://stripe.com"
                  className="underline hover:text-sky-500 dark:hover:text-sky-600"
                >
                  Stripe
                </Link>{" "}
                para los pagos de suscripción. Stripe es una pasarela de pago
                segura que maneja todo el procesamiento de pagos en nuestro
                nombre. Actualmente, la tenemos en modo de prueba, por lo tanto,
                no se realiza ninguna transacción real. No almacenamos ninguna
                información de pago en nuestra base de datos.
              </div>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Uso y procesamiento de la información recopilada
              </h2>
              <p className=" text-sm">
                Usamos su información personal para brindarle nuestros servicios
                y comunicarnos con usted acerca de estos. También podemos
                utilizar su información con fines de investigación y análisis
                para mejorar nuestra plataforma. No venderemos ni alquilaremos
                su información personal a terceros.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Cookies 🍪
              </h2>
              <p className=" text-sm">
                EncuestApp utiliza cookies para mejorar nuestros servicios y
                brindar una mejor experiencia al usuario. Las cookies son
                pequeños archivos de texto que se almacenan en su dispositivo
                cuando accede a nuestro sitio web. Puede controlar el uso de
                cookies ajustando la configuración de su navegador.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Enlaces a otros sitios web
              </h2>
              <p className=" text-sm">
                Nuestro sitio web puede contener enlaces a otros sitios web. No
                somos responsables de las prácticas de privacidad ni del
                contenido de esos sitios web. Le recomendamos que revise las
                políticas de privacidad de esos sitios web antes de proporcionar
                cualquier información personal.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Seguridad de la información
              </h2>
              <p className=" text-sm">
                Tomamos medidas razonables para proteger su información personal
                del acceso, uso y divulgación no autorizados. Utilizamos
                tecnologías de seguridad estándar de la industria, como el
                cifrado SSL, para proteger su información personal en línea. Así
                mismo, las contraseñas de su cuenta están protegidas con un
                algoritmo de encriptación.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Cambios y enmiendas
              </h2>
              <p className=" text-sm">
                Es posible que actualicemos esta Política de privacidad de vez
                en cuando. Le notificaremos cualquier cambio publicando la nueva
                Política de privacidad en nuestro sitio web. Le recomendamos que
                revise esta Política de privacidad periódicamente.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Aceptación de esta Política
              </h2>
              <p className=" text-sm">
                Al usar nuestros servicios, usted acepta la recopilación y el
                uso de su información personal como se describe en este texto.
              </p>
              <h2 className="text-[1.4285714em] font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
                Contáctenos
              </h2>
              <div className="text-sm">
                Si tiene alguna pregunta sobre esta Política de privacidad o
                nuestras prácticas, comuníquese con nosotros a{" "}
                <Link
                  href="mailto:182559@iberopuebla.mx"
                  className=" text-sky-500 hover:text-sky-600 "
                >
                  182030@iberopuebla.mx
                </Link>{" "}
                o por medio de nuestro
                <Link
                  href="https://wa.me/5212223247857"
                  className=" inline-block text-green-500 hover:text-green-600"
                >
                  {" "}
                  <div className="flex flex-row items-center justify-center gap-x-1">
                    <FaWhatsapp className=" ml-2" />
                    WhatsApp
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default withAuthUser<any>({
  whenAuthed: AuthAction.RENDER,
})(PrivacyPolicy);
