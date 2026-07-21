import Image from "next/image";
import Link from "next/link";
import { PatientForm } from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <main className="flex min-h-dvh bg-dark-300">
      <section className="remove-scrollbar flex min-h-dvh flex-1 items-center overflow-y-auto px-[5%]">
        <div className="mx-auto w-full max-w-124 py-10">
          <Image
            src="assets/icons/logo-full.svg"
            height={162}
            width={40}
            alt="CarePulse"
            priority
            className="mb-12 h-10 w-auto"
          />

          <PatientForm />

          <footer className="mt-20 flex items-center justify-between text-sm">
            <p className="text-dark-600">© 2026 CarePulse</p>
            <Link
              href="/?admin=true"
              className="text-green-500 hover:underline"
            >
              Admin
            </Link>
          </footer>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="healthcare Professionals"
        priority
        className="hidden h-dvh w-1/2 object-cover md:block"
      />
    </main>
  );
}
