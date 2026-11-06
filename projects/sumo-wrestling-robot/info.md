---
title: "Sumo Wrestling Robot"
summary: "An autonomous LEGO sumo robot using sensor fusion (overhead camera, encoders, gyro, color sensor) and a behavior tree; a shake-controlled wand only sets its aggression."
categories: ["Controls", "Robotics & Electronics"]
tools: ["Python", "Behavior trees", "Sensor fusion", "AprilTags", "OpenCV", "MQTT", "Arduino UNO Q"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-10"
team: "With Hudson Brown"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Sumo Wrestling Robot"
gallery:
  - src: "./media/robot-and-wand.png"
    caption: "The robot with front and back AprilTags, and the shake-controlled wand (UNO Q, accelerometer, battery)"
  - src: "./media/color-sensor.png"
    caption: "Downward color sensor that detects the blue ring tape"
  - src: "./media/behavior-tree.png"
    caption: "Behavior tree: safety first, then push-back, then attack or defense"
videos:
  - title: "Attack mode"
    file: "media/videos/attack.mp4"
    poster: "./media/videos/attack.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Shaking the wand switches to attack: the robot steers behind the opponent and charges, ramping up power as it resists."
  - title: "Defense, then attack"
    file: "media/videos/defense.mp4"
    poster: "./media/videos/defense.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "With the wand still, it holds the center and pushes back when shoved."
  - title: "Calibration"
    file: "media/videos/calibration.mp4"
    poster: "./media/videos/calibration.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Finds the ring, records the empty floor, corrects for camera tilt with the AprilTags, learns floor vs. tape color, and measures its own wheels and gyro."
documents: []
links:
  - label: "Code on GitHub"
    url: "https://github.com/hudsonbrown-tufts/AI_in_mobile_robotics/tree/main/HW5"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

Hudson Brown and I built a sumo wrestler that makes its own decisions. The only human input is a handheld wand (an Arduino UNO Q with an accelerometer): how hard you shake it sets the robot's aggression from 0 to 1 over MQTT. Below 0.5 it defends the center of the ring; above 0.5 it attacks, charging faster the harder you shake.

## How it works

- **Perception.** An overhead phone camera tracks AprilTags on the robot's front and back, finds the tape ring, and detects the opponent by comparing each frame with a photo of the empty ring (subtracting our own robot). A downward color sensor spots the blue tape.
- **Sensor fusion.** The camera pose is fused with wheel encoders and the IMU gyro to estimate where we are between frames. Edge, push and out-of-ring decisions need agreeing evidence from several sensors, so no single sensor decides alone.
- **Behavior tree.** A root fallback node tries nine branches in priority order, 30 times per second: safety (match state, leaving the ring, escaping the edge), then pushing back when shoved, then attack or defense. In attack it lines up on the opponent's center side so the shove pushes outward, and only ramps up power once the opponent resists.
- **Reflex.** A 200 Hz color-sensor loop reverses the robot the instant it sees tape, independent of the slower camera loop.

## Challenges

- **The robot "went crazy"**: charging at nothing, spinning in circles, and driving out of the ring. Several bugs had piled up. The drive calibration measured spin backwards, so every turn was predicted backwards between frames. The steering gain was too strong for ~0.25 s of camera and Bluetooth delay. And while spinning fast, disagreement between the gyro, wheels and camera was read as a push.
- **Getting it fully autonomous.** Detecting the opponent, orienting toward it and attacking without human steering took the most time.
- **Match day.** A bright window behind the ring washed out the AprilTags until we closed the shade, and the wand's battery pack kept shutting down before the UNO Q booted.
- **Physical limits.** At about 300 g and 14 × 13 cm, its pushing power is limited, and with only one front color sensor it can't see tape when pushed backward.
