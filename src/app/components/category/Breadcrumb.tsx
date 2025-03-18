import Link from "next/link";

const Breadcrumb = () => {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link href="/">Accueil</Link> &gt; <span className="text-blue-600">Transmission</span>
    </nav>




  );
};

export default Breadcrumb;
