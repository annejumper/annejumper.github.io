---
title: "Door-to-Door Service"
summary: "A car that drives to a green LEGO minifigure using a custom-trained YOLOv8 detector, MQTT, and an adaptive drive-then-pulse control policy on an Arduino UNO Q."
categories: ["Controls", "Robotics & Electronics"]
tools: ["YOLOv8", "Python", "MQTT", "Arduino UNO Q", "Roboflow"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-10"
team: "With Tyler Wong"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Door-to-Door Service"
gallery:
  - src: "./media/car-side.png"
    caption: "The car: UNO Q, motor driver and battery"
  - src: "./media/car-rear.png"
  - src: "./media/code-flow.png"
    caption: "The laptop detects the minifigure and publishes its position; the UNO Q drives until it's centered"
videos:
  - title: "Detector view"
    file: "media/videos/detector-view.mp4"
    poster: "./media/videos/detector-view.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "HUD with the center line, offset, and detection count; turns green when the figure is centered."
  - title: "Centering"
    file: "media/videos/centering.mp4"
    poster: "./media/videos/centering.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "The car centers itself; the UNO Q's LED matrix shows the figure's position relative to center."
documents: []
links:
  - label: "Code on GitHub"
    url: "https://github.com/tjywong/Green-Minifig-Finder"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

Tyler Wong and I built a delivery car that centers itself on a green LEGO minifigure. A YOLOv8 model we trained on about 50 labeled photos runs on a laptop and publishes the figure's position as JSON over MQTT. An Arduino UNO Q on the car receives it and drives the motors.

## How it works

- **Detection.** Each webcam frame goes through the YOLOv8 detector. The highest-confidence box gives the figure's horizontal position, and a 0.2 s median filter removes jumpy detections.
- **Control policy (every 50 ms on the UNO Q).** More than 15% of the frame width off-center, the car drives continuously, scaling speed with distance. Within 15%, it switches to short pulses (drive 0.08 s, stop, wait 0.3 s for the camera to catch up, judge from three fresh frames). Within 2%, it stops, and stays stopped until the figure drifts more than 3% away, so detection noise doesn't make it twitch.
- **Adapting to the motors.** If a pulse barely moves the figure, the next pulse gets more power; if it overshoots, less. If the car is driving but the figure hasn't moved for half a second, it adds power to overcome the stall.
- **Fail-safes.** With no figure seen for 0.5 s (or no messages at all), the car stops. The Arduino sketch also cuts the motors on its own if Python stops sending commands for 400 ms.

## Challenges

- **Latency.** Webcam buffering, YOLO inference, MQTT and our own smoothing added up, so the car overshot constantly until we switched to the pulse-and-wait approach near the target.
- **False positives.** A green box far in the background was about minifigure-sized in the frame; YOLO took it for the figure and the car shot off toward the table edge.
- **Two computers in one.** The UNO Q is a Linux computer plus a microcontroller that talk over a Bridge, which meant juggling an SSH session into the board alongside local development, and keeping IP addresses right for MQTT.
