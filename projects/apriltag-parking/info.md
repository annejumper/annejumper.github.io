---
title: "AprilTag Parking"
summary: "A LEGO car that parks itself in front of an AprilTag using two coordinated PID loops: one squares the camera to the tag, one centers the car."
categories: ["Controls", "Robotics & Electronics"]
tools: ["Python", "OpenCV", "AprilTags", "PID control", "LEGO Education motors"]
course: "AI in Mobile Robots (ME 193)"
date: "Fall 2026"
sortDate: "2026-09"
team: "With Ryan Cole"
role: ""
featured: 6
hero: "./hero.jpg"
heroAlt: "AprilTag Parking"
gallery:
  - src: "./media/webcam-mode.png"
    caption: "Webcam mode: the tag rides on the car's pan motor"
  - src: "./media/code-flow.png"
    caption: "Code flow: search → align → center → hold, with fallback to search when the tag is lost"
videos:
  - title: "Parking itself"
    file: "media/videos/parking.mp4"
    poster: "./media/videos/parking.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "The car centers itself in front of the camera."
  - title: "Phone-camera mode"
    file: "media/videos/phone-mode.mp4"
    poster: "./media/videos/phone-mode.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Screen recording with the camera mounted on the car."
  - title: "Webcam mode"
    file: "media/videos/webcam-mode.mp4"
    poster: "./media/videos/webcam-mode.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "Screen recording of the webcam view and overlay."
  - title: "No tag: search mode"
    file: "media/videos/no-tag.mp4"
    poster: "./media/videos/no-tag.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "With no tag in view, the pan motor searches in slowing rotations."
  - title: "Overshoot and correct"
    file: "media/videos/overshoot.mp4"
    poster: "./media/videos/overshoot.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "When the car passes center, the error flips sign and PID drives it back."
documents: []
links:
  - label: "Code on GitHub"
    url: "https://github.com/annejumper/AI-in-Mobile-Robots/tree/main/AprilTagParking"
source: "https://shimmering-cesium-c35.notion.site/"
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

Ryan Cole and I built a robot that uses one camera and an AprilTag to center (park) itself. It works in two setups, chosen at startup: a fixed webcam watching a tag mounted on the car, or a camera (a phone) mounted on the car watching a fixed tag.

## How it works

- **Search.** At startup, a pan motor spins the camera (or tag) through up to three slowing rotations to find the tag, and exits if it never does.
- **Align (PID 1).** The pan motor squares the tag to the camera. The error signal is the difference in apparent length between the tag's left and right edges: foreshortening makes the far edge look shorter whenever the tag isn't square-on.
- **Center (PID 2).** Once alignment holds steady for a moment, a second PID loop drives the car forward or backward until the tag sits in the center of the frame. The car stays still until then, because a steep angle plus car motion is when the tag is most likely to drop out of detection.
- **Auto-calibration.** Before driving, the car nudges itself to measure which way is forward, so it can start from any position.
- **Recovery.** If the tag disappears, the car coasts briefly through short occlusions, then stops and the pan motor resumes searching. Because PID is feedback, the car can overshoot and come back on its own.

## Challenges

- **Turning raw video into a usable control signal**, like tag skew, took most of the work. "Make the car and tag perpendicular" sounded simple until the car and pan angles had to be coordinated and pivoting the car kept losing the tag.
- **Our first AI-generated "PID" controller wasn't one.** The proportional gain was an equation, and the integral and derivative gains were variables that fed into nothing, so retuning them changed nothing. We had to explain what a PID controller is and why each constant matters before it was implemented properly.
- **The car forgot how to turn.** For the car to rotate parallel to the tag, its two motors must spin in opposite directions; the generated code drove them the same way, so the car drove away from the target. After an hour we dropped that feature, since the assignment was already met.

## What I'm proud of

The two-PID architecture. The car and camera don't need to start aligned in any way: as long as the tag is roughly in view, the robot works out its own orientation and parks itself, with no hand-tuning for particular starting positions.
