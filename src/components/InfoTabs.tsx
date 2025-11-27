'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Info, FileText, Database, TrendingUp } from 'lucide-react';

// Define the data structure for the tabs
interface InfoTab {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

const InfoTabs = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    // Placeholder data
    const tabs: InfoTab[] = [
        {
            id: 'about',
            title: 'What are Tariffs?',
            icon: <Info size={20} />,
            content: (
                <div className="space-y-4">
                    <p>
                        As most countries face limitations regarding their natural resources and ability to produce products and services, they engage in trade with other countries to attain goods and services needed to appease what their population demands. Although in paper, this might be beneficial for all parties involved, trade is not always conducted in a compliant manner between trading partners. Several factors including geopolitics, competition, economics, diplomatic relations, and policies, often affect the relationship between the trading partners. The way the government handles the disagreements is through incorporating tariffs.
                    </p>
                    <p>
                        Tariffs refer to duties levied on the imports of goods into a country. They are a form of tax, imposed by one country on the goods and services imported from another in order to influence and impact revenues and protect competitive advantages. They are identified in the form of percentage rates and are dependent on two major factors: Country of origin, and Type of Product imported. Additionally, tariffs are intended to protect domestic industries by leveling the playing field between the domestic and foreign producers by counteracting cost advantages, low labor, low production costs, different environmental standards, and foreign subsidies of the government.
                    </p>
                    <p>
                        Generally, there are two basic types of tariffs: Specific Tariffs, and Ad Valorem Tariffs. Specific Tariffs are levied on a product regardless of that particular product’s value. It depends on the number of units or weight of the imported product rather than the value itself. This kind of tariff is calculated in monetary figures, meaning it could levy a specific number on a specific product. Ad Valorem Tariffs on the other hand, takes into consideration the product’s import value, and are often classified in the form of percentage rates.
                    </p>
                </div>
            ),
        },
        {
            id: 'methodology',
            title: 'Trump Tariffs and ASEAN',
            icon: <FileText size={20} />,
            content: (
                <div className="space-y-4">
                    <p>
                        The Trump tariffs, which represent a significant, widespread tax hike on imported goods intended to uphold an "America First" agenda, reflect a significant change in U.S. trade policy. The application of "reciprocal tariffs," which serve as a baseline levy on the majority of international trading partners and are frequently linked to a nation's trade surplus with the United States, is the primary instrument. The goal of these tariffs, most of which are set up as ad valorem levies, is to promote home manufacturing, lower the total U.S. trade imbalance, and force other countries to open their markets to American goods. Although the administration claims that this helps American workers and businesses, American importers and consumers bear the financial burden of the tariffs, which raises the price of everything from raw materials to completed items.
                    </p>
                    <p>
                        The Trump tariffs present a number of important strategic opportunities for the Association of Southeast Asian Nations (ASEAN) member states. Since most major ASEAN economies, including Vietnam, Malaysia, Thailand, and Indonesia, have agreed to negotiated reciprocal tariff rates in the region of 19% to 20% for their commodities entering the United States, the main issue is the sharp rise in export costs. The competitiveness of their export-dependent industries, such electronics, textiles, and furniture, is immediately strained by this high cost. In order to stay competitive in their biggest export market, businesses must either absorb the tariff, pass the cost on to American consumers, or look for ways to decrease costs. Their rapid economic growth, which has been mostly reliant on trade, could be slowed by the uncertainty and high levies.
                    </p>
                    <p>
                        To gain a better perspective about Trump Tariffs, imagine an iPhone costs about Php 10,000 but if you impose import tariffs of around Php 1,000 for each IPhone, the price rises to Php 11,000. This is paid by the firms who import the product but to keep their revenue they will raise the price of IPhones to 11,000. As their profit margins rely on markups, businesses frequently decide to pass on a significant amount of the increased cost of important goods to consumers rather than absorb it. According to a report by the Federal Reserve Bank of Boston, many producers and manufacturers add their standard markups on top of the increased import cost, increasing the final price that customers must pay. Countries retaliate by imposing tariffs themselves inflating the price of internationally traded goods and services. Since the US is a major economy, several countries trade with them be it computer parts, agriculture, or others. By raising the costs of exporting to the US, they take away the possible revenue that would have flown to the exporting country. Countries respond by imposing tariffs themselves to make the US worse off, like a Chicken Game in Game Theory. Retaliatory tariffs compel businesses to reassess and reorganize their international supply chains, which frequently results in higher costs and uncertainty. Experts note that tariffs force businesses to diversify their suppliers, nearshore or reshoring production, and take on the administrative burden of compliance, all of which increase costs and sabotage current trade relations (Bertin & Ferguson, 2025).
                    </p>
                    <p>
                        The price of commodities goes up but also the raw materials used to make final goods and services also goes up inflating the price even more. The US does not only import finished goods but also essential raw materials like copper and nickel to produce their computers and microchips. Raising the price of imports leads to rising costs in production that would in effect raise prices because of the more scarce resources
                    </p>
                </div>
            ),
        },
        {
            id: 'sources',
            title: 'Why Trump Tariffs?',
            icon: <Database size={20} />,
            content: (
                <div className="space-y-4">
                    <p>
                        Viewing these tariffs as essential for the country's economic security, the Trump administration implemented them with the claimed objectives of shielding domestic businesses from lower-priced imports and resolving ongoing trade deficits. By utilizing import duties as leverage to compel trading partners into reciprocal agreements that benefit the U.S. economy, this policy represents a deliberate transition from the post-war free-market system to a mercantile system. Global supply chains are disrupted, and consumers everywhere pay more for goods and services as a result of this protectionist strategy.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Cambodia:</strong> Faced an initial tariff rate of around 49% due to heavy reliance on U.S. exports and long-standing American concerns over labor abuses, human rights, and Cambodia's growing alignment with China.
                        </li>

                        <li>
                            <strong>Brunei, Laos, and Myanmar:</strong> Despite having low trade volumes with the U.S., these countries received some of the highest final reciprocal tariff rates globally, indicating that geopolitical motives outweighed trade considerations.
                        </li>

                        <li>
                            <strong>The Philippines & Indonesia:</strong> Both countries were initially threatened with high reciprocal tariffs. Indonesia received 32%, while the Philippines received 20% due to their trade surpluses with the U.S. and their roles as key manufacturing hubs.
                        </li>

                        <li>
                            <strong>Singapore:</strong> A major outlier. Because it runs a persistent trade deficit with the U.S., it was only subjected to the universal 10% baseline tariff rather than higher reciprocal rates aimed at surplus countries.
                        </li>

                        <li>
                            <strong>Thailand & Malaysia:</strong> Both countries were threatened with high Ad Valorem Tariff rates—36% for Thailand and 24% for Malaysia—due to their substantial trade surpluses and integration into global supply chains.
                        </li>

                        <li>
                            <strong>Vietnam:</strong> Received one of the highest tariffs, reportedly up to 46%, due to running one of the largest goods trade surpluses with the U.S. The Trump administration viewed this rapid and persistent deficit as evidence of market closure and non-reciprocal trade.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'future',
            title: 'Future Implications',
            icon: <TrendingUp size={20} />,
            content: (
                <div className="space-y-4">
                    <p>
                        The tariff negotiations between the US and Southeast Asian countries reveal that Trump’s tariffs are used for both economic interest in “protecting local businesses and products” and for political reasons, specifically in reducing China’s influence in Southeast Asia. Furthermore, one of the US’s main reasons for imposing tariffs was to reduce the trade surplus of countries, however countries like Singapore already had trade deficits with the US yet still face tariffs which further supports the underlying reason motivating these tariffs besides economic protection. From these actions, we can infer that international trade is no longer about a free market as described by Adam Smith that emphasized mutual gains, minimal government interference, and maximum benefit for consumers and producers. Instead, international trade now shifts towards a game of strategic and politically motivated actions based on geopolitics, bargaining power, and national security interests shifting a once free international trade market into mercantilism where the consumers suffer the most.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <>
            {/* Sidebar Tabs */}
            <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 pl-2 pointer-events-auto">
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        layoutId={`tab-${tab.id}`}
                        onClick={() => setActiveTab(tab.id)}
                        className="group flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-r-xl hover:bg-blue-900/40 hover:border-blue-500/50 transition-colors shadow-lg cursor-pointer text-left"
                        whileHover={{ x: 5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                            {tab.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white hidden md:block">
                            {tab.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </motion.button>
                ))}
            </div>

            {/* Expanded Content Modal */}
            <AnimatePresence>
                {activeTab && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveTab(null)}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* Content Card */}
                        <motion.div
                            layoutId={`tab-${activeTab}`}
                            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto m-4"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="text-blue-400">
                                        {tabs.find((t) => t.id === activeTab)?.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-white">
                                        {tabs.find((t) => t.id === activeTab)?.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setActiveTab(null)}
                                    className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto">
                                {tabs.find((t) => t.id === activeTab)?.content}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default InfoTabs;
