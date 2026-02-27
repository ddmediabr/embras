import HeroProductsWrapper from '@/components/sections/HeroProductsWrapper'
import ProductLines from '@/components/sections/ProductLines'
import MissionManifesto from '@/components/sections/MissionManifesto'
import SuccessCases from '@/components/sections/SuccessCases'
import WhoWeAre from '@/components/sections/WhoWeAre'
import Testimonials from '@/components/sections/Testimonials'
import ContactSection from '@/components/sections/ContactSection'

// New Proposal Sections
import PersonalGreeting from '@/components/proposal/PersonalGreeting'
import ProposalHero from '@/components/proposal/ProposalHero'
import WhatYouGet from '@/components/proposal/WhatYouGet'
import ProposalCTA from '@/components/proposal/ProposalCTA'
import NextSteps from '@/components/proposal/NextSteps'
import ProposalFinalCTA from '@/components/proposal/ProposalFinalCTA'

export default function Home() {
	return (
		<main className="min-h-screen bg-(--color-bg)">
			{/* --- NEW SECTIONS ABOVE --- */}
			<PersonalGreeting />
			<ProposalHero />
			<WhatYouGet />

			{/* --- EXISTING PROJECT DEMONSTRATION --- */}
			<div id="project-preview">
				<HeroProductsWrapper />
				<ProductLines />
				<SuccessCases />
				<WhoWeAre />
				<Testimonials />
				<ContactSection />
			</div>

			{/* --- NEW SECTIONS BELOW --- */}
			<ProposalCTA />
			<NextSteps />
			<ProposalFinalCTA />

			{/* Final Minimal Footer */}
			<footer className="py-20 px-8 border-t border-(--color-surface) bg-(--color-bg)">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex items-center gap-2">
						<span className="w-1.5 h-1.5 bg-white rounded-full" />
						<span className="font-(--font-heading) uppercase tracking-[0.4em] text-[10px] text-white">
							Embras Lighting
						</span>
					</div>

					<p className="text-(--color-muted) text-[10px] tracking-[0.3em] uppercase">
						&copy; 2024 Embras. Built with precision and light.
					</p>

					<div className="flex gap-8">
						{['Instagram', 'LinkedIn', 'Pinterest'].map(
							(social) => (
								<a
									key={social}
									href="#"
									className="text-(--color-muted) text-[10px] tracking-widest uppercase hover:text-(--color-accent) transition-colors"
								>
									{social}
								</a>
							)
						)}
					</div>
				</div>
			</footer>
		</main>
	)
}
