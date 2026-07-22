import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

type RegisterPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const Register = async ({ params }: RegisterPageProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <main className="flex min-h-dvh bg-dark-300">
      <section className="remove-scrollbar flex min-h-dvh flex-1 items-center overflow-y-auto px-[5%]">
        <div className="mx-auto w-full max-w-none py-10 xl:max-w-[min(100%,58rem)]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={162}
            width={40}
            alt="CarePulse"
            priority
            className="mb-12 h-10 w-auto"
          />

          <RegisterForm user={user} />

          <footer className="mt-20 flex items-center justify-between text-sm">
            <p className="text-dark-600">&copy; 2026 CarePulse</p>
            <Link
              href="/?admin=true"
              className="text-green-500 hover:underline"
            >
              Admin
            </Link>
          </footer>
        </div>
      </section>

      <section className="sticky top-0 hidden h-screen w-1/2 self-start md:block">
        <Image
          src="/assets/images/register-img.png"
          alt="healthcare Professionals"
          priority
          fill
          sizes="50vw"
          className="object-cover"
        />
      </section>
    </main>
  );
};

export default Register;
