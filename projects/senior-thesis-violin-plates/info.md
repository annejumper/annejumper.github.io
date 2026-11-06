---
title: "Senior Thesis: Thickness–Frequency Relationships in Violin Plates"
summary: "Testing thin-plate theory on real violin plates: global ω ∝ h scaling, magnet-sweep antinode mapping, and predicting frequency shifts from local thinning, with a UR3e arm automating impact testing."
categories: ["Acoustics", "Research", "Controls"]
tools: ["UR3e robot arm", "ROS 2", "Python", "Inverse kinematics", "ObieApp", "Modal analysis"]
course: "Senior thesis, Tufts Mechanical Engineering"
date: "2026–2027 (in progress)"
sortDate: "2026-12"
team: "Individual · Advisor: Prof. Chris Rogers (CEEO)"
role: "Thesis researcher"
featured: 0
hero: "./hero.jpg"
heroAlt: "UR3e robot arm with a Robotiq gripper holding an impact hammer over a cantilevered metal strip"
gallery:
  - src: "./media/reference-plate.jpg"
    caption: "Cantilevered aluminum reference plate with a marked test grid"
videos:
  - title: "Collecting data with the arm and ObieApp"
    file: "media/videos/arm-obieapp-data-collection.mp4"
    poster: "./media/videos/arm-obieapp-data-collection.jpg"
    youtube: ""
    description: "The arm strikes a clamped plate while ObieApp's Acquire module records the frequency response at each hit point, then advances to the next position."
  - title: "Automated impact test on a cantilevered strip"
    file: "media/videos/strip-impact-test.mp4"
    poster: "./media/videos/strip-impact-test.jpg"
    youtube: ""  # paste a YouTube URL here to switch to a YouTube embed
    description: "The arm steps through the planned grid along the strip, striking each point with the hammer held in the gripper."
  - title: "Impact test, second run"
    file: "media/videos/strip-impact-test-2.mp4"
    poster: "./media/videos/strip-impact-test-2.jpg"
    youtube: ""
  - title: "Moving the arm from a script"
    file: "media/videos/arm-motion.mp4"
    poster: "./media/videos/arm-motion.jpg"
    youtube: ""
    description: "The UR3e driven directly over SSH by the testing scripts."

documents: []
links:
  - label: "UR3e impact-testing code"
    url: "https://github.com/annejumper/UR-Impact-Testing"
source: ""
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---

Luthiers "voice" violin tops and backs by selectively thinning the wood, guided by intuition and thin-plate theory. My thesis tests that theory experimentally on real plates using ObieApp, and asks whether the tools could be built into ObieApp for luthiers and researchers.

## The physics being tested

- **Uniform thinning.** Flexural stiffness scales with thickness cubed (h³) and mass with h, so a plate's natural frequencies scale linearly with thickness: **ω ∝ h**.
- **Local thinning** follows a perturbation relation instead:

  Δω/ω ≈ ½ (ΔU<sub>strain</sub>/U<sub>strain</sub> − ΔT<sub>mass</sub>/T<sub>mass</sub>)

  Removing wood lowers both the local strain energy (tied to **curvature**) and the local kinetic energy (tied to **displacement**), and the two effects pull the frequency in opposite directions. Where you remove material decides which one wins.

## Plan

1. **Global scaling.** Confirm ω ∝ h by measuring modal frequencies across plates of different uniform thickness.
2. **Mapping antinodes without damage.** This borrows a luthier's technique for deciding where to scrape. A small magnet adds mass without changing stiffness, so it lowers a mode's frequency, and most strongly at that mode's displacement antinodes. Moving the magnet across a grid on the plate and tracking each target mode's frequency shift maps the antinodes without permanently altering the plate.
3. **Predicting shifts from scraping.** Scraping is less intuitive than the magnet. Removing wood takes away mass, which on its own would raise the frequency, but it also removes stiffness, and stiffness falls three times faster (h³ vs. h). Where the plate bends most, the net effect is a lower frequency. I'll scrape wood at the magnet-identified locations and compare measured frequency shifts with the perturbation formula's prediction. I'll also test whether displacement antinodes (found by the magnet) coincide with curvature antinodes (where scraping should be most effective). They are only guaranteed to align for idealized plates, and may differ on irregular or braced ones.

## Progress so far: automating impact testing with a UR3e arm

Modal testing means striking the plate at dozens of points, the same way, every time. I wrote a set of command-line tools that drive a **UR3e robot arm** to do this repeatably over SSH, coordinating with the hammer, probe and gripper:

- **Plate setup.** Jog the probe to two or three corners. From them, plan a grid (e.g. 4 × 4, or 15 points × 2 rows for a strip) on the plane through the corners, so plates can be any rectangle, tilted, or cantilevered. The planner warns when corners look inconsistent.
- **Height calibration.** Probe each point's surface height (or only corners or edges, interpolating the rest for flat plates). Searches start above the plane, so a sagging plate is still found.
- **Testing.** Run hits at every point (`run_test.py --hits 3`), resume or redo specific points, and log every hit. Inverse kinematics use a compiled UR3e IK solver, and progress is shared between steps through a state file.

The videos below show it collecting data with ObieApp and testing a cantilevered metal strip. These tools replaced a notebook workflow, support the cantilevered reference plates from my summer validation work, and will collect the data for each phase of the thesis.
