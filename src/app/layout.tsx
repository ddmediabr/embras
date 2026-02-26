import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll'
import CustomCursor from '@/components/atoms/CustomCursor'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

const outfit = Outfit({
	variable: '--font-outfit',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Embras Premium Lighting | Iluminação Arquitetônica de Alto Padrão',
	description:
		'Especialistas em projetos de iluminação para mansões, casas luxuosas e fazendas. A luz esculpida para os espaços mais exclusivos.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${inter.variable} ${outfit.variable} antialiased bg-black`}
			>
				<SmoothScroll>
					<CustomCursor />
					{children}
				</SmoothScroll>
			</body>
		</html>
	)
}
