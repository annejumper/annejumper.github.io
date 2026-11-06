---
title: "Whistling World Cup"
summary: "A robot soccer player steered by whistle pitch: real-time FFT pitch detection with noise subtraction and calibrated frequency bands, plus MQTT match logic."
categories: ["Acoustics", "Controls", "Robotics & Electronics"]
tools: ["Python", "PyAudio", "FFT", "MQTT", "LEGO Education motors + light sensor"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-09"
team: "With Raphael Lemus Solis"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Whistling World Cup"
gallery:
  - src: "./media/decision-flow.png"
    caption: "Decision flow from choosing a role to the final victory or defeat song"
videos:
  - title: "Driving by pitch: live spectrogram"
    file: "media/videos/spectrogram-drive.mp4"
    poster: "./media/videos/spectrogram-drive.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "The detected pitch and the command it maps to, controlled here with an otomatone."
  - title: "Clarinet overtones"
    file: "media/videos/clarinet-overtones.mp4"
    poster: "./media/videos/clarinet-overtones.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Strong harmonics make the fundamental hard to pick out."
  - title: "Driving with the flail"
    file: "media/videos/drive-flail.mp4"
    poster: "./media/videos/drive-flail.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
  - title: "Goal!"
    file: "media/videos/goal.mp4"
    poster: "./media/videos/goal.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "A sustained high whistle scores and triggers the victory song."
documents: []
links:
  - label: "Code on GitHub"
    url: "https://github.com/RaphLemSol/ME193/tree/main/WhistlingWorldCup"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

Raphael Lemus Solis and I built a robot that plays one-on-one robot soccer, steered entirely by whistling. A chain flail on a second motor, controlled from a second laptop over MQTT, deters the opponent.

## How it works

- **Pitch detection.** The laptop microphone is read in ~46 ms chunks, 20 times per second, and an FFT finds the strongest frequency. Pitch bands map to commands from low to high: stop, left, right, faster, and (held for one second) goal.
- **Noise rejection.** At start-up the program listens to the room for one second and subtracts that background (fans, talking). It only responds to sounds that are loud, clear and steady. A calibrate mode records the player's lowest and highest notes and scales the command bands to fit.
- **Match logic.** The robot waits for a start message over MQTT. As the ball, a downward light sensor detects when the goalie has caught it and publishes the result; each laptop then plays a victory or defeat song.
- **Live spectrogram.** We built a live spectrogram view showing the detected pitch and the command being sent, which made driving far easier than reading command-line output.

## Challenges

- **Overtones.** I can't whistle, so I tried my clarinet, recorders, whistles and an otomatone. Instruments with strong overtones confused the detector, which sometimes locked onto a harmonic instead of the fundamental. A recorder or the otomatone worked best.
- **Fail-safe behavior.** Our first protocol kept executing the last command when the whistling stopped, and the robot kept driving off the table. Stopping immediately whenever there's no whistle made it controllable.
- **Shared MQTT topics.** In the match, our robot never saw the opponent's start message, likely due to a format mismatch or messages sent before we subscribed. We played using the practice mode we'd built in, and won quickly.
