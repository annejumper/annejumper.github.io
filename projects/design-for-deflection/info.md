---
title: "Design for Deflection"
summary: "FEA-driven design of an aluminum C-shaped spring targeting 0.4 in deflection at 100 lbf, validated by Instron testing."
categories: ["Design", "Simulation"]
tools: ["SolidWorks Simulation (FEA)", "Water jet", "Instron"]
course: "Engineering Design II (ME 41)"
date: "Fall 2025"
sortDate: "2025-11"
team: "Team project"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Design for Deflection"
gallery:
  - src: "./media/626a5f_8fe4c8175a774a148422f560d2eca448~mv2.png"
  - src: "./media/626a5f_b4937421d5eb40fd812131e1ef733ac6~mv2.png"
  - src: "./media/626a5f_d5967de08177403ab246b961b809b4c3~mv2.png"
  - src: "./media/626a5f_7411ec1d5536423aa84987a32230ce32~mv2.png"
  - src: "./media/626a5f_cc3d053aaf6f4363bbacb1c3eb4cc23b~mv2.png"
  - src: "./media/626a5f_fd9cea8814fb4bcdacf849fe751c3131~mv2.png"
  - src: "./media/626a5f_d4eca50e6ca94860998c905f291a5f50~mv2.png"
videos: []
documents:
  - title: "Phase 2 Report: Our Design"
    file: "docs/phase-2-report-our-design.pdf"
  - title: "Phase 1 Report: Introduction"
    file: "docs/phase-1-report-introduction.pdf"
source: "https://annejumper.wixsite.com/annejumperportfolio/copy-of-ratchet-wrench-teardown"
guessed: ["summary"]  # fields Claude drafted/inferred — remove from this list once you've confirmed them
---

<!-- Your original text from the Wix site, unchanged. Suggested edits are in phase2-notes.md. -->

For my Engineering Design II class, we designed a structure intended to deform linear elastically under a maximum vertical load of 100 lbf and produce a target deflection of 0.4 inches at the load point, corresponding to a spring constant of 250 lbf/in. We conducted a SolidWorks static FEA simulation to iteratively design a “C-shaped” structure to fit the 4” x 8” plate area with mounting holes in fixed positions to allow for Instron testing. To test the validity of our FEA simulation, the structure was water jet cut from 0.25" thick Aluminum 6061-T6 for Instron testing, which measured a deflection of 0.4408 in, closely matching our FEA prediction (0.4 in). Additionally, the structure deformed linear elastically without yielding. Overall, our part was slightly compliant with a spring constant of 228.5 lbf/in, which is partially attributed to differences in thickness in the machined aluminum (0.239”).
