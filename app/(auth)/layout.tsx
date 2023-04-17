export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex justify-center items-center px-5">
      <div className="w-full md:w-2/3 h-2/3 flex flex-col items-center justify-center">
        <h1 className="text-h1 font-bold">brief-quiz</h1>
        {children}
      </div>
    </main>
  );
}
