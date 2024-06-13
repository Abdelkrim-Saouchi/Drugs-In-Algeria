import imgSrc from "../assets/drugs-logo.svg";
const Header = () => {
  return (
    <header className="z-10 flex items-center border-b px-4 py-3 shadow">
      <img src={imgSrc} className="size-10" />
      <h1 className="text-xl font-bold md:text-2xl">Drugs in Algeria</h1>
    </header>
  );
};
export default Header;
