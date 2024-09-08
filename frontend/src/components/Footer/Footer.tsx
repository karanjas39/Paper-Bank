function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="text-muted-foreground bg-neutral-900 w-full flex sm:items-center items-start sm:justify-between sm:flex-row flex-col gap-1  text-sm p-1">
      <p>Copyright &copy; {year} | All rights reserved.</p>
      <p>
        Developed and designed by{" "}
        <a
          href="https://developerjaskaran.netlify.app/"
          target="_blank"
          className="text-col1 font-bold"
        >
          Jaskaran Singh
        </a>
      </p>
    </div>
  );
}

export default Footer;
