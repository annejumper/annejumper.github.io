---
title: "Breakout Cooling Hole Simulation"
summary: "3D COMSOL turbulent-flow study of film cooling from a turbine-blade breakout hole."
categories: ["Simulation"]
tools: ["COMSOL (Turbulent Flow)"]
course: "Thermal Fluid Systems II (ME 51)"
date: "Fall 2025"
sortDate: "2025-10"
team: "Individual"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Breakout Cooling Hole Simulation"
gallery:
  - src: "./media/626a5f_0fcedf8d1524476682ed4c4fc731dc53~mv2.png"
  - src: "./media/626a5f_497a7f832a164081b3edc5302ca9a1eb~mv2.png"
videos: []
documents:
  - title: "Lab Report"
    file: "docs/lab-report.pdf"
source: "https://annejumper.wixsite.com/annejumperportfolio/copy-of-airfoil-simulation"
guessed: ["summary"]  # fields Claude drafted/inferred — remove from this list once you've confirmed them
---

<!-- Your original text from the Wix site, unchanged. Suggested edits are in phase2-notes.md. -->

For my Thermal Fluid Systems II class, I was tasked with analyzing a breakout cooling hole used to cool turbine blades using a variety of COMSOL turbulent flow simulations and comparing the results. More information about breakout cooling holes and the model's geometry is described below.

## Breakout Holes

The turbine is a key stage of a gas turbine engine, extracting work from the hot, high-pressure, high-velocity gases that exit the combustion chamber. These gases are directed onto a series of angled turbine blades, where they generate lift and cause the blades to rotate, converting the gas’s energy into useful mechanical power. A major design challenge is that the gas temperature after combustion often exceeds the melting point of the turbine blade material. To prevent failure, the blades are cooled internally with air that flows through complex passages and exits through small breakout holes along the blade surface. This air forms a thin protective layer that insulates the blade from the hot gas, a technique known as film cooling. While effective, film cooling requires precise design, as poor flow or temperature distribution near the breakout holes can create localized hot spots that may lead to blade damage. Because the blade geometry and flow are too complex for analytical solutions, engineers rely on experiments and computational fluid dynamics (CFD), often using simplified geometries that model air exiting a single breakout hole and the blade surface downstream.
