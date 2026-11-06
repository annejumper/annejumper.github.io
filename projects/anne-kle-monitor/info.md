---
title: "Anne-kle Monitor: Gait Identifier & Step Counter"
summary: "An ankle-worn IMU wearable that classifies standing, walking, running and biking with decision trees, then counts steps with an on-board 1D CNN (5.8% error on unseen trials)."
categories: ["Controls", "Robotics & Electronics"]
tools: ["Arduino UNO Q", "MPU-6050 IMU", "Python", "scikit-learn", "PyTorch", "3D printing"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-11"
team: "Individual"
role: ""
featured: 5
hero: "./hero.png"
heroAlt: "Anne-kle Monitor: Gait Identifier & Step Counter"
gallery:
  - src: "./media/system.png"
    caption: "System overview: what runs on the microcontroller, the board's Linux side, and the laptop"
    group: "Gait identifier"
  - src: "./media/model1-tree.png"
    caption: "Model 1: a depth-2 tree on peak acceleration up the leg"
    group: "Gait identifier"
  - src: "./media/model2-tree.png"
    caption: "Model 2: decision tree on all six IMU channels"
    group: "Gait identifier"
  - src: "./media/confusion.png"
    caption: "Confusion matrices for both models and k-NN (rows: true activity, columns: predicted)"
    group: "Gait identifier"
  - src: "./media/thresholds.png"
    caption: "Peak-acceleration thresholds: walking and biking overlap, which causes most of Model 1's errors"
    group: "Gait identifier"
  - src: "./media/network.png"
    caption: "The step-counting network: 8 IMU inputs, four convolutional layers of 16 filters, sigmoid output"
    group: "Step counter"
  - src: "./media/example-trial.png"
    caption: "Ten seconds of a slow walk: acceleration, leg rotation, and the network's heel-strike probability"
    group: "Step counter"
  - src: "./media/trials-eval.png"
    caption: "Steps counted by the network vs. by hand on 29 unseen trials, and mean error by trial type"
    group: "Step counter"
  - src: "./media/loss.png"
    caption: "Training loss"
    group: "Step counter"
videos:
  - title: "Counting steps: walking, running and stairs"
    file: "media/videos/step-demo.mp4"
    poster: "./media/videos/step-demo.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Live step count and distance over a measured ~6 m course. Least accurate going down stairs, where impact is low."
  - title: "How it works (animation)"
    file: "media/videos/how-it-works.mp4"
    poster: "./media/videos/how-it-works.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "IMU data flows through the network to heel-strike probabilities; then how PyTorch trains it. Every number comes from the real trained model."
  - title: "Gait identifier dashboard"
    file: "media/videos/gait-dashboard.mp4"
    poster: "./media/videos/gait-dashboard.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Live sensor data and both models' classifications; biking confuses the peak-acceleration model."
  - title: "LED matrix readout"
    file: "media/videos/gait-led.mp4"
    poster: "./media/videos/gait-led.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "The UNO Q's LED matrix shows standing, walking, running or biking."
  - title: "Recording new labeled data"
    file: "media/videos/record-data.mp4"
    poster: "./media/videos/record-data.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Pick a gait, press start, count your steps, and enter the count and distance at the end."
documents: []
links:
  - label: "Gait identifier code"
    url: "https://github.com/annejumper/AI-in-Mobile-Robots/tree/main/GaitIdentifier"
  - label: "Step counter code"
    url: "https://github.com/annejumper/AI-in-Mobile-Robots/tree/main/StepCounter"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

The Anne-kle Monitor is an Arduino UNO Q and an MPU-6050 IMU in a 3D-printed case worn on the ankle. I built it in two stages: first a gait identifier, then a step counter driven by a neural network. Everything runs on the board itself, with a phone web page for live results and for recording new labeled data.

## Part 1: Gait identifier

The UNO Q's microcontroller reads the IMU's 3-axis accelerometer and gyroscope at 100 Hz, and its Linux processor saves the readings and hosts a web page where I labeled 2–5 minutes of each activity from my phone. On my laptop I cut the recordings into overlapping 2-second windows and computed features (peaks, means, spread and stride rate), then trained two decision trees on the first 70% of each recording and tested on the last 30%.

- **Model 1** uses only peak acceleration up the leg (three thresholds) and scored **96.3%**. Most of its errors confused gentle walking with hard pedal strokes.
- **Model 2** uses all six IMU channels and scored **98.2%**, matching a k-NN baseline without searching the training data for every prediction. It separates walking from biking by *how* the leg moves: a sharp backward foot swing vs. smooth, continuous rotation.

The trees run on the board every half second and show the result on the LED matrix and the phone page.

## Part 2: Step counter

I extended the monitor to count steps with a small 1D convolutional neural network (8 IMU inputs, four layers of 16 filters with ReLU, sigmoid output). For every moment it outputs the probability that my heel is striking the ground; each peak above 0.5 is a heel strike, and since the sensor is on one foot, every strike is two steps. Each layer looks further apart in time, building from short motion spikes to a full 1.2 s stride. I trained the 8,145 weights in PyTorch with backpropagation and Adam on 29 hand-counted walks, runs and stair climbs, then ran the trained net in NumPy on the board. Distance is estimated stride by stride with zero-velocity updates (ZUPT) for walking and a cadence-based step-length model for running.

## Results

Every trial was evaluated by a network trained without it (cross-validation), over 771 hand-counted steps:

| Trials | Neural net | Gyro-rule baseline |
|---|---|---|
| Walking (8) | 0–3% | 0–3% |
| Running (7) | 3.1% | 2.1% |
| Stairs (14) | **9.5%** | 13.8% |
| **All (29)** | **5.8%** (95% CI 3.2–9.5%) | 7.7% |

The net had no overall bias (+0.0 ± 1.8 steps per trial) and beat the rule mainly on stairs. Distance was within about 4.5% (±1.5 m over a measured 30 m).

## Challenges

- **More data beat a better model.** At first the net counted two 15-step downstairs flights as 2 and 0 steps. Nine more stair trials cut stair error from 32% to 9.5%.
- **Labeling.** Heel strikes were labeled with a gyroscope rule. On seven trials (mostly stairs) the rule couldn't match my hand count, so I excluded them rather than teach the network mistakes.
- **One model doesn't fit all.** A single distance model was 33% off for running until running got its own model. When a classmate tried the monitor, it counted 2 of his ~40 steps, so I added per-person recording and labeling.
