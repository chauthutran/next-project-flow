import React from "react";

type ProgressBarProps = {
	name: string;
	percentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ name, percentage }) => {

	const color = (percentage > 100) ? "bg-[var(--progress-bar-percent-red)]" : "bg-[var( --progress-bar-percent-blue)]";
	
	return (
		<div>
			<h2 className="font-semibold">{name}</h2>
			<div className="w-full bg-[var(--progress-bar-bg)] rounded-full h-4 overflow-hidden">
				<div
					className={`${color} h-full`}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
			<p className={`text-sm mt-2 ${color}`}>
				{percentage.toFixed(2)}%
			</p>
		</div>


	);
};

export default ProgressBar;