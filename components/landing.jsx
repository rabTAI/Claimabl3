import Image
    from "next/image";
export default function Landing({ setScreen }) {
    return (
        <>
            <h1 className="text-6xl mx-6">Discover &</h1>
            <Image
                src={"/claim.png"}
                alt="Explore"
                width={171}
                height={48}
                className="ml-2"
            />
            <Image
                src={"/explore.png"}
                alt="Explore"
                width={100}
                height={100}
                className="inline ml-2"
            />
            <button
                className="fixed inline-block text-lg group bottom-8"
                onClick={() => setScreen('discover')}
            >
                <span className="relative bg-primary z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span className="relative">Discover Denver</span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </button>
        </>
    );
}