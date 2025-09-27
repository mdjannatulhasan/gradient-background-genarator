"use client";

import { useState, useEffect } from "react";

interface GradientState {
	color1: string;
	color2: string;
	color3?: string;
	direction: string;
	angle: number;
	pattern: "linear" | "radial" | "conic";
	multipleStops: boolean;
}

const directions = [
	{ value: "to right", label: "→ Right" },
	{ value: "to left", label: "← Left" },
	{ value: "to bottom", label: "↓ Bottom" },
	{ value: "to top", label: "↑ Top" },
	{ value: "to bottom right", label: "↘ Bottom Right" },
	{ value: "to bottom left", label: "↙ Bottom Left" },
	{ value: "to top right", label: "↗ Top Right" },
	{ value: "to top left", label: "↖ Top Left" },
];

const presetGradients = [
	{ color1: "#667eea", color2: "#764ba2", color3: "#f093fb", name: "Purple Blue Pink", pattern: "linear" as const },
	{ color1: "#f093fb", color2: "#f5576c", color3: "#fa709a", name: "Pink Red", pattern: "linear" as const },
	{ color1: "#4facfe", color2: "#00f2fe", color3: "#43e97b", name: "Blue Cyan Green", pattern: "linear" as const },
	{ color1: "#43e97b", color2: "#38f9d7", color3: "#4facfe", name: "Green Teal", pattern: "radial" as const },
	{ color1: "#fa709a", color2: "#fee140", color3: "#ff9a9e", name: "Pink Yellow", pattern: "conic" as const },
	{ color1: "#a8edea", color2: "#fed6e3", color3: "#ffecd2", name: "Mint Pink", pattern: "linear" as const },
	{ color1: "#ff9a9e", color2: "#fecfef", color3: "#a8edea", name: "Coral Pink", pattern: "radial" as const },
	{ color1: "#ffecd2", color2: "#fcb69f", color3: "#fa709a", name: "Peach", pattern: "linear" as const },
	{ color1: "#667eea", color2: "#764ba2", color3: "#f093fb", name: "Sunset", pattern: "conic" as const },
	{ color1: "#4facfe", color2: "#00f2fe", color3: "#43e97b", name: "Ocean", pattern: "radial" as const },
	{ color1: "#fa709a", color2: "#fee140", color3: "#ff9a9e", name: "Tropical", pattern: "linear" as const },
	{ color1: "#a8edea", color2: "#fed6e3", color3: "#ffecd2", name: "Pastel", pattern: "conic" as const },
];

