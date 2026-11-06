---
title: "Load-Carrying Robot"
summary: "Remote-operated robot that lifts, weighs and places a 1 kg payload to balance a seesaw."
categories: ["Robotics & Electronics", "Controls"]
tools: ["12 V DC motors", "L298N H-bridge", "Load cell + amplifier"]
course: "Electronics & Controls I (ME 30)"
date: "Fall 2025"
sortDate: "2025-11"
team: "Team project"
role: ""
featured: 4
hero: "./hero.png"
heroAlt: "Load-Carrying Robot"
gallery:
  - src: "./media/626a5f_465eb312a44f46489a6edf1e682dfabc~mv2.jpg"
  - src: "./media/626a5f_01b0157375564d3990ef02d2b1248166~mv2.jpg"
  - src: "./media/626a5f_47aee27ba07646d69909975b49acf122~mv2.jpg"
  - src: "./media/626a5f_7fb0edde6d384d089123b76fbfa55d2b~mv2.jpg"
  - src: "./media/626a5f_28e9330f42e242cc8750fdb1e8148faa~mv2.jpg"
  - src: "./media/626a5f_c0c5012de35a4df898c63618fbca374b~mv2.jpeg"
  - src: "./media/626a5f_caffe22581154a6780430262498add0e~mv2.png"
  - src: "./media/626a5f_af1306597dc24f1eb790e194d3abd948~mv2.png"
videos:
  - title: "Video Demonstration"
    file: "media/videos/robot-demonstration.mp4"
    poster: "./media/626a5f_1f9cb27d8807413cadc6d7ff29df781df000.jpg"
    youtube: ""  # paste a YouTube URL or ID here to switch to a YouTube embed
documents: []
source: "https://annejumper.wixsite.com/annejumperportfolio/load-carrying-robot-1"
guessed: ["summary"]  # fields Claude drafted/inferred — remove from this list once you've confirmed them
---

<!-- Your original text from the Wix site, unchanged. Suggested edits are in phase2-notes.md. -->

For this group project for my Electronics & Controls I class, we were tasked with building a robot that could carry, measure, and precisely place a payload to balance a seesaw with another robot. Our robot uses a two-wheel direct drive system with 12 V DC motors controlled by an L298N H-bridge, allowing stable remote operation while carrying up to a 1 kg payload. To prevent tipping while lifting, the wheels are placed at the front of the chassis, with a rear caster and a counterweight box in the back for added stability. The lifting arm pivots at the center of the robot and is actuated by a motor-driven string and pulley system, with a spring-loaded return that keeps the arm raised when not lifting. A load cell integrated into the arm mechanism measures the payload mass using an amplifier circuit, and lights indicate which of three identical payloads is being lifted. This enables the user to determine the correct placement distance on the seesaw to balance torques accurately.
