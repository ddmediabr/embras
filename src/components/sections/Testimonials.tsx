export default function Testimonials() {
	const testimonials = [
		{
			text: 'A Embras não instalou apenas luzes em nossa fazenda; eles criaram uma atmosfera que mudou completamente nossa relação com o espaço ao anoitecer.',
			author: 'Ricardo A., Fazenda Aurora',
		},
		{
			text: 'Precisão técnica e um olhar estético impecável. O projeto luminotécnico superou todas as nossas expectativas e valorizou cada detalhe da arquitetura.',
			author: 'Beatriz M., Mansão Alpha',
		},
	]

	return (
		<section className="py-36 px-8 bg-(--color-surface)/20 border-t border-(--color-surface)">
			<div className="max-w-4xl mx-auto flex flex-col gap-32">
				<span className="text-(--color-muted) uppercase tracking-[0.4em] text-xs text-center italic mb-12">
					Clients Voices
				</span>

				{testimonials.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center text-center gap-12"
					>
						<span className="text-6xl font-(--font-heading) text-(--color-surface)">
							"
						</span>
						<blockquote className="text-2xl md:text-4xl leading-snug font-(--font-body) italic text-(--color-accent)/90">
							{item.text}
						</blockquote>
						<cite className="text-xs uppercase tracking-[0.5em] text-(--color-muted) not-italic font-medium">
							— {item.author}
						</cite>
					</div>
				))}
			</div>
		</section>
	)
}