export default function GradientGenerator() {
	const [gradient, setGradient] = useState<GradientState>({
		color1: "#667eea",
		color2: "#764ba2",
		color3: "#f093fb",
		direction: "to right",
		angle: 90,
		pattern: "linear",
		multipleStops: true,
	});

	const [samples, setSamples] = useState<GradientState[]>([]);

	const [copied, setCopied] = useState(false);

	const generateGradientCSS = (gradientState: GradientState = gradient) => {
		const colors = gradientState.multipleStops && gradientState.color3 ? `${gradientState.color1}, ${gradientState.color2}, ${gradientState.color3}` : `${gradientState.color1}, ${gradientState.color2}`;

		switch (gradientState.pattern) {
			case "radial":
				return `radial-gradient(circle, ${colors})`;
			case "conic":
				return `conic-gradient(from ${gradientState.angle}deg, ${colors})`;
			case "linear":
			default:
				if (gradientState.direction.includes("deg")) {
					return `linear-gradient(${gradientState.angle}deg, ${colors})`;
				}
				return `linear-gradient(${gradientState.direction}, ${colors})`;
		}
	};

	const copyToClipboard = async () => {
		const css = `background: ${generateGradientCSS()};`;
		try {
			await navigator.clipboard.writeText(css);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const randomizeGradient = () => {
		const randomPreset = presetGradients[Math.floor(Math.random() * presetGradients.length)];
		const randomDirection = directions[Math.floor(Math.random() * directions.length)];
		const patterns: ("linear" | "radial" | "conic")[] = ["linear", "radial", "conic"];
		const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

		setGradient({
			color1: randomPreset.color1,
			color2: randomPreset.color2,
			color3: randomPreset.color3,
			direction: randomDirection.value,
			angle: Math.floor(Math.random() * 360),
			pattern: randomPattern,
			multipleStops: true,
		});
	};

	const generateRandomSamples = () => {
		const newSamples: GradientState[] = [];
		for (let i = 0; i < 6; i++) {
			const randomPreset = presetGradients[Math.floor(Math.random() * presetGradients.length)];
			const randomDirection = directions[Math.floor(Math.random() * directions.length)];
			const patterns: ("linear" | "radial" | "conic")[] = ["linear", "radial", "conic"];
			const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

			newSamples.push({
				color1: randomPreset.color1,
				color2: randomPreset.color2,
				color3: randomPreset.color3,
				direction: randomDirection.value,
				angle: Math.floor(Math.random() * 360),
				pattern: randomPattern,
				multipleStops: true,
			});
		}
		setSamples(newSamples);
	};

	const applySample = (sample: GradientState) => {
		setGradient(sample);
	};

	const applyPreset = (preset: (typeof presetGradients)[0]) => {
		setGradient((prev) => ({
			...prev,
			color1: preset.color1,
			color2: preset.color2,
			color3: preset.color3,
			pattern: preset.pattern,
		}));
	};

	// Generate initial samples on component mount
	useEffect(() => {
		generateRandomSamples();
	}, []);

	return (
		<div className="max-w-7xl mx-auto">
			{/* Main Preview and Controls */}
			<div className="grid lg:grid-cols-2 gap-8 mb-8">
				{/* Preview */}
				<div className="space-y-6">
					<div className="gradient-preview w-full" style={{ background: generateGradientCSS() }} />

					{/* CSS Output */}
					<div className="control-panel p-6">
						<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">CSS Code</h3>
						<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
							<code className="text-gray-800 dark:text-gray-200">background: {generateGradientCSS()};</code>
						</div>
						<button onClick={copyToClipboard} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
							{copied ? "✓ Copied!" : "📋 Copy CSS"}
						</button>
					</div>
				</div>

				{/* Controls */}
				<div className="space-y-6">
					{/* Color Controls */}
					<div className="control-panel p-6">
						<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Colors</h3>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color 1</label>
								<div className="flex items-center space-x-3">
									<input type="color" value={gradient.color1} onChange={(e) => setGradient((prev) => ({ ...prev, color1: e.target.value }))} className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer" />
									<input type="text" value={gradient.color1} onChange={(e) => setGradient((prev) => ({ ...prev, color1: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color 2</label>
								<div className="flex items-center space-x-3">
									<input type="color" value={gradient.color2} onChange={(e) => setGradient((prev) => ({ ...prev, color2: e.target.value }))} className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer" />
									<input type="text" value={gradient.color2} onChange={(e) => setGradient((prev) => ({ ...prev, color2: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color 3 (Optional)</label>
								<div className="flex items-center space-x-3">
									<input type="color" value={gradient.color3 || "#f093fb"} onChange={(e) => setGradient((prev) => ({ ...prev, color3: e.target.value }))} className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer" />
									<input type="text" value={gradient.color3 || ""} onChange={(e) => setGradient((prev) => ({ ...prev, color3: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="#f093fb" />
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<input type="checkbox" id="multipleStops" checked={gradient.multipleStops} onChange={(e) => setGradient((prev) => ({ ...prev, multipleStops: e.target.checked }))} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
								<label htmlFor="multipleStops" className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Use 3 colors
								</label>
							</div>
						</div>
					</div>

					{/* Pattern Controls */}
					<div className="control-panel p-6">
						<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Pattern Type</h3>

						<div className="grid grid-cols-3 gap-2 mb-4">
							{["linear", "radial", "conic"].map((pattern) => (
								<button key={pattern} onClick={() => setGradient((prev) => ({ ...prev, pattern: pattern as "linear" | "radial" | "conic" }))} className={`p-3 rounded-lg text-sm font-medium transition-colors duration-200 capitalize ${gradient.pattern === pattern ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
									{pattern}
								</button>
							))}
						</div>
					</div>

					{/* Direction Controls */}
					<div className="control-panel p-6">
						<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Direction</h3>

						<div className="grid grid-cols-2 gap-2">
							{directions.map((dir) => (
								<button key={dir.value} onClick={() => setGradient((prev) => ({ ...prev, direction: dir.value }))} className={`p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${gradient.direction === dir.value ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
									{dir.label}
								</button>
							))}
						</div>

						<div className="mt-4">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Angle: {gradient.angle}°</label>
							<input
								type="range"
								min="0"
								max="360"
								value={gradient.angle}
								onChange={(e) =>
									setGradient((prev) => ({
										...prev,
										angle: parseInt(e.target.value),
										direction: `${e.target.value}deg`,
									}))
								}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
					</div>

					{/* Presets */}
					<div className="control-panel p-6">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-white">Presets</h3>
							<button onClick={randomizeGradient} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
								🎲 Random
							</button>
						</div>

						<div className="grid grid-cols-2 gap-3">
							{presetGradients.map((preset, index) => (
								<button
									key={index}
									onClick={() => applyPreset(preset)}
									className="p-3 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105"
									style={{
										background: preset.pattern === "radial" ? `radial-gradient(circle, ${preset.color1}, ${preset.color2}, ${preset.color3})` : preset.pattern === "conic" ? `conic-gradient(from 0deg, ${preset.color1}, ${preset.color2}, ${preset.color3})` : `linear-gradient(to right, ${preset.color1}, ${preset.color2}, ${preset.color3})`,
									}}
								>
									<span className="text-white drop-shadow-lg">{preset.name}</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Gradient Samples */}
			<div className="control-panel p-6">
				<div className="flex justify-between items-center mb-6">
					<h3 className="text-xl font-semibold text-gray-800 dark:text-white">Gradient Samples</h3>
					<button onClick={generateRandomSamples} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
						🎨 Generate New Samples
					</button>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{samples.map((sample, index) => (
						<div key={index} className="space-y-2">
							<div className="w-full h-24 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-lg" style={{ background: generateGradientCSS(sample) }} onClick={() => applySample(sample)} />
							<div className="text-xs text-center text-gray-600 dark:text-gray-400">
								{sample.pattern} • {sample.multipleStops ? "3 colors" : "2 colors"}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
