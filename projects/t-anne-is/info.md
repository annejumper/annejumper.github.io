---
title: "T-anne-is: Motion-Controlled Tennis"
summary: "A virtual tennis game played with a LEGO motor hub as the racket: pose tracking, IMU swing and spin detection, a trained stroke classifier, and spin-aware ball physics."
categories: ["Controls", "Robotics & Electronics"]
tools: ["Python", "MediaPipe Pose", "IMU signal processing", "k-NN classifier", "Three.js", "MQTT", "AprilTags"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-10"
team: "Individual"
role: ""
featured: 0
hero: "./hero.jpg"
heroAlt: "T-anne-is: Motion-Controlled Tennis"
gallery:
  - src: "./media/racket.jpg"
    caption: "3D-printed racket that mounts to the LEGO Double Motor hub"
  - src: "./media/code-flow.png"
    caption: "How the code works: sensing, game state machine, physics and outputs"
videos:
  - title: "Rally"
    file: "media/videos/rally.mp4"
    poster: "./media/videos/rally.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Serve, baseline rally (forehand/backhand from pose), then turn the hub's shaft to run to the net for a volley."
  - title: "Topspin matters"
    file: "media/videos/no-topspin.mp4"
    poster: "./media/videos/no-topspin.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Clay bounces high; without topspin to bring it down, the ball goes long."
  - title: "Slice on grass"
    file: "media/videos/slice.mp4"
    poster: "./media/videos/slice.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Grass plays fast and low; swinging high-to-low applies slice and keeps the ball down."
  - title: "Choosing a court with AprilTags"
    file: "media/videos/courts.mp4"
    poster: "./media/videos/courts.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "AprilTag cards pick the difficulty and court surface, and start the game."
  - title: "Pro level"
    file: "media/videos/pro.mp4"
    poster: "./media/videos/pro.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "The hardest level: faster balls, a smaller hit zone and tighter timing."
documents: []
links:
  - label: "Code on GitHub"
    url: "https://github.com/annejumper/AI-in-Mobile-Robots/tree/main/PingPongMidterm"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

For the ME 193 midterm ("a little ping pong"), I turned virtual ping-pong into virtual tennis. A LEGO Education Double Motor hub, mounted in a 3D-printed racket, is the controller. I rally against a virtual opponent on clay, grass or hard court, and how I swing decides the ball's power and spin.

## How it works

- **Sensing.** A webcam runs MediaPipe Pose to find my racket hand and tossing hand, and OpenCV reads AprilTag cards that start the game and pick the level and court. The hub streams gyro and accelerometer data over Bluetooth: a burst in pitch rate is a swing (its peak sets the power), and the yaw twist during the swing sets the spin.
- **Deciding a hit.** Each swing is judged in three steps. IMU timing finds where the ball was at the swing's fastest instant (too early, too late, or in the window, after compensating for ~60 ms of camera and Bluetooth lag). The camera checks whether my racket hand was inside the "hit here" ring. Then the shot is built from the stroke side the camera saw, the spin type from my classifier, and the swing speed.
- **Physics.** Every ball is simulated with gravity, a Magnus force from spin, and surface-specific bounce. Grass stays low and clay kicks up, so the racket position you need really changes with the court, and a big flat swing at a low ball sails long unless you add topspin.
- **Feedback.** Three.js renders a 3D stadium in the browser from game state streamed over a WebSocket at 30 Hz. The hub's motors give haptic "textures" for bounces, hits and spin, and my record rally is published live over MQTT.

## Challenges

- **Bad training data.** My first stroke classifier treated each racket reset as a swing, so it couldn't tell forehands from backhands or topspin from slice. I deleted that data and redesigned the recording protocol to keep only the strongest swing per beep, with time to reset.
- **Breaking down the problem.** Classifying all six strokes at once was unreliable. Letting the camera decide forehand vs. backhand left the k-NN model only three spin types to choose from, which was much more accurate.
- **Playability.** Even the easiest level was too hard at first, so I widened the timing window and slowed the pace before tuning the harder levels.

## What I learned

A model is only as good as its data, and high accuracy on 60 practice swings doesn't guarantee good results in a real game, because the way I swing during play doesn't always match practice.
