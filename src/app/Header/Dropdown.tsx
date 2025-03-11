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
    <div className="relative inline-block group">
      {/* Dropdown Trigger with underline animation */}
      <Link
        href="#"
        className={`${linkClass} flex items-center justify-center px-4 py-2 text-sm font-semibold text-[#4a4a4a] relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0c1424] after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full`}
      >
        {label}
      </Link>

      {/* Dropdown Menu with enhanced styling */}
      <div className="absolute left-0 z-[1000] mt-1 w-[200px] origin-top-left rounded-md bg-white shadow-[0_4px_8px_rgba(12,20,36,0.15)] hidden group-hover:block transition-all duration-200 border-2 border-[#3b73bf] border-t-[3px] py-2">
        {items.map((item, index) => (
          <div key={index}>
            <a
              href={item.href}
              className="block px-4 py-2 text-sm text-[#4a4a4a] hover:bg-[#f5f5f5] hover:text-[#0c1424] transition-all duration-200 ease-in-out border-l-0 hover:border-l-[6px] hover:border-l-[#3b73bf]"
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