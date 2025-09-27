"use client";

import { useState } from "react";
import GradientGenerator from "@/components/GradientGenerator";

export default function Home() {
	return (
		<main className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Gradient Background Generator</h1>
					<p className="text-xl max-w-2xl mx-auto">Create beautiful gradient backgrounds for your projects. Customize colors, direction, and more!</p>
				</div>

				<GradientGenerator />
			</div>
		</main>
	);
}
