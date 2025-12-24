export interface Emotion {
	id: string;
	name: string;
	color: string;
	definition: string;
	children?: Emotion[];
}

export const PLUTCHIK_EMOTIONS: Emotion[] = [
	{
		id: "happy",
		name: "Happy",
		color: "#FFE066",
		definition: "A state of well-being and contentment",
		children: [
			{
				id: "playful",
				name: "Playful",
				color: "#FFF59D",
				definition: "Full of fun and high spirits",
				children: [
					{
						id: "aroused",
						name: "Aroused",
						color: "#FFFDE7",
						definition: "Stimulated to action or heightened awareness",
					},
					{
						id: "cheeky",
						name: "Cheeky",
						color: "#FFF9C4",
						definition: "Showing playful disrespect or boldness",
					},
				],
			},
			{
				id: "content",
				name: "Content",
				color: "#FFF176",
				definition: "Satisfied with what one has",
				children: [
					{
						id: "free",
						name: "Free",
						color: "#FFFDE7",
						definition: "Able to act without restriction",
					},
					{
						id: "joyful",
						name: "Joyful",
						color: "#FFF9C4",
						definition: "Feeling great pleasure and happiness",
					},
				],
			},
			{
				id: "interested",
				name: "Interested",
				color: "#FFEE58",
				definition: "Showing curiosity or concern about something",
				children: [
					{
						id: "curious",
						name: "Curious",
						color: "#FFF59D",
						definition: "Eager to know or learn something",
					},
					{
						id: "inquisitive",
						name: "Inquisitive",
						color: "#FFF176",
						definition: "Having a desire to investigate",
					},
				],
			},
			{
				id: "proud",
				name: "Proud",
				color: "#FFE082",
				definition: "Feeling deep satisfaction from achievements",
				children: [
					{
						id: "successful",
						name: "Successful",
						color: "#FFECB3",
						definition: "Having achieved one's aims",
					},
					{
						id: "confident",
						name: "Confident",
						color: "#FFE0B2",
						definition: "Sure of oneself and one's abilities",
					},
				],
			},
			{
				id: "accepted",
				name: "Accepted",
				color: "#FFD54F",
				definition: "Welcomed and included by others",
				children: [
					{
						id: "respected",
						name: "Respected",
						color: "#FFE082",
						definition: "Admired by others for qualities or achievements",
					},
					{
						id: "valued",
						name: "Valued",
						color: "#FFCA28",
						definition: "Considered to be important or beneficial",
					},
				],
			},
			{
				id: "powerful",
				name: "Powerful",
				color: "#FFCA28",
				definition: "Having great influence or control",
				children: [
					{
						id: "courageous",
						name: "Courageous",
						color: "#FFD54F",
						definition: "Able to face and deal with danger or fear",
					},
					{
						id: "creative",
						name: "Creative",
						color: "#FFC107",
						definition: "Involving the use of imagination",
					},
				],
			},
			{
				id: "peaceful",
				name: "Peaceful",
				color: "#FFC107",
				definition: "Free from disturbance; calm",
				children: [
					{
						id: "loving",
						name: "Loving",
						color: "#FFD54F",
						definition: "Feeling or showing deep affection",
					},
					{
						id: "thankful",
						name: "Thankful",
						color: "#FFCA28",
						definition: "Pleased and relieved; grateful",
					},
				],
			},
			{
				id: "trusting",
				name: "Trusting",
				color: "#FFB300",
				definition: "Believing in the reliability of others",
				children: [
					{
						id: "sensitive",
						name: "Sensitive",
						color: "#FFC107",
						definition: "Aware of and responsive to feelings",
					},
					{
						id: "intimate",
						name: "Intimate",
						color: "#FFB300",
						definition: "Closely acquainted; familiar",
					},
				],
			},
			{
				id: "optimistic",
				name: "Optimistic",
				color: "#FFA000",
				definition: "Hopeful and confident about the future",
				children: [
					{
						id: "hopeful",
						name: "Hopeful",
						color: "#FFB300",
						definition: "Feeling or inspiring optimism",
					},
					{
						id: "inspired",
						name: "Inspired",
						color: "#FF8F00",
						definition: "Filled with the urge to do something creative",
					},
				],
			},
		],
	},
	{
		id: "sad",
		name: "Sad",
		color: "#64B5F6",
		definition: "Feeling sorrow or unhappiness",
		children: [
			{
				id: "lonely",
				name: "Lonely",
				color: "#90CAF9",
				definition: "Sad because one has no friends or company",
				children: [
					{
						id: "isolated",
						name: "Isolated",
						color: "#BBDEFB",
						definition: "Far away from others; solitary",
					},
					{
						id: "abandoned",
						name: "Abandoned",
						color: "#E3F2FD",
						definition: "Left behind or deserted",
					},
				],
			},
			{
				id: "vulnerable",
				name: "Vulnerable",
				color: "#42A5F5",
				definition: "Susceptible to physical or emotional harm",
				children: [
					{
						id: "victimised",
						name: "Victimised",
						color: "#64B5F6",
						definition: "Singled out for cruel or unfair treatment",
					},
					{
						id: "fragile",
						name: "Fragile",
						color: "#90CAF9",
						definition: "Easily broken or damaged emotionally",
					},
				],
			},
			{
				id: "despair",
				name: "Despair",
				color: "#2196F3",
				definition: "Complete loss of hope",
				children: [
					{
						id: "grief",
						name: "Grief",
						color: "#42A5F5",
						definition: "Deep sorrow, especially from loss",
					},
					{
						id: "powerless",
						name: "Powerless",
						color: "#64B5F6",
						definition: "Without ability or influence",
					},
				],
			},
			{
				id: "guilty",
				name: "Guilty",
				color: "#1E88E5",
				definition: "Feeling responsible for wrongdoing",
				children: [
					{
						id: "ashamed",
						name: "Ashamed",
						color: "#2196F3",
						definition: "Embarrassed by one's actions",
					},
					{
						id: "remorseful",
						name: "Remorseful",
						color: "#42A5F5",
						definition: "Filled with regret for wrongdoing",
					},
				],
			},
			{
				id: "depressed",
				name: "Depressed",
				color: "#1976D2",
				definition: "In a state of unhappiness or low spirits",
				children: [
					{
						id: "empty",
						name: "Empty",
						color: "#1E88E5",
						definition: "Feeling a lack of meaning or purpose",
					},
					{
						id: "inferior",
						name: "Inferior",
						color: "#2196F3",
						definition: "Feeling lower in status or quality",
					},
				],
			},
			{
				id: "hurt",
				name: "Hurt",
				color: "#1565C0",
				definition: "Experiencing emotional pain",
				children: [
					{
						id: "disappointed",
						name: "Disappointed",
						color: "#1976D2",
						definition: "Sad because expectations weren't met",
					},
					{
						id: "embarrassed",
						name: "Embarrassed",
						color: "#1E88E5",
						definition: "Self-conscious or ashamed",
					},
				],
			},
		],
	},
	{
		id: "disgusted",
		name: "Disgusted",
		color: "#9E9E9E",
		definition: "Feeling strong disapproval or revulsion",
		children: [
			{
				id: "disapproving",
				name: "Disapproving",
				color: "#BDBDBD",
				definition: "Expressing an unfavorable opinion",
				children: [
					{
						id: "judgemental",
						name: "Judgemental",
						color: "#E0E0E0",
						definition: "Having an excessively critical point of view",
					},
					{
						id: "embarrassed_d",
						name: "Embarrassed",
						color: "#EEEEEE",
						definition: "Feeling awkward or ashamed",
					},
				],
			},
			{
				id: "disappointed_d",
				name: "Disappointed",
				color: "#9E9E9E",
				definition: "Sad because hopes weren't fulfilled",
				children: [
					{
						id: "appalled",
						name: "Appalled",
						color: "#BDBDBD",
						definition: "Greatly dismayed or horrified",
					},
					{
						id: "revolted",
						name: "Revolted",
						color: "#E0E0E0",
						definition: "Feeling intense disgust",
					},
				],
			},
			{
				id: "awful",
				name: "Awful",
				color: "#757575",
				definition: "Extremely bad or unpleasant",
				children: [
					{
						id: "nauseated",
						name: "Nauseated",
						color: "#9E9E9E",
						definition: "Feeling sick with disgust",
					},
					{
						id: "detestable",
						name: "Detestable",
						color: "#BDBDBD",
						definition: "Deserving intense dislike",
					},
				],
			},
			{
				id: "repelled",
				name: "Repelled",
				color: "#616161",
				definition: "Driven away by dislike or distaste",
				children: [
					{
						id: "horrified",
						name: "Horrified",
						color: "#757575",
						definition: "Filled with shock and fear",
					},
					{
						id: "hesitant",
						name: "Hesitant",
						color: "#9E9E9E",
						definition: "Tentative or unsure",
					},
				],
			},
		],
	},
	{
		id: "angry",
		name: "Angry",
		color: "#EF5350",
		definition: "Feeling strong displeasure or hostility",
		children: [
			{
				id: "letdown",
				name: "Let Down",
				color: "#EF9A9A",
				definition: "Feeling disappointed by someone",
				children: [
					{
						id: "betrayed",
						name: "Betrayed",
						color: "#FFCDD2",
						definition: "Hurt by someone's disloyalty",
					},
					{
						id: "resentful",
						name: "Resentful",
						color: "#FFEBEE",
						definition: "Feeling bitterness at unfair treatment",
					},
				],
			},
			{
				id: "humiliated",
				name: "Humiliated",
				color: "#E57373",
				definition: "Feeling a painful loss of dignity",
				children: [
					{
						id: "disrespected",
						name: "Disrespected",
						color: "#EF9A9A",
						definition: "Treated with a lack of respect",
					},
					{
						id: "ridiculed",
						name: "Ridiculed",
						color: "#FFCDD2",
						definition: "Subjected to mockery",
					},
				],
			},
			{
				id: "bitter",
				name: "Bitter",
				color: "#F44336",
				definition: "Feeling resentful or disappointed",
				children: [
					{
						id: "indignant",
						name: "Indignant",
						color: "#E57373",
						definition: "Feeling annoyed at unfair treatment",
					},
					{
						id: "violated",
						name: "Violated",
						color: "#EF9A9A",
						definition: "Feeling one's boundaries were crossed",
					},
				],
			},
			{
				id: "mad",
				name: "Mad",
				color: "#E53935",
				definition: "Feeling extremely angry",
				children: [
					{
						id: "furious",
						name: "Furious",
						color: "#F44336",
						definition: "Extremely angry",
					},
					{
						id: "jealous",
						name: "Jealous",
						color: "#E57373",
						definition: "Envious of someone else",
					},
				],
			},
			{
				id: "aggressive",
				name: "Aggressive",
				color: "#D32F2F",
				definition: "Ready to attack or confront",
				children: [
					{
						id: "provoked",
						name: "Provoked",
						color: "#E53935",
						definition: "Stimulated to anger",
					},
					{
						id: "hostile",
						name: "Hostile",
						color: "#F44336",
						definition: "Unfriendly and antagonistic",
					},
				],
			},
			{
				id: "frustrated",
				name: "Frustrated",
				color: "#C62828",
				definition: "Upset because of inability to change something",
				children: [
					{
						id: "infuriated",
						name: "Infuriated",
						color: "#D32F2F",
						definition: "Extremely angry and impatient",
					},
					{
						id: "annoyed",
						name: "Annoyed",
						color: "#E53935",
						definition: "Slightly angry or irritated",
					},
				],
			},
			{
				id: "distant",
				name: "Distant",
				color: "#B71C1C",
				definition: "Emotionally detached or aloof",
				children: [
					{
						id: "withdrawn",
						name: "Withdrawn",
						color: "#C62828",
						definition: "Not wanting to communicate",
					},
					{
						id: "numb",
						name: "Numb",
						color: "#D32F2F",
						definition: "Unable to feel emotions",
					},
				],
			},
			{
				id: "critical",
				name: "Critical",
				color: "#B71C1C",
				definition: "Expressing disapproval",
				children: [
					{
						id: "sceptical",
						name: "Sceptical",
						color: "#C62828",
						definition: "Having doubts",
					},
					{
						id: "dismissive",
						name: "Dismissive",
						color: "#D32F2F",
						definition: "Treating something as unworthy",
					},
				],
			},
		],
	},
	{
		id: "fearful",
		name: "Fearful",
		color: "#81C784",
		definition: "Feeling afraid or anxious",
		children: [
			{
				id: "scared",
				name: "Scared",
				color: "#A5D6A7",
				definition: "Feeling fear or being frightened",
				children: [
					{
						id: "helpless",
						name: "Helpless",
						color: "#C8E6C9",
						definition: "Unable to help oneself",
					},
					{
						id: "frightened",
						name: "Frightened",
						color: "#E8F5E9",
						definition: "Afraid or anxious",
					},
				],
			},
			{
				id: "anxious",
				name: "Anxious",
				color: "#66BB6A",
				definition: "Experiencing worry or unease",
				children: [
					{
						id: "overwhelmed",
						name: "Overwhelmed",
						color: "#81C784",
						definition: "Overcome by too much of something",
					},
					{
						id: "worried",
						name: "Worried",
						color: "#A5D6A7",
						definition: "Anxious about something",
					},
				],
			},
			{
				id: "insecure",
				name: "Insecure",
				color: "#4CAF50",
				definition: "Uncertain or lacking confidence",
				children: [
					{
						id: "inadequate",
						name: "Inadequate",
						color: "#66BB6A",
						definition: "Lacking the quality needed",
					},
					{
						id: "inferior_f",
						name: "Inferior",
						color: "#81C784",
						definition: "Feeling lower in rank or status",
					},
				],
			},
			{
				id: "weak",
				name: "Weak",
				color: "#43A047",
				definition: "Lacking physical or emotional strength",
				children: [
					{
						id: "worthless",
						name: "Worthless",
						color: "#4CAF50",
						definition: "Having no real value",
					},
					{
						id: "insignificant",
						name: "Insignificant",
						color: "#66BB6A",
						definition: "Too small to be important",
					},
				],
			},
			{
				id: "rejected",
				name: "Rejected",
				color: "#388E3C",
				definition: "Dismissed as inadequate",
				children: [
					{
						id: "excluded",
						name: "Excluded",
						color: "#43A047",
						definition: "Kept out of a group",
					},
					{
						id: "persecuted",
						name: "Persecuted",
						color: "#4CAF50",
						definition: "Subject to hostility",
					},
				],
			},
			{
				id: "threatened",
				name: "Threatened",
				color: "#2E7D32",
				definition: "Feeling in danger",
				children: [
					{
						id: "nervous",
						name: "Nervous",
						color: "#388E3C",
						definition: "Easily agitated or worried",
					},
					{
						id: "exposed",
						name: "Exposed",
						color: "#43A047",
						definition: "Made vulnerable",
					},
				],
			},
		],
	},
	{
		id: "bad",
		name: "Bad",
		color: "#26A69A",
		definition: "Feeling generally unwell or upset",
		children: [
			{
				id: "bored",
				name: "Bored",
				color: "#4DB6AC",
				definition: "Weary from lack of interest",
				children: [
					{
						id: "indifferent",
						name: "Indifferent",
						color: "#80CBC4",
						definition: "Having no particular interest",
					},
					{
						id: "apathetic",
						name: "Apathetic",
						color: "#B2DFDB",
						definition: "Showing little interest or enthusiasm",
					},
				],
			},
			{
				id: "busy",
				name: "Busy",
				color: "#26A69A",
				definition: "Having a great deal to do",
				children: [
					{
						id: "pressured",
						name: "Pressured",
						color: "#4DB6AC",
						definition: "Feeling stress from demands",
					},
					{
						id: "rushed",
						name: "Rushed",
						color: "#80CBC4",
						definition: "Done or required quickly",
					},
				],
			},
			{
				id: "stressed",
				name: "Stressed",
				color: "#009688",
				definition: "Experiencing mental or emotional strain",
				children: [
					{
						id: "overwhelmed_b",
						name: "Overwhelmed",
						color: "#26A69A",
						definition: "Overcome by too much",
					},
					{
						id: "outofcontrol",
						name: "Out of Control",
						color: "#4DB6AC",
						definition: "Unable to manage a situation",
					},
				],
			},
			{
				id: "tired",
				name: "Tired",
				color: "#00897B",
				definition: "In need of rest or sleep",
				children: [
					{
						id: "sleepy",
						name: "Sleepy",
						color: "#009688",
						definition: "Ready for sleep",
					},
					{
						id: "unfocused",
						name: "Unfocused",
						color: "#26A69A",
						definition: "Unable to concentrate",
					},
				],
			},
		],
	},
	{
		id: "surprised",
		name: "Surprised",
		color: "#AED581",
		definition: "Feeling unexpected wonder or astonishment",
		children: [
			{
				id: "startled",
				name: "Startled",
				color: "#C5E1A5",
				definition: "Feeling sudden shock or alarm",
				children: [
					{
						id: "shocked",
						name: "Shocked",
						color: "#DCEDC8",
						definition: "Greatly surprised or upset",
					},
					{
						id: "dismayed",
						name: "Dismayed",
						color: "#F1F8E9",
						definition: "Feeling distress or concern",
					},
				],
			},
			{
				id: "confused",
				name: "Confused",
				color: "#9CCC65",
				definition: "Unable to think clearly",
				children: [
					{
						id: "disillusioned",
						name: "Disillusioned",
						color: "#AED581",
						definition: "Disappointed in someone or something",
					},
					{
						id: "perplexed",
						name: "Perplexed",
						color: "#C5E1A5",
						definition: "Completely baffled",
					},
				],
			},
			{
				id: "amazed",
				name: "Amazed",
				color: "#8BC34A",
				definition: "Greatly surprised or impressed",
				children: [
					{
						id: "astonished",
						name: "Astonished",
						color: "#9CCC65",
						definition: "Greatly surprised",
					},
					{
						id: "awe",
						name: "Awe",
						color: "#AED581",
						definition: "Feeling of reverential respect",
					},
				],
			},
			{
				id: "excited",
				name: "Excited",
				color: "#7CB342",
				definition: "Very enthusiastic and eager",
				children: [
					{
						id: "eager",
						name: "Eager",
						color: "#8BC34A",
						definition: "Keen or enthusiastic",
					},
					{
						id: "energetic",
						name: "Energetic",
						color: "#9CCC65",
						definition: "Full of vitality",
					},
				],
			},
		],
	},
];

export function getMaxDepth(emotions: Emotion[]): number {
	let maxDepth = 1;
	for (const emotion of emotions) {
		if (emotion.children && emotion.children.length > 0) {
			const childDepth = 1 + getMaxDepth(emotion.children);
			if (childDepth > maxDepth) {
				maxDepth = childDepth;
			}
		}
	}
	return maxDepth;
}
