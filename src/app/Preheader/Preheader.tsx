import { Disclosure } from '@headlessui/react'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import { PhoneCall } from 'lucide-react'

interface NavItem {
  name: string
  href: string
  current: boolean
}

const navigation: NavItem[] = [
  { name: 'Qui sommes-nous ?', href: 'https://www.rubix-group.com/', current: true },
  { name: '(+33) 3 23 75 08 28', href: '#', current: false },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

const Preheader: FunctionComponent = () => {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-8 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      'rounded-md px-3 py-1.5 text-sm font-medium flex items-center gap-1.5'
                    )}
                  >
                    {item.name === '(+33) 3 23 75 08 28' && (
                      <PhoneCall size={16} className="shrink-0" />
                    )}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Preheader