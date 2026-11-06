---
title: "KiCAD PCB Design"
summary: "H-bridge and voltage regulator boards designed in KiCAD, from schematic to layout."
categories: ["Robotics & Electronics", "CAD"]
tools: ["KiCAD"]
course: "Electronics & Controls I (ME 30)"
date: "Fall 2025"
sortDate: "2025-12"
team: "Individual"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "KiCAD PCB Design"
gallery:
  - src: "./media/626a5f_8ad62e709a5c4c4ca4093e5d6452e176~mv2.png"
    caption: "H-Bridge PCB Schematic"
  - src: "./media/626a5f_80b5cb00a7e144a6a5d1890925f8d368~mv2.png"
    caption: "Voltage Regulator PCB"
  - src: "./media/626a5f_f7e62f5f0a46404d80b5983d36de1a3e~mv2.png"
    caption: "Voltage Regulator PCB Schematic"
  - src: "./media/626a5f_c32ad70be27e4e1da59eb92af62c6b53~mv2.png"
    caption: "Voltage Regulator PCB 3D"
videos: []
documents: []
source: "https://annejumper.wixsite.com/annejumperportfolio/cad-fea"
guessed: ["summary", "course", "writeup"]  # fields Claude drafted/inferred — remove from this list once you've confirmed them
---

<!-- Your original text from the Wix site, unchanged. Suggested edits are in phase2-notes.md. -->

For Electronics & Controls I, I designed two circuit boards in KiCAD, taking each from schematic capture through board layout and a 3D check.

- **H-bridge.** A full bridge for driving a DC motor in both directions. Two FQP27P06 P-channel MOSFETs switch the high side and two IRLZ44N logic-level N-channel MOSFETs switch the low side. 2N3904 transistors drive the P-channel gates, so a microcontroller can control the whole bridge with logic-level signals through a three-pin terminal. Power comes in through a barrel jack with an indicator LED, and the motor connects to a screw terminal.
- **Voltage regulator.** A two-stage supply: a barrel-jack input feeds an L7805 for a 5 V rail, which feeds an LD1117V for a lower logic rail. Each stage has a decoupling capacitor, with header pins and a screw terminal to distribute power.
- **Layout.** On the regulator board I placed the connectors at the edges and routed the power traces in short, direct runs, with my name and the course on the silkscreen. Checking the 3D render caught clearance and orientation issues before ordering the board.
