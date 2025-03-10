import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  linkClass: string;
}
const Dropdown = ({ label, items, linkClass }: DropdownProps) => {
  return (
    <div className="relative inline-block text-left group">
      {/* Dropdown Trigger (on hover) */}
      <Link
        href="#"
        className={`${linkClass} flex items-center justify-center`}
      >
        {label}
      </Link>

      {/* Dropdown Menu */}
      <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 hidden group-hover:block transition-all duration-200">
        {items.map((item, index) => (
          <div key={index} className="py-1">
            <a
              href={item.href}
              className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
