---
title: "Pose Race"
summary: "A LEGO race car driven tank-style by raising and lowering your arms in front of a webcam, with a hand-gesture-triggered shovel."
categories: ["Robotics & Electronics"]
tools: ["Python", "MediaPipe Pose", "MediaPipe Gesture Recognizer", "OpenCV", "Bluetooth LE"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-09"
team: "With Yash Kulkarni"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Pose Race"
gallery:
  - src: "./media/shovel.png"
    caption: "The shovel is driven by a second LEGO motor and triggered by hand gestures"
videos:
  - title: "Race day"
    file: "media/videos/race.mp4"
    poster: "./media/videos/race.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
  - title: "Driving view: pose skeleton and live wheel-speed bars"
    file: "media/videos/driving-view.mp4"
    poster: "./media/videos/driving-view.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
documents: []
links:
  - label: "Code on GitHub"
    url: "https://github.com/annejumper/AI-in-Mobile-Robots/tree/main/PoseRace"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

Yash Kulkarni and I built a LEGO race car you drive with your arms. Each wrist's height relative to its shoulder sets that side's wheel speed, from full reverse to full forward, so raising one arm and lowering the other spins in place. A second LEGO motor swings a shovel on top of the car when you hold up one finger or a peace sign. We chose offense over defense: the shovel flips other robots out of the way, and we won our side of the race.

## How it works

- **Vision.** Two pretrained MediaPipe models run on every webcam frame: Pose Landmarker for the arms and Gesture Recognizer for hand shapes. No training was needed; our own code is a rule-based mapping from landmarks to wheel speeds.
- **Control mapping.** Wrist height is normalized by shoulder width, so it works at any distance from the camera. A dead zone keeps a resting arm from drifting the car, an exponential moving average smooths landmark jitter, and low-confidence landmarks are ignored.
- **Hardware link.** The `legoeducation` library talks to the hubs over Bluetooth LE. We send commands with `blocking=False`, so waiting on a Bluetooth acknowledgment never stalls the video loop. Each hub is paired by its Connection Card serial, so we never grab a classmate's car.

## Challenges

- When my wrist left the frame, MediaPipe guessed a low position and the car drove backward at full speed, right off the table on our first run. Filtering by landmark confidence fixed it.
- That fix initially broke tracking, because the reference scale used hip landmarks that a webcam can't see. Switching to shoulder width made the controls oversensitive and needed retuning.
- A lowered wrist leaves the frame sooner than a raised one, so forward and reverse got separate full-speed ranges.
- Our first obstacle, a linear slider, didn't have enough force, and the car tipped instead of pushing. Weight distribution mattered as much as the code.
