import { cn, dataAttr } from "../lib/utils.mjs";
import { blinkingSeparatorVariants, musicPlayerVariants, playerAlbumArtVariants, playerArtistVariants, playerButtonVariants, playerCompactAlbumVariants, playerCompactInfoTextVariants, playerCompactInfoVariants, playerCompactProgressFillVariants, playerCompactProgressVariants, playerCompactSourceVariants, playerCompactTopVariants, playerControlsVariants, playerInfoVariants, playerProgressBarVariants, playerProgressSegmentVariants, playerProgressVariants, playerRecordingIndicatorVariants, playerTimeVariants, playerTitleVariants } from "./music-player-variants.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./MusicPlayer.css";
//#region src/MusicPlayer/MusicPlayer.tsx
const BlinkingSeparator = ({ active = true, speed = 1e3, className }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn(blinkingSeparatorVariants({ active }), className),
		"data-slot": "blinking-separator",
		"data-active": dataAttr(active),
		style: active ? { animationDuration: `${speed}ms` } : void 0,
		"aria-hidden": "true"
	});
};
const defaultTracks = [
	{
		title: "Digital Silence",
		artist: "Void Ensemble",
		duration: 245
	},
	{
		title: "Neon Streets",
		artist: "Circuit Rhythm",
		duration: 198
	},
	{
		title: "Binary Dreams",
		artist: "Pixel Noise",
		duration: 312
	}
];
const SPOTIFY_PATH = "M12 0C5.37273 0 0 5.37218 0 12C0 18.6278 5.37273 24 12 24C18.6273 24 24 18.6278 24 12C24 5.37218 18.6273 0 12 0ZM17.8545 17.2987C17.6618 17.64 17.3073 17.832 16.9418 17.832C16.7709 17.832 16.5945 17.7893 16.4327 17.6993C14.9345 16.8593 13.3018 16.3447 11.5764 16.17C9.84728 15.9967 8.14 16.1722 6.5 16.6958C5.95273 16.8705 5.36364 16.5682 5.1891 16.02C5.01273 15.4709 5.31637 14.8838 5.86546 14.7082C7.77818 14.0971 9.77272 13.8893 11.7873 14.094C13.7982 14.2987 15.7036 14.8987 17.4527 15.8791C17.9564 16.1595 18.1364 16.7955 17.8545 17.2987ZM19.2909 13.6538C19.1055 14.0107 18.7418 14.2155 18.3655 14.2155C18.2018 14.2155 18.0382 14.178 17.8836 14.0971C16.0418 13.1378 14.0527 12.5438 11.9673 12.3322C9.86544 12.1171 7.78364 12.3045 5.77637 12.8835C5.22182 13.0409 4.64364 12.7238 4.48546 12.1695C4.32546 11.616 4.64545 11.0378 5.19818 10.878C7.46363 10.2247 9.81272 10.0155 12.1782 10.2555C14.5273 10.4947 16.7709 11.1638 18.8491 12.2467C19.3582 12.5131 19.5582 13.1429 19.2909 13.6538ZM19.8109 10.6215C19.6545 10.6215 19.4964 10.5862 19.3455 10.512C17.16 9.42218 14.8091 8.74346 12.3564 8.49455C9.89999 8.24327 7.45636 8.43746 5.09091 9.06909C4.53455 9.21673 3.96363 8.88673 3.81454 8.32945C3.66545 7.77291 3.99637 7.20073 4.55455 7.05218C7.16365 6.35546 9.86182 6.14327 12.5691 6.41855C15.2727 6.69218 17.8655 7.44145 20.2764 8.64382C20.7927 8.90091 21.0018 9.528 20.7455 10.0433C20.5636 10.41 20.1945 10.6215 19.8109 10.6215Z";
const widgetSubVariants = cva("", {
	variants: {
		theme: {
			light: "widget-theme--light",
			dark: "widget-theme--dark"
		},
		size: {
			small: "widget-size--small",
			medium: "widget-size--medium",
			large: "widget-size--large"
		}
	},
	defaultVariants: {
		theme: "dark",
		size: "medium"
	}
});
const miniGroupCircles = [
	[12.9226, 1.60976],
	[5.36586, 23.9268],
	[24.1915, 23.9268],
	[20.4351, 1.60976],
	[27.9476, 1.60976],
	[12.9226, 9.04878],
	[20.4351, 9.04878],
	[27.9476, 9.04878],
	[12.9226, 5.32927],
	[5.36586, 27.6463],
	[24.1915, 27.6463],
	[20.4351, 5.32927],
	[27.9476, 5.32927],
	[9.16646, 1.60976],
	[1.60976, 23.9268],
	[20.4354, 23.9268],
	[16.679, 1.60976],
	[24.1915, 1.60976],
	[9.16646, 12.7683],
	[27.9476, 12.7683],
	[9.16646, 9.04878],
	[16.679, 9.04878],
	[24.1915, 9.04878],
	[9.16646, 20.2073],
	[27.9476, 20.2073],
	[9.16646, 23.9268],
	[27.9476, 23.9268],
	[9.16646, 5.32927],
	[1.60976, 27.6463],
	[20.4354, 27.6463],
	[16.679, 5.32927],
	[24.1915, 5.32927],
	[9.16646, 16.4878],
	[27.9476, 16.4878]
];
function MiniGroup() {
	return /* @__PURE__ */ jsx("div", {
		className: "widget-col-1 h-[29.256px] ms-[17px] mt-[17px] widget-relative widget-row-1 w-[29.557px]",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("svg", {
			className: "aios-widget-icon-svg",
			fill: "none",
			preserveAspectRatio: "none",
			viewBox: "0 0 29.5574 29.2561",
			children: /* @__PURE__ */ jsx("g", {
				id: "Group 1",
				children: miniGroupCircles.map(([cx, cy], idx) => /* @__PURE__ */ jsx("circle", {
					cx,
					cy,
					fill: "var(--fill-0, var(--widget-white))",
					r: 1.60976,
					style: {
						fill: "var(--widget-white)",
						fillOpacity: 1
					}
				}, idx))
			})
		})
	});
}
function MiniIcons() {
	return /* @__PURE__ */ jsxs("div", {
		className: "content-stretch flex items-start justify-between widget-relative widget-shrink-0 w-full",
		"data-name": "Icons",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "widget-grid-auto",
			"data-name": "Icon",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("div", { className: "widget-bg-grey widget-col-1 ms-0 mt-0 widget-relative widget-rounded-6 widget-card__svg--64" }), /* @__PURE__ */ jsx(MiniGroup, {})]
		}), /* @__PURE__ */ jsx("div", {
			className: "widget-relative widget-shrink-0 widget-card__svg--24",
			"data-name": "Spotify - Negative",
			children: /* @__PURE__ */ jsx("svg", {
				className: "aios-widget-icon-svg",
				fill: "none",
				preserveAspectRatio: "none",
				viewBox: "0 0 24 24",
				children: /* @__PURE__ */ jsx("path", {
					d: SPOTIFY_PATH,
					fill: "var(--fill-0, var(--widget-white))",
					style: {
						fill: "var(--widget-white)",
						fillOpacity: 1
					}
				})
			})
		})]
	});
}
function MiniLoadingBar() {
	return /* @__PURE__ */ jsxs("div", {
		className: "widget-grid-loading",
		"data-name": "Loading Bar",
		children: [/* @__PURE__ */ jsx("div", { className: "widget-bg-grey widget-col-1 h-[2px] ms-0 mt-0 widget-relative widget-row-1 w-full" }), /* @__PURE__ */ jsx("div", { className: "widget-bg-light widget-col-1 h-[2px] ms-0 mt-0 widget-relative widget-row-1 w-[26.23%]" })]
	});
}
function MiniInfo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "content-stretch flex flex-col gap-[12px] items-start widget-relative widget-shrink-0 w-full",
		"data-name": "Info",
		children: [/* @__PURE__ */ jsx("p", {
			className: "widget-relative widget-shrink-0 widget-text widget-text--14 widget-text--grey widget-text--nowrap",
			style: { fontVariationSettings: "'wdth' 100" },
			children: "Jim Hall - Concierto"
		}), /* @__PURE__ */ jsx(MiniLoadingBar, {})]
	});
}
function MiniBullet() {
	return /* @__PURE__ */ jsx("div", {
		className: "-translate-y-1/2 absolute h-[13px] end-[16px] top-[calc(50%-0.5px)] w-[4px]",
		"data-name": "Bullet",
		children: /* @__PURE__ */ jsx("svg", {
			className: "aios-widget-icon-svg",
			fill: "none",
			preserveAspectRatio: "none",
			viewBox: "0 0 4 13",
			children: /* @__PURE__ */ jsxs("g", {
				id: "Bullet",
				children: [/* @__PURE__ */ jsx("circle", {
					cx: "2",
					cy: "2",
					r: "2",
					style: {
						fill: "color(display-p3 0.2314 0.2235 0.2431)",
						fillOpacity: 1
					}
				}), /* @__PURE__ */ jsx("circle", {
					cx: "2",
					cy: "11",
					r: "2",
					style: {
						fill: "color(display-p3 0.8824 0.8980 0.9176)",
						fillOpacity: 1
					}
				})]
			})
		})
	});
}
function MusicPlayerMini({ theme = "dark", size = "medium", className, style, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		style,
		className: cn(widgetSubVariants({
			theme,
			size
		}), "widget-card widget-card--152 widget-card--rounded widget-card--dark", className),
		"data-slot": "music-player",
		"data-theme": dataAttr(theme),
		"data-size": dataAttr(size),
		"data-name": "Music Player",
		"data-variant": "mini",
		"aria-label": "Music Player",
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex flex-col justify-center size-full",
			children: /* @__PURE__ */ jsxs("div", {
				className: "content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full",
				children: [
					/* @__PURE__ */ jsx(MiniIcons, {}),
					/* @__PURE__ */ jsx(MiniInfo, {}),
					/* @__PURE__ */ jsx(MiniBullet, {})
				]
			})
		})
	});
}
MusicPlayerMini.displayName = "MusicPlayerMini";
function MusicPlayerDefault({ className, totalSegments = 20, updateInterval = 1e3, tracks: tracksProp, variant = "default", showRecordingIndicator = false, sourceIcon, recording = false, style, theme: _theme, size: _size, ...props }) {
	const safeTracks = tracksProp && tracksProp.length > 0 ? tracksProp : defaultTracks;
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const currentTrack = safeTracks[currentTrackIndex];
	const percent = currentTime / currentTrack.duration * 100;
	const filledSegments = Math.round(percent / 100 * totalSegments);
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${String(secs).padStart(2, "0")}`;
	};
	useEffect(() => {
		let timer;
		if (isPlaying) timer = setInterval(() => {
			setCurrentTime((prev) => {
				if (prev >= currentTrack.duration) {
					setCurrentTrackIndex((p) => (p + 1) % safeTracks.length);
					return 0;
				}
				return prev + 1;
			});
		}, updateInterval);
		return () => clearInterval(timer);
	}, [
		isPlaying,
		currentTrackIndex,
		updateInterval,
		currentTrack.duration,
		safeTracks.length
	]);
	const handleTogglePlay = () => {
		setIsPlaying(!isPlaying);
	};
	const handlePrev = () => {
		setCurrentTrackIndex((prev) => (prev - 1 + safeTracks.length) % safeTracks.length);
		setCurrentTime(0);
	};
	const handleNext = () => {
		setCurrentTrackIndex((prev) => (prev + 1) % safeTracks.length);
		setCurrentTime(0);
	};
	if (variant === "compact") return /* @__PURE__ */ jsxs("div", {
		className: cn(musicPlayerVariants({
			variant,
			recording
		}), className),
		style,
		"data-slot": "music-player",
		"data-variant": dataAttr(variant),
		"data-state": dataAttr(isPlaying ? "playing" : "paused"),
		"data-recording": dataAttr(recording),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "music-player-compact-top",
				className: playerCompactTopVariants(),
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "music-player-album",
					className: playerCompactAlbumVariants(),
					children: /* @__PURE__ */ jsx("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("path", {
							d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}), sourceIcon && /* @__PURE__ */ jsx("div", {
					"data-slot": "music-player-source",
					className: playerCompactSourceVariants(),
					children: sourceIcon
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "music-player-info",
				className: playerCompactInfoVariants(),
				children: [/* @__PURE__ */ jsxs("span", {
					"data-slot": "music-player-info-text",
					className: playerCompactInfoTextVariants(),
					children: [
						currentTrack.artist,
						" - ",
						currentTrack.title
					]
				}), showRecordingIndicator && /* @__PURE__ */ jsx(BlinkingSeparator, { active: isPlaying })]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "music-player-progress",
				className: playerCompactProgressVariants(),
				role: "progressbar",
				"aria-valuenow": Math.round(percent),
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": `Playback progress: ${formatTime(currentTime)} of ${formatTime(currentTrack.duration)}`,
				children: /* @__PURE__ */ jsx("div", {
					"data-slot": "music-player-progress-fill",
					className: playerCompactProgressFillVariants(),
					style: { width: `${percent}%` }
				})
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: cn(musicPlayerVariants({
			variant,
			recording
		}), className),
		style,
		"data-slot": "music-player",
		"data-variant": dataAttr(variant),
		"data-state": dataAttr(isPlaying ? "playing" : "paused"),
		"data-recording": dataAttr(recording),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "music-player-album",
				className: playerAlbumArtVariants(),
				children: /* @__PURE__ */ jsxs("svg", {
					viewBox: "0 0 24 24",
					fill: "none",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ jsx("circle", {
						cx: "12",
						cy: "12",
						r: "10",
						strokeWidth: "2"
					}), /* @__PURE__ */ jsx("circle", {
						cx: "12",
						cy: "12",
						r: "3",
						strokeWidth: "2"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "music-player-info",
				className: playerInfoVariants(),
				children: [
					/* @__PURE__ */ jsx("div", {
						"data-slot": "music-player-title",
						className: playerTitleVariants(),
						children: currentTrack.title
					}),
					/* @__PURE__ */ jsx("div", {
						"data-slot": "music-player-artist",
						className: playerArtistVariants(),
						children: currentTrack.artist
					}),
					showRecordingIndicator && /* @__PURE__ */ jsx("div", {
						"data-slot": "music-player-recording",
						className: playerRecordingIndicatorVariants(),
						children: /* @__PURE__ */ jsx(BlinkingSeparator, { active: isPlaying })
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "music-player-progress",
				className: playerProgressVariants(),
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "music-player-progress-bar",
					className: playerProgressBarVariants(),
					children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", {
						"data-slot": "music-player-progress-segment",
						"data-filled": dataAttr(index < filledSegments),
						className: playerProgressSegmentVariants({ filled: index < filledSegments })
					}, index))
				}), /* @__PURE__ */ jsxs("div", {
					"data-slot": "music-player-time",
					className: playerTimeVariants(),
					children: [/* @__PURE__ */ jsx("span", { children: formatTime(currentTime) }), /* @__PURE__ */ jsx("span", { children: formatTime(currentTrack.duration) })]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "music-player-controls",
				className: playerControlsVariants(),
				children: [
					/* @__PURE__ */ jsx("button", {
						"data-slot": "music-player-prev",
						className: playerButtonVariants(),
						onClick: handlePrev,
						"aria-label": "Previous track",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M6 6h2v12H6zm3.5 6l8.5 6V6z",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ jsx("button", {
						"data-slot": "music-player-toggle",
						className: playerButtonVariants({ primary: true }),
						onClick: handleTogglePlay,
						"aria-label": isPlaying ? "Pause" : "Play",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							children: isPlaying ? /* @__PURE__ */ jsx("path", {
								d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}) : /* @__PURE__ */ jsx("path", {
								d: "M8 5v14l11-7z",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ jsx("button", {
						"data-slot": "music-player-next",
						className: playerButtonVariants(),
						onClick: handleNext,
						"aria-label": "Next track",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})
				]
			})
		]
	});
}
MusicPlayerDefault.displayName = "MusicPlayerDefault";
function MusicPlayer({ variant = "default", theme, size, className, style, ...props }) {
	if (variant === "mini") return /* @__PURE__ */ jsx(MusicPlayerMini, {
		theme: theme ?? "dark",
		size: size ?? "medium",
		className,
		style,
		...props
	});
	return /* @__PURE__ */ jsx(MusicPlayerDefault, {
		variant,
		theme,
		size,
		className,
		style,
		...props
	});
}
MusicPlayer.displayName = "MusicPlayer";
//#endregion
export { BlinkingSeparator, MusicPlayer as default };

//# sourceMappingURL=MusicPlayer.mjs.map