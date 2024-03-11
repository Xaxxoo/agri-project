import { GlobeEuropeAfricaIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";

const features = [
  {
    name: "Africa First",
    description:
      "At Aduna Capital, we are rooted in local values with a Pan-African investment vision, always seeking startups with global potential.",
    href: "#",
    icon: GlobeEuropeAfricaIcon,
  },
  {
    name: "Geographical Advantage",
    description:
      "We are tapping into Northern Nigeria, a region brimming with growth and untapped potential. Simultaneously, we're addressing the funding gap for female-led startups across Nigeria and Africa",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Best Team",
    description:
      "Our strength lies in our expert management team, seasoned in both tech and business. Further bolstered by an extensive advisory team, Aduna Capital is uniquely positioned to drive innovation and growth",
    href: "#",
    icon: UserGroupIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-blue-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Targeted Investment Strategy
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our investment strategy is meticulously crafted to support
            early-stage, tech-enabled startups with the potential for high
            growth and scalability. We prioritize ventures that demonstrate a
            clear path to sustainability and profitability, with a particular
            emphasis on supporting female founders and underserved regions,
            starting with Northern Nigeria.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    {/* <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
                      Learn more <span aria-hidden="true">→</span>
                    </a> */}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
