"use client";

import { useState } from "react";

interface ColorInputProps {
	colors: string[];
	onColorsChange: (colors: string[]) => void;
	onGenerateHarmonious: () => void;
}

export default function ColorInput({ colors, onColorsChange, onGenerateHarmonious }: ColorInputProps) {
	const [newColor, setNewColor] = useState("#667eea");

	const addColor = () => {
		if (newColor && !colors.includes(newColor)) {
			onColorsChange([...colors, newColor]);
		}
	};

	const removeColor = (index: number) => {
		const newColors = colors.filter((_, i) => i !== index);
		onColorsChange(newColors);
	};

	const updateColor = (index: number, color: string) => {
		const newColors = [...colors];
		newColors[index] = color;
		onColorsChange(newColors);
	};

	const clearAllColors = () => {
		onColorsChange([]);
	};

	return (
		<div className="control-panel p-6">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white">Colors</h3>
				<div className="flex space-x-2">
					<button
						onClick={onGenerateHarmonious}
						className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200"
					>
						🎨 Generate Palette
					</button>
					{colors.length > 0 && (
						<button
							onClick={clearAllColors}
							className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200"
						>
							🗑️ Clear
						</button>
					)}
				</div>
			</div>

			{/* Add New Color */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					Add New Color
				</label>
				<div className="flex items-center space-x-3">
					<input
						type="color"
						value={newColor}
						onChange={(e) => setNewColor(e.target.value)}
						className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
					/>
					<input
						type="text"
						value={newColor}
						onChange={(e) => setNewColor(e.target.value)}
						className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="#667eea"
					/>
					<button
						onClick={addColor}
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
					>
						Add
					</button>
				</div>
			</div>

			{/* Color List */}
			{colors.length > 0 ? (
				<div className="space-y-3">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Current Colors ({colors.length})
					</h4>
					<div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
						{colors.map((color, index) => (
							<div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
								<div
									className="w-8 h-8 rounded-lg border-2 border-gray-300"
									style={{ backgroundColor: color }}
								/>
								<input
									type="text"
									value={color}
									onChange={(e) => updateColor(index, e.target.value)}
									className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
								/>
								<button
									onClick={() => removeColor(index)}
									className="text-red-500 hover:text-red-700 text-sm font-medium"
								>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="text-center py-8 text-gray-500 dark:text-gray-400">
					<p className="mb-2">No colors added yet</p>
					<p className="text-sm">Add colors manually or generate a harmonious palette</p>
				</div>
			)}
		</div>
	);
}
