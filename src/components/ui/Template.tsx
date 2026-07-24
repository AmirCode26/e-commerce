import Nav from "../nav/Nav";
//import Side from "../side/Side";

function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-full overflow-y-scroll ">
      <Nav />
      {children}
    </div>
  );
}

export default Template;
