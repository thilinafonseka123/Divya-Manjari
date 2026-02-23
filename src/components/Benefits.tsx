import Image from "next/image";

const ingredients = [
    {
        name: "Red Onion Extract",
        description: "Rich in sulfur to prevent breakage and thinning, promoting stronger hair roots.",
        icon: "/icons/icon_red_onion_1771845493665.png",
    },
    {
        name: "Fresh Coconut",
        description: "Deeply hydrates the scalp and adds a natural, luminous shine to your hair.",
        icon: "/icons/icon_coconut_1771845511158.png",
    },
    {
        name: "Sweet Almond",
        description: "Packed with Vitamin E to nourish and repair damaged hair strands.",
        icon: "/icons/icon_almond_1771845563724.png",
    },
    {
        name: "Cooling Mint",
        description: "Refreshes the scalp, reduces dandruff, and improves blood circulation.",
        icon: "/icons/icon_mint_1771845542766.png",
    }
];

export default function Benefits() {
    return (
        <section className="relative w-full bg-[#f8f5ed] py-32 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
                        Nature&apos;s Finest Ingredients
                    </h2>
                    <p className="text-lg text-[#555] max-w-2xl mx-auto">
                        Every drop of Divya Manjari is infused with the holistic power of timeless herbal treasures. Handpicked for ultimate purity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ingredients.map((ingredient) => (
                        <div
                            key={ingredient.name}
                            className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            <div className="w-24 h-24 mb-6 relative rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src={ingredient.icon}
                                    alt={ingredient.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">
                                {ingredient.name}
                            </h3>
                            <p className="text-[#666] leading-relaxed text-sm">
                                {ingredient.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
