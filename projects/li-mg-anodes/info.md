---
title: "Li-Mg Alloy Anodes for Solid-State Batteries"
summary: "A semester-long materials study of lithium-magnesium alloy anodes, covering how structure, phase behavior and diffusion determine whether a solid-state battery anode resists dendrites and voids."
categories: ["Materials"]
tools: ["Literature review", "Phase diagrams", "Data from nanoindentation, EBSD, XRD and NMR studies"]
course: "Materials & Manufacturing II (ME 11)"
date: "Spring 2026"
sortDate: "2026-05"
team: "Slides and poster with Ani Gregori Asadourian; review paper individual"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Poster: Li-Mg Anodes for Solid-State Batteries, with the Li-Mg phase diagram, EBSD grain maps and diffusion data"
gallery:
  - src: "./media/slide-01.png"
    caption: "Why alloy lithium with magnesium: dendrites in pure Li vs. smoother plating on Li-Mg"
    group: "Presentation"
  - src: "./media/slide-02.png"
    caption: "Atomic structure and bonding: a substitutional BCC solid solution"
    group: "Presentation"
  - src: "./media/slide-03.png"
    caption: "Crystal structure and the binary phase diagram, and what they mean for the anode's operating window"
    group: "Presentation"
  - src: "./media/slide-04.png"
    caption: "Material properties vs. Mg content: modulus, hardness, diffusivity and creep"
    group: "Presentation"
  - src: "./media/slide-05.png"
    caption: "Defects and diffusion: vacancy hopping and short-range order"
    group: "Presentation"
  - src: "./media/slide-06.png"
    caption: "Deformation and strengthening: dislocation glide, solid-solution strengthening and creep"
    group: "Presentation"
  - src: "./media/slide-07.png"
    caption: "Manufacturing and heat treatment, from alloying to roll-to-roll foils"
    group: "Presentation"
  - src: "./media/slide-08.png"
    caption: "Failure modes: void formation, phase transformation on deep discharge, dendrites and the SEI layer"
    group: "Presentation"
  - src: "./media/slide-10.png"
    caption: "Learning outcomes"
    group: "Presentation"
videos: []
documents:
  - title: "Review Paper"
    file: "docs/review-paper.pdf"
    description: "Lithium-Magnesium Binary Alloy Anodes for Solid-State Batteries (IEEE format, 4 pages, with references)"
links: []
source: ""
guessed: ["summary", "writeup", "sortDate", "tools"]  # fields Claude drafted — remove once confirmed
---
Over the semester, I followed one alloy from atomic structure through manufacturing: lithium-magnesium (Li-Mg) as the anode in a solid-state battery. Pure lithium metal anodes have a very high theoretical capacity (3,860 mAh/g), but they fail by growing dendrites, needle-like lithium structures that short the cell, and by forming voids at the electrolyte interface. The project asked why adding magnesium helps, and what limits how much should be added. With my partner Ani Gregori Asadourian, I started by surveying four lithium alloys and compounds (Li-Mg and Li-Al anodes, LFP cathodes, and liquid-lithium walls for fusion reactors) and chose Li-Mg. We then built a presentation and a poster on it, and I finished with an individual review paper.

## What I found

- **Structure.** Li and Mg have similar atomic radii (152 vs. 160 pm), so on the Li-rich side they form a substitutional BCC solid solution with no intermetallic compounds. Li plated at the surface diffuses into the lattice instead of piling up, and the alloy conducts both electrons and ions, which spreads current evenly and removes the hot spots where dendrites start.
- **The phase diagram sets the operating window.** Crossing from the BCC β-phase into the HCP α-phase causes a ~16.6% volume change and interfacial stresses (~0.91–2.2 GPa) well above either phase's yield strength (~0.26–0.34 GPa). Cycling only within the β-phase avoids that damage. It lowers theoretical capacity from 3,350 to ~2,010 mAh/g, which is still more than 5× graphite's 372 mAh/g.
- **Mechanical properties.** Solid-solution strengthening raises bulk hardness from ~2 MPa for pure Li to over 57 MPa at 20 at% Mg, and the indentation modulus rises linearly (M = 0.44x + 12.2 GPa). Adding Mg also reduces creep, which matters because some creep is needed: the anode has to flow to stay in contact with the electrolyte as lithium is stripped.
- **Diffusion is the trade-off.** The individual vacancy hops are fast (~75 meV barrier), but short-range order (Li prefers Mg neighbors) raises the effective barrier and slows Li diffusion by about an order of magnitude at 20 at% Mg. Slower diffusion delays dendrites but limits how fast Li can reach the interface during stripping. The literature puts the best balance at about 1–5 at% Mg: at low stack pressure, 5 at% outperforms pure Li, but above ~10 at% the diffusion limit dominates.
- **Failure modes.** In pure Li, voids at the interface coalesce and the anode delaminates at ~1.25 mAh/cm². In Li-Mg, voids split and collapse instead, so contact holds to ~3.5 mAh/cm².

## What surprised me

- Mg atoms are larger than Li atoms, yet the unit cell shrinks as Mg content increases.
- Creep, which is usually something to minimize, is necessary here to keep the anode in contact with the electrolyte.
- Slower lithium diffusion makes a better fast-charging anode, because it forces lithium to deposit uniformly instead of in dendrite-forming peaks.

All data and figures come from the published studies cited in the paper and slides. This was a literature review, not lab work.
