---
title: "Human Gait Analysis"
summary: "Inverse-dynamics model of the leg computing joint reaction forces and moments through the stance phase of gait."
categories: ["Dynamics"]
tools: ["MATLAB", "Motion capture"]
course: "Mechanics II (ME 21)"
date: "Spring 2025"
sortDate: "2025-04"
team: "Team project"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Human Gait Analysis"
gallery:
  - src: "./media/626a5f_372ef3ff1d384c0fb6ad949475139ac6~mv2.jpg"
  - src: "./media/626a5f_359d92d0577d4be191145a1f60e4b36a~mv2.jpg"
  - src: "./media/626a5f_24865f04876f4ac28c51678ee2ee15f1~mv2.jpg"
  - src: "./media/626a5f_6eff3d6865ac460aab5163b297252ad8~mv2.jpg"
videos: []
documents:
  - title: "Project Report"
    file: "docs/project-report.pdf"
  - title: "MATLAB Code"
    file: "docs/matlab-code.pdf"
    description: "To read in data from motion capture lab and produce graphs for reaction forces and joint moments."
source: "https://annejumper.wixsite.com/annejumperportfolio/copy-of-design-for-deflection"
guessed: ["summary"]  # fields Claude drafted/inferred — remove from this list once you've confirmed them
---

<!-- Your original text from the Wix site, unchanged. Suggested edits are in phase2-notes.md. -->

For my Mechanics II class, we were tasked with finding the net “reaction forces” and “moments” at the ankle, knee, and hip during the stance phase of the gait cycle by modeling the human body as rigid links connected through pins and using inverse dynamics analysis. We first used motion capture data from an instance of gait to solve for reaction forces and moments at each joint. Then, we used data collected in the motion capture lab and MATLAB to determine the joints’ forces and moments during the entire stance phase of gait.
