---
title: "Cantilevered Beam"
summary: "SolidWorks static stress study of a cantilevered beam."
categories: ["Simulation"]
tools: ["SolidWorks Simulation (FEA)"]
course: ""
date: ""
sortDate: "2024-10"
team: "Individual"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Cantilevered Beam"
gallery: []
videos: []
documents: []
source: "https://annejumper.wixsite.com/annejumperportfolio/cad-fea"
guessed: ["summary", "writeup"]  # fields Claude drafted/inferred — remove from this list once you've confirmed them
---

<!-- Your original text from the Wix site, unchanged. Suggested edits are in phase2-notes.md. -->

A static stress study in SolidWorks Simulation of a square-section cantilever: fixed at one end with a downward load applied at the free end.

- **Result.** Von Mises stress peaks at about **4,375 psi** along the top and bottom surfaces at the fixed end, where the bending moment is largest, and falls to almost nothing at the loaded tip. That matches beam theory, where the moment, and with it the bending stress, grows linearly from the tip to the support.
- **Safety factor.** The material's yield strength is about 37,500 psi, so the peak stress gives a factor of safety of roughly **8.6**. The beam is well within the elastic range.
- **Display.** The deflected shape is exaggerated about 53× so the bending curve is visible.
