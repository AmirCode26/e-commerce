import Nav from "../nav/Nav";

function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <Nav />
      {children}
    </div>
  );
}
export default Template;
